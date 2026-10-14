// // /src/admin/components/AdminLayout.tsx
// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaBars, FaHome, FaFileAlt, FaFolder } from "react-icons/fa";

// type NavItem = {
//   label: string;
//   to: string;
//   icon: React.ComponentType<{ className?: string }>;
// };

// const NAV_ITEMS: NavItem[] = [
//   { label: "Dashboard", to: "/admin/content", icon: FaHome },
//   { label: "Pages", to: "/admin/content/pages", icon: FaFileAlt },
//   { label: "Media", to: "/admin/content/media", icon: FaFolder },
//   { label: "Add Pages", to: "/admin/content/add-Content", icon: FaBars },
// ];

// const Sidebar: React.FC<{ open: boolean; onClose?: () => void }> = ({
//   open,
//   onClose,
// }) => {
//   return (
//     <aside
//       className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ${
//         open ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0`}
//     >
//       <div className="h-full flex flex-col">
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <Link to="/admin" className="text-lg font-bold text-gray-800">
//             <img src="/logoWhite.png" alt="Logo" className="h-8" />
//           </Link>
//           <button
//             className="md:hidden p-2 rounded hover:bg-gray-100"
//             onClick={onClose}
//             aria-label="Close sidebar"
//           >
//             <FaBars />
//           </button>
//         </div>

//         <nav className="px-2 py-5  flex-1 overflow-y-auto">
//           {NAV_ITEMS.map((item) => {
//             const Icon = item.icon;
//             return (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 end
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-2 my-1 rounded-md text-sm font-medium ${
//                     isActive
//                       ? "bg-blue-50 text-blue-700"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }`
//                 }
//               >
//                 <Icon className="w-4 h-4" />
//                 <span>{item.label}</span>
//               </NavLink>
//             );
//           })}
//         </nav>
//       </div>
//     </aside>
//   );
// };

// const Topbar: React.FC<{ onToggleSidebar: () => void }> = ({
//   onToggleSidebar,
// }) => {
//   return (
//     <header className="w-full bg-white border-b px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-4">
//         <button
//           className="md:hidden p-2 rounded hover:bg-gray-100"
//           onClick={onToggleSidebar}
//           aria-label="Toggle sidebar"
//         >
//           <FaBars />
//         </button>
//         <h1 className="text-xl font-semibold text-gray-800 mt-2 mb-1">
//           Content Management Dashboard
//         </h1>
//       </div>

//       <div className="flex items-center gap-4">
//         <Link
//           to="/"
//           className="hidden sm:inline-block bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
//         >
//           View Site
//         </Link>
//       </div>
//     </header>
//   );
// };

// const Layout: React.FC<{ children: React.ReactNode; title?: string }> = ({
//   children,
//   title,
// }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="md:pl-64">
//         <Topbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />

//         <main className="p-6">
//           {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

//           <div className="space-y-6">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
