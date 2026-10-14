// import { useEffect, useState } from "react";
// import { fetchPages } from "../features/PageService";
// import Layout from "./Layout";
// import PageSection from "./PageSection";

// const Page = () => {
//   const [pages, setPages] = useState<any[]>([]);
//   const [activeTab, setActiveTab] = useState<string>("");

//   useEffect(() => {
//     const loadPages = async () => {
//       const fetchedPages = await fetchPages();
//       setPages(fetchedPages);
//       if (fetchedPages.length > 0) {
//         setActiveTab(fetchedPages[0].id);
//       }
//     };
//     loadPages();
//   }, []);

//   return (
//     <Layout title="Admin Tabs Page">
//       <div>
//         {/* Tabs Navigation */}
//         {/* <nav className="flex border-b border-gray-300 mb-4"> */}
//         <nav className="flex overflow-x-auto border-b border-gray-300 mb-4">
//           <div className="flex space-x-2 min-w-max">
//           {pages.length === 0 ? (
//             <p>No pages found</p>
//           ) : (
//             pages.map((page) => (
//               <button
//                 key={page.id}
//                 onClick={() => setActiveTab(page.id)}
//                 className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === page.id
//                     ? "border-blue-600 text-blue-600"
//                     : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300"
//                   }`}
//               >
//                 {page.title}
//               </button>
//             )))}
//             </div>
//         </nav>

//         {/* Tab Content */}
//         {activeTab && <PageSection page={activeTab} />}
//       </div>
//     </Layout>
//   );
// };

// export default Page;
