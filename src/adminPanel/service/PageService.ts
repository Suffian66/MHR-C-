// // src/admin/services/firebasePagesService.ts
// import { addDoc, arrayUnion, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
// import { db } from "../../../../firebase.config";

// export const addPage = async (slug: string, title: string) => {
//   const q = query(
//     collection(db, "pages"),
//     where("slug", "==", slug)
//   );
//   const snapshot = await getDocs(q);

//   if (!snapshot.empty) {
//     throw new Error(`Page with slug "${slug}" already exists!`);
//   }

//   // add page doc with fields
//   const docRef = await addDoc(collection(db, "pages"), {
//     title,
//     slug,
//     createdAt: serverTimestamp(),
//     updatedAt: serverTimestamp(),
//   });

//   return docRef.id;
// };
// // -----------------------------
// // Add a new section to a page
// // -----------------------------
// export const addSection = async (
//   pageId: string,
//   title: string,
//   type: string,
//   order: number,
//   content: any[] = []
// ) => {
//   const q = query(
//     collection(db, "pages", pageId, "sections"),
//     where("title", "==", title)
//   );
//   const snapshot = await getDocs(q);

//   if (!snapshot.empty) {
//     throw new Error(`Section "${title}" already exists!`);
//   }

//   await addDoc(collection(db, "pages", pageId, "sections"), {
//     title,
//     type,
//     order,
//     content,
//     createdAt: serverTimestamp(),
//     updatedAt: serverTimestamp(),
//   });
// };


// export const addContentBlock = async (
//   pageId: string,
//   sectionId: string,
//   block: {
//     id: string;
//     type: "heading" | "paragraph" | "image";
//     order: number;
//     text?: string;
//     imageId?: string;
//   }
// ) => {
//   try {
//     const sectionRef = doc(db, "pages", pageId, "sections", sectionId);

//     await updateDoc(sectionRef, {
//       content: arrayUnion(block),
//       updatedAt: serverTimestamp(),
//     });
//   } catch (error) {
//     console.error("Error adding content block: ", error);
//     throw error;
//   }
// };


// // -----------------------------
// // Fetch all pages
// // -----------------------------
// type PageType = {
//   id: string;
//   title: string;
//   slug: string;
//   createdAt?: any;
//   updatedAt?: any;
// };

// export const getPages = async () => {
//   const snapshot = await getDocs(collection(db, "pages"));
//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as { id: string; slug: string; title: string }[];
// };

// export const fetchPages = async (): Promise<PageType[]> => {
//   const snapshot = await getDocs(collection(db, "pages"));
//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as Omit<PageType, "id">),
//   }));
// };

// // -----------------------------
// // Fetch sections of a page
// // -----------------------------

// type PageSectionType = {
//   id: string;
//   title: string;
//   order: number;
//   type: string;
//   content: any;
// };

// const toBlocksArray = (raw: any): any[] => {
//   if (!raw) return [];

//   // If already an array of blocks
//   if (Array.isArray(raw)) {
//     return raw.map((b, idx) => ({
//       id: b?.id ?? `block_${idx}`,
//       order: b?.order ?? idx + 1,
//       ...b,
//     }));
//   }

//   // Handle {0: {...}} legacy shape
//   if (typeof raw === "object" && raw !== null && "0" in raw && Object.keys(raw).length === 1) {
//     const inner = raw["0"];
//     return toBlocksArray(inner);
//   }

//   // Convert plain object maps into blocks
//   if (typeof raw === "object" && raw !== null) {
//     const entries = Object.entries(raw);
//     return entries.map(([key, value], idx) => {
//       if (typeof value === "object" && value !== null && ("type" in value || "text" in value || "imageId" in value)) {
//         return {
//           id: (value as any).id ?? key,
//           order: (value as any).order ?? idx + 1,
//           ...value,
//         };
//       }
//       const guess = key.toLowerCase();
//       const type = guess.includes("image") ? "image" : guess.includes("heading") ? "heading" : "paragraph";
//       return type === "image"
//         ? { id: key, type, order: idx + 1, imageId: String(value) }
//         : { id: key, type, order: idx + 1, text: String(value) };
//     });
//   }

//   return [];
// };

// export const fetchSections = async (pageId: string): Promise<PageSectionType[]> => {
//   const snapshot = await getDocs(collection(db, "pages", pageId, "sections"));
//   return snapshot.docs
//     .map((d) => {
//       const data = d.data() as Omit<PageSectionType, "id">;
//       const content = toBlocksArray(data.content);
//       return { id: d.id, ...data, content };
//     })
//     .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
// };


// // -----------------------------
// // Update a section
// // -----------------------------
// export const updateSection = async (
//   pageSlug: string,
//   sectionId: string,
//   newContent: any
// ) => {
//   const sectionRef = doc(db, "pages", pageSlug, "sections", sectionId);
//   await updateDoc(sectionRef, {
//     content: newContent,
//     updatedAt: serverTimestamp()
//   });
// };

// // -----------------------------
// // Delete a section
// // -----------------------------
// export const deleteSection = async (pageSlug: string, sectionId: string) => {
//   const sectionRef = doc(db, "pages", pageSlug, "sections", sectionId);
//   await deleteDoc(sectionRef);
// };
