// import React, { useState, useRef, useEffect } from "react";
// import Layout from "./Layout";
// import {
//   collection,
//   addDoc,
//   deleteDoc,
//   doc,
//   getDocs,
//   updateDoc
// } from "firebase/firestore";
// import { db } from "../../../../firebase.config";

// type MediaItem = {
//   id: string;
//   name: string;
//   url: string;
//   type: string;
//   altText?: string;
// };

// const Media = () => {
//   const [mediaList, setMediaList] = useState<MediaItem[]>([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
 
//   useEffect(() => {
//     const loadMedia = async () => {
//       setIsLoading(true)
//       const snapshot = await getDocs(collection(db, "media"));
//       const items: MediaItem[] = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().fileName,
//         url: doc.data().mediaUrl,
//         type: doc.data().mediaType,
//         altText: doc.data().altText || ""
//       }));
//       setMediaList(items);
//       setIsLoading(false)
//     };
//     loadMedia();
//   }, []);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     const file = e.target.files[0];
//     const previewUrl = URL.createObjectURL(file);

//     const tempId = `temp-${Date.now()}`;
//     setMediaList((prev) => [
//       {
//         id: tempId,
//         name: file.name,
//         url: previewUrl,
//         type: file.type,
//         altText: ""
//       },
//       ...prev
//     ]);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("https://advisoratlaw.com/media/upload.php", {
      
//         method: "POST",
//         body: formData
//       });

//       if (!res.ok) throw new Error("Upload failed");
//       const data = await res.json();
//       const uploadedUrl = data.url;

//       const docRef = await addDoc(collection(db, "media"), {
//         fileName: file.name,
//         mediaUrl: uploadedUrl,
//         mediaType: file.type,
//         altText: file.name,
//       });

//       setMediaList((prev) =>
//         prev.map((item) =>
//           item.id === tempId
//             ? { id: docRef.id, name: file.name, url: uploadedUrl, type: file.type, altText: "" }
//             : item
//         )
//       );
//     } catch (err) {
//       console.error("Error uploading file", err);
//       setMediaList((prev) => prev.filter((item) => item.id !== tempId)); // remove preview on fail
//     } finally {
//       e.target.value = "";
//     }
//   };

//   const handleAltTextChange = async (id: string, value: string) => {
//     setMediaList((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, altText: value } : item))
//     );

//     try {
//       await updateDoc(doc(db, "media", id), { altText: value });
//     } catch (err) {
//       console.error("Error updating altText", err);
//     }
//   };

//   const handleDelete = async (id: string, url: string) => {
//     try {
//       const filename = url.split("/").pop(); // get file name from URL
//       await fetch(`https://advisoratlaw.com/media/delete.php?file=${filename}`, { method: "POST" });

//       await deleteDoc(doc(db, "media", id));

//       setMediaList((prev) => prev.filter((item) => item.id !== id));
//     } catch (err) {
//       console.error("Error deleting media", err);
//     }
//   };

//   const handleUploadClick = () => fileInputRef.current?.click();

//   return (
//     <Layout title="Media Manager">
//       <div className="space-y-6">
//         {/* Upload Button */}
//         <div>
//           <button
//             onClick={handleUploadClick}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Upload Media
//           </button>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             accept="image/*,video/*,audio/*"
//           />
//         </div>

//         {/* Media Grid */}
//         {isLoading ? (
//           <div className="h-10 flex justify-center items-center">
//             <div className="h-6 w-6 animate-spin rounded-full border-3 border-blue-600 border-t-transparent"></div>
//           </div>
//         ) : mediaList.length === 0 ? (
//           <p className="text-gray-600">No media uploaded yet.</p>
//         ) : (
//           <div className="grid grid-cols-4 gap-4">
//             {mediaList.map(({ id, name, url, type, altText }) => (
//               <div
//                 key={id}
//                 className="border rounded p-2 flex flex-col items-center space-y-2"
//               >
//                 {type.startsWith("image/") && (
//                   <img src={url} alt={name} className="w-full h-32 object-contain rounded" />
//                 )}
//                 {type.startsWith("video/") && (
//                   <video src={url} controls className="w-full h-32 rounded" />
//                 )}
//                 {type.startsWith("audio/") && (
//                   <audio controls className="w-full">
//                     <source src={url} type={type} />
//                   </audio>
//                 )}

//                 <input
//                   type="text"
//                   value={altText || ""}
//                   placeholder="Alt text"
//                   onChange={(e) => handleAltTextChange(id, e.target.value)}
//                   className="border rounded px-2 py-1 text-sm w-full"
//                 />

//                 <div className="text-xs text-gray-500 truncate">{name}</div>
//                 <button
//                   onClick={() => handleDelete(id, url)}
//                   className="text-red-600 hover:text-red-800 text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Media;