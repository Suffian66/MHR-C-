// import Layout from "./Layout";

// const stats = [
//   { label: "Total Pages", value: 24, icon: "📄" },
//   { label: "Media Files", value: 128, icon: "🖼" },
//   { label: "Active Users", value: 53, icon: "👥" },
//   { label: "Settings Updated", value: 8, icon: "⚙" },
// ];

// const ContentDashboard = () => {
//   return (
//     <Layout title="">
//       <div className="space-y-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map(({ label, value, icon }) => (
//             <div
//               key={label}
//               className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-shadow cursor-pointer"
//             >
//               <div className="text-4xl">{icon}</div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-800">{value}</p>
//                 <p className="text-gray-500">{label}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Animation keyframes for fadeInScale */}
//       <style>{`
//         @keyframes fadeInScale {
//           0% {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           100% {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fadeInScale {
//           animation-name: fadeInScale;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default ContentDashboard;