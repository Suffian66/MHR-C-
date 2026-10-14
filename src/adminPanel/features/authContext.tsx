// // src/context/AuthContext.tsx
// import React, { useEffect, useState, createContext, useContext } from "react";
// import { onAuthStateChanged, type User } from "firebase/auth";
// import { auth } from "../../../../firebase.config";

// const AuthContext = createContext<{ user: User | null }>({ user: null });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
