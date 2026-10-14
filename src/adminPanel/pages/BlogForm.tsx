// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import MDEditor from "@uiw/react-md-editor";
// import { FaEdit, FaSpinner, FaTrash } from "react-icons/fa";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import {
//   addBlog,
//   updateBlog,
//   deleteBlog,
//   fetchBlogs,
// } from "../features/blogSlice";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// const schema = Yup.object().shape({
//   blogCategory: Yup.string().required("Category is required"),
//   title: Yup.string().required("Title is required"),
//   author: Yup.string().required("Author is required"),
//   content: Yup.string().required("Content is required"),
// });

// const AdminBlogPage = () => {
//   const dispatch = useDispatch();
//   const blogs = useSelector((state: any) => state.blog.blogs);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [formVisible, setFormVisible] = useState(false);
//   const [issubmitting, setSubmitting] = useState(false);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       blogCategory: "",
//       title: "",
//       author: "",
//       content: "",
//     },
//   });

//   useEffect(() => {
//     dispatch(fetchBlogs() as any);
//   }, [dispatch]);

//   const onSubmit = async (data: any) => {
//     setSubmitting(true);
//     try {
//       if (editId) {
//         await dispatch(updateBlog({ id: editId, ...data }) as any);
//         toast.success("Blog updated!");
//       } else {
//         await dispatch(addBlog(data) as any);
//         toast.success("Blog added!");
//       }
//       reset();
//       setEditId(null);
//       setFormVisible(false);
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEdit = (blog: any) => {
//     setEditId(blog.id);
//     setFormVisible(true);
//     setValue("blogCategory", blog.blogCategory);
//     setValue("title", blog.title);
//     setValue("author", blog.author);
//     setValue("content", blog.content);
//   };

//   const handleDelete = (id: string) => {
//     setSelectedBlogId(id);
//     setDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (selectedBlogId) {
//       await dispatch(deleteBlog(selectedBlogId) as any);
//       toast.success("Blog deleted!");
//       setDeleteModalOpen(false);
//       setSelectedBlogId(null);
//     }
//   };

//   return (
//     <div className="px-8 py-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-semibold">Trademark Blogs</h2>
//         <button
//           onClick={() => {
//             setFormVisible(!formVisible);
//             setEditId(null);
//             reset();
//           }}
//           className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {formVisible ? "Close Form" : "Add Blog"}
//         </button>
//       </div>

//       <div className="flex flex-wrap gap-8">
//         <div className="max-w-3xl flex-1">
//           <ul className="space-y-4">
//             {blogs.map((blog: any) => (
//               <li
//                 key={blog.id}
//                 className="bg-white p-4 rounded-md shadow flex justify-between items-start"
//               >
//                 <div>
//                   <Link to={`/trademark-blog-detail/${blog.id}`}>
//                     <h3 className="text-lg font-semibold">{blog.title}</h3>
//                   </Link>
//                   <p className="text-sm text-gray-600">
//                     Category: {blog.blogCategory} | Author: {blog.author}
//                   </p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(blog)}
//                     className="bg-blue-500 cursor-pointer text-white p-3 rounded hover:bg-blue-600"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(blog.id)}
//                     className="bg-red-500 cursor-pointer text-white p-3 rounded hover:bg-red-600"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {formVisible && (
//           <div className="flex-1 max-w-2xl">
//             <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
//               {editId ? "Edit Blog" : "Add Blog"}
//             </h1>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="space-y-6 p-6 bg-white rounded-xl shadow"
//             >
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Category
//                 </label>
//                 <select
//                   {...register("blogCategory")}
//                   className="mt-1 block w-full px-2 border border-gray-300 p-2 rounded-md"
//                 >
//                   <option value="">Select category</option>
//                   <option value="Trademark">Trademarks In The News</option>
//                   <option value="Copyright">Trademark Infringement</option>
//                   <option value="Copyright">Trademark Enforcement</option>
//                   <option value="Patent">General</option>
//                 </select>
//                 {errors.blogCategory && (
//                   <p className="text-red-500 text-sm">
//                     {errors.blogCategory.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Title
//                 </label>
//                 <input
//                   {...register("title")}
//                   className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
//                 />
//                 {errors.title && (
//                   <p className="text-red-500 text-sm">{errors.title.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Author
//                 </label>
//                 <input
//                   {...register("author")}
//                   className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
//                 />
//                 {errors.author && (
//                   <p className="text-red-500 text-sm">
//                     {errors.author.message}
//                   </p>
//                 )}
//               </div>

//               <div data-color-mode="light">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Content
//                 </label>
//                 <Controller
//                   name="content"
//                   control={control}
//                   render={({ field }) => (
//                     <MDEditor
//                       value={field.value}
//                       onChange={field.onChange}
//                       height={300}
//                     />
//                   )}
//                 />
//                 {errors.content && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.content.message}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="cursor-pointer w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//               >
//                 {issubmitting ? (
//                   <FaSpinner className="animate-spin" />
//                 ) : editId ? (
//                   "Update Blog"
//                 ) : (
//                   "Submit"
//                 )}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//       {deleteModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//               Confirm Delete
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this blog?
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setDeleteModalOpen(false)}
//                 className="cursor-pointer px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="cursor-pointer px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlogPage;
