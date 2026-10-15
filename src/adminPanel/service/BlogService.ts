import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";

import { db } from "./firebase";

// ----------------------------------
// Types
// ----------------------------------

export type BlogStatus = "draft" | "published";

export type BlogItem = {
    id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: BlogStatus;
    createdAt?: unknown;
    updatedAt?: unknown;
};

const BLOGS_COLLECTION = "blogs";

// ----------------------------------
// Generate slug from title
// ----------------------------------

export const generateBlogSlug = (title: string): string =>
    title
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

// ----------------------------------
// Check for duplicate slug
// ----------------------------------

const checkDuplicateSlug = async (
    slug: string,
    excludeBlogId?: string
): Promise<boolean> => {
    const q = query(
        collection(db, BLOGS_COLLECTION),
        where("slug", "==", slug)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.some(
        (blogDoc) => blogDoc.id !== excludeBlogId
    );
};

// ----------------------------------
// Create a blog
// ----------------------------------

export const addBlog = async (
    title: string,
    content: string,
    featuredImage: string,
    status: BlogStatus = "draft"
): Promise<string> => {
    const cleanTitle = title.trim();
    const cleanContent = content.trim();
    const slug = generateBlogSlug(cleanTitle);

    if (!cleanTitle || !slug) {
        throw new Error("Please enter a valid blog title.");
    }

    if (!cleanContent || !cleanContent.replace(/<[^>]*>/g, "").trim()) {
        throw new Error("Please enter the main article content.");
    }

    if (await checkDuplicateSlug(slug)) {
        throw new Error(
            `A blog with the slug "${slug}" already exists. Please choose a different title.`
        );
    }

    const blogRef = await addDoc(
        collection(db, BLOGS_COLLECTION),
        {
            title: cleanTitle,
            slug,
            content: cleanContent,
            featuredImage: featuredImage.trim(),
            status,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }
    );

    return blogRef.id;
};

// ----------------------------------
// Fetch all blogs
// ----------------------------------

export const fetchBlogs = async (): Promise<BlogItem[]> => {
    const snapshot = await getDocs(
        collection(db, BLOGS_COLLECTION)
    );

    return snapshot.docs
        .map((blogDoc) => {
            const data = blogDoc.data();

            return {
                id: blogDoc.id,
                title: data.title ?? "",
                slug: data.slug ?? "",
                content: data.content ?? "",
                featuredImage: data.featuredImage ?? "",
                status: data.status === "published" ? "published" : "draft",
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            } as BlogItem;
        })
        .sort((a, b) => a.title.localeCompare(b.title));
};

// ----------------------------------
// Update a blog
// ----------------------------------

export const updateBlog = async (
    blogId: string,
    updates: Partial<
        Pick<
            BlogItem,
            "title" | "content" | "featuredImage" | "status"
        >
    >
): Promise<void> => {
    const safeUpdates: Record<string, unknown> = {};

    if (updates.title !== undefined) {
        const cleanTitle = updates.title.trim();
        const slug = generateBlogSlug(cleanTitle);

        if (!cleanTitle || !slug) {
            throw new Error("Please enter a valid blog title.");
        }

        if (await checkDuplicateSlug(slug, blogId)) {
            throw new Error(
                `A blog with the slug "${slug}" already exists.`
            );
        }

        safeUpdates.title = cleanTitle;
        safeUpdates.slug = slug;
    }

    if (updates.content !== undefined) {
        const cleanContent = updates.content.trim();

        if (!cleanContent || !cleanContent.replace(/<[^>]*>/g, "").trim()) {
            throw new Error("Please enter the main article content.");
        }

        safeUpdates.content = cleanContent;
    }

    if (updates.featuredImage !== undefined) {
        safeUpdates.featuredImage = updates.featuredImage.trim();
    }

    if (updates.status !== undefined) {
        safeUpdates.status = updates.status;
    }

    await updateDoc(doc(db, BLOGS_COLLECTION, blogId), {
        ...safeUpdates,
        updatedAt: serverTimestamp(),
    });
};

// ----------------------------------
// Delete a blog
// ----------------------------------

export const deleteBlog = async (
    blogId: string
): Promise<void> => {
    await deleteDoc(doc(db, BLOGS_COLLECTION, blogId));
};