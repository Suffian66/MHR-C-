import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Blog = {
    id: string;
    blogCategory: string;
    title: string;
    author: string;
    content: string;
    createdAt?: string;
};

export const addBlog = createAsyncThunk(
    "blog/addBlog",
    async ({ blogCategory, title, author, content }: Omit<Blog, "id">) => {
        const docRef = await addDoc(collection(db, "blogs"), {
            blogCategory,
            title,
            author,
            content,
            createdAt: serverTimestamp(),
        });

        const docSnap = await getDoc(docRef);
        const blogData = docSnap.data();

        return {
            id: docRef.id,
            blogCategory: blogData?.blogCategory,
            title: blogData?.title,
            author: blogData?.author,
            content: blogData?.content,
            createdAt: blogData?.createdAt?.toDate().toISOString() || null,
        } as Blog;
    }
);

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
    const snapshot = await getDocs(collection(db, "blogs"));
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || null,
        };
    }) as Blog[];
});


export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async ({ id, blogCategory, title, author, content }: Blog) => {
        const docRef = doc(db, "blogs", id);
        await updateDoc(docRef, { blogCategory, title, author, content });
        return { id, blogCategory, title, author, content };
    }
);

export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async (id: string) => {
        await deleteDoc(doc(db, "blogs", id));
        return id;
    }
);

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [] as Blog[],
        status: "idle",
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload);
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                const index = state.blogs.findIndex((b) => b.id === action.payload.id);
                if (index !== -1) state.blogs[index] = action.payload;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.blogs = state.blogs.filter((b) => b.id !== action.payload);
            });
    },
});

export default blogSlice.reducer;
