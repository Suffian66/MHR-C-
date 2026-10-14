// import { useEffect, useState } from "react";
// import { fetchSections } from "../features/PageService";
// import { collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
// import { db } from "../../../../firebase.config";

// type MediaItem = {
//   id: string;
//   name: string;
//   url: string;
//   type: string;
//   altText?: string;
// };

// function PageSection({ page }: { page: string }) {
//   const [sections, setSections] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState<string>("");
//   const [media, setMedia] = useState<MediaItem[]>([]);

//   useEffect(() => {
//     const loadSections = async () => {
//       const fetchedSections = await fetchSections(page);
//       setSections(fetchedSections);
//       if (fetchedSections.length > 0) {
//         setActiveTab(fetchedSections[0].id);
//       }
//     };
//     loadSections();
//   }, [page]);

//   useEffect(() => {
//     const loadMedia = async () => {
//       const snapshot = await getDocs(collection(db, "media"));
//       const mediaItems = snapshot.docs.map(doc => ({
//         id: doc.id,
//         name: doc.data().fileName || '',
//         url: doc.data().mediaUrl || '',
//         type: doc.data().mediaType || '',
//         altText: doc.data().altText || '',
//       }));
//       setMedia(mediaItems);
//     };

//     loadMedia();
//   }, []);

//   const handleContentChange = (
//     sectionId: string,
//     blockId: string,
//     newValue: string | string[],  // ✅ allow both string and array
//     field: string = "text"
//   ) => {
//     setSections((prev) =>
//       prev.map((s) =>
//         s.id === sectionId
//           ? {
//             ...s,
//             content: s.content.map((block: any) =>
//               block.id === blockId ? { ...block, [field]: newValue } : block
//             ),
//           }
//           : s
//       )
//     );
//   };



//   const saveSection = async (sectionId: string) => {
//     const section = sections.find((s) => s.id === sectionId);
//     if (!section) return;

//     await updateDoc(doc(db, "pages", page, "sections", sectionId), {
//       content: section.content, // store array of blocks
//       updatedAt: serverTimestamp(),
//     });

//     alert("Section updated!");
//   };

//   interface ItemType {
//     id: string;
//     type: string;
//     order: number;
//     text: string;
//     imageId?: string; // Optional for image blocks
//     // Add other properties as needed
//   }

//   const renderContent = () => {
//     const section = sections.find((s) => s.id === activeTab);
//     if (!section) return <div className="p-4">No content available for this section.</div>;

//     return (
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-4">{section.title}</h2>

//         {section.content
//           .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
//           .map((item: ItemType) => {
//             const label = item.type.charAt(0).toUpperCase() + item.type.slice(1);

//             return (
//               <div key={item.id} className="mb-4">
//                 <h3 className="text-lg font-medium">
//                   {label} (#{item.order})
//                 </h3>

//                 {/* Heading */}
//                 {item.type === "heading" && (
//                   <input
//                     type="text"
//                     value={item.text}
//                     onChange={(e) =>
//                       handleContentChange(section.id, item.id, e.target.value, "text")
//                     }
//                     className="w-full p-2 border rounded-md"
//                   />
//                 )}


//                 {/* Paragraph */}
//                 {item.type === "paragraph" && (
//                   <textarea
//                     value={item.text}
//                     onChange={(e) =>
//                       handleContentChange(section.id, item.id, e.target.value, "text")
//                     }
//                     className="w-full p-2 border rounded-md"
//                     rows={3}
//                   />
//                 )}


//                 {item.type === "image" && (
//                   <>
//                     {/* Preview */}
//                     {item.imageId && (
//                       <img
//                         src={
//                           media.find((m) => m.id === item.imageId)?.url ||
//                           item.imageId // fallback (in case old data stored URL directly)
//                         }
//                         alt={
//                           media.find((m) => m.id === item.imageId)?.altText || item.id
//                         }
//                         className="w-25 h-25 rounded-md mb-2 border"
//                       />
//                     )}

//                     {/* Dropdown */}
//                     <select
//                       value={item.imageId || ""}
//                       onChange={(e) =>
//                         handleContentChange(section.id, item.id, e.target.value, "imageId")
//                       }
//                       className="w-100 p-2 border rounded-md"
//                     >
//                       <option value="">-- Select an image --</option>
//                       {media.map((m) => (
//                         <option key={m.id} value={m.id}>
//                           {m.altText || m.name || m.id}
//                         </option>
//                       ))}
//                     </select>
//                   </>
//                 )}

//                 {/* Bullet List */}
//                 {item.type === "bulletList" && (
//                   <textarea
//                     value={Array.isArray(item.text) ? item.text.join("\n") : ""}
//                     onChange={(e) =>
//                       handleContentChange(
//                         section.id,
//                         item.id,
//                         e.target.value.split("\n").filter(Boolean), // convert back to array
//                         "text"
//                       )
//                     }
//                     placeholder="Enter bullet points, one per line"
//                     className="w-full p-2 border rounded-md"
//                     rows={4}
//                   />
//                 )}

//               </div>
//             );
//           })}


//         <button
//           onClick={() => saveSection(section.id)}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Save Changes
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {/* Section Tabs */}
//       {/* <nav className="flex border-b border-gray-300 mb-4"> */}
//       <nav className="flex overflow-x-auto border-b border-gray-300 mb-4">
//         <div className="flex space-x-2 min-w-max">
//           {sections.map((section) => (
//             <button
//               key={section.id}
//               onClick={() => setActiveTab(section.id)}
//               className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm ${activeTab === section.id
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300"
//                 }`}
//             >
//               {section.title}
//             </button>
//           ))}
//         </div>
//       </nav>

//       <div>{renderContent()}</div>
//     </div>
//   );
// }

// export default PageSection;
