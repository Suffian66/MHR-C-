// // src/pages/Login.tsx
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebase.config";
// import { toast } from "react-toastify";

// // const ADMIN_EMAIL = "ibrahim@outlook.com";
// const ADMIN_EMAIL = "test@email.com";

// const schema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(6, "Minimum 6 characters")
//     .required("Password is required"),
// });

// const Login = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const onSubmit = async (data: { email: string; password: string }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );

//       if (userCredential.user.email !== ADMIN_EMAIL) {
//         toast.warning("Access denied: not authorized as admin.");
//         return;
//       }

//       navigate("/admin"); // Redirect to admin panel
//       toast.success("Login successful!");
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         console.error("Unknown error:", error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           <div>
//             <label
//               htmlFor="email"
//               className="block mb-1 text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               {...register("email")}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-1 text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               {...register("password")}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
