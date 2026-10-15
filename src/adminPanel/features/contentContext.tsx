import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../service/firebase";

// ---------- Types ----------
export type MediaItem = {
    id: string;
    fileName: string;
    mediaUrl: string;
    mediaType: string;
    altText: string;
};

export type ContentBlock = {
    id: string;
    type: string;
    text?: string;
    order?: number;
    [key: string]: any; // flexible fields
};

export type Section = {
    id: string;
    title: string;
    type: string;
    order?: number;
    content: ContentBlock[];
};

export type Member = {
    id: string;
    slug: string;
    name?: string;
    imageUrl?: string;
    [key: string]: any; // flexible fields
};

// Section + pre-indexed blocks
export type SectionWithBlocks = Section & {
    blocks: Record<string, ContentBlock>;
};

export type ContentContextType = {
    media: MediaItem[];
    sectionsBySlug: Record<string, Record<string, SectionWithBlocks>>;
    loadSectionsBySlug: (slug: string) => Promise<void>;
    loading: boolean;
    // members: Member[];
    loadMembers: () => Promise<any>;
};

// ---------- Context ----------
const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
    const [media, setMedia] = useState<MediaItem[]>([]);
    // const [members, setMembers] = useState<Member[]>([]);
    const [sectionsBySlug, setSectionsBySlug] = useState<
        Record<string, Record<string, SectionWithBlocks>>
    >({});
    const [loading, setLoading] = useState(false);

    // Load media once
    useEffect(() => {
        const loadMedia = async () => {
            const snapshot = await getDocs(collection(db, "media"));
            const mediaItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                fileName: doc.data().fileName || "",
                mediaUrl: doc.data().mediaUrl || "",
                mediaType: doc.data().mediaType || "",
                altText: doc.data().altText || "",
            }));
            setMedia(mediaItems);
        };

        loadMedia();
    }, []);


    // Load sections by slug
    const loadSectionsBySlug = async (slug: string) => {
        if (!slug) return;
        if (sectionsBySlug[slug]) return; // cached

        setLoading(true);
        try {
            // Find page by slug
            const q = query(collection(db, "pages"), where("slug", "==", slug));
            const pagesSnap = await getDocs(q);
            if (pagesSnap.empty) {
                console.warn(`No page found for slug "${slug}"`);
                setSectionsBySlug((prev) => ({ ...prev, [slug]: {} }));
                return;
            }

            const pageDoc = pagesSnap.docs[0];
            const pageDocId = pageDoc.id;

            // Get sections inside page
            const secsSnap = await getDocs(collection(db, "pages", pageDocId, "sections"));
            const pageSections: SectionWithBlocks[] = secsSnap.docs.map((d) => {
                const data = d.data() as any;
                const blocks: Record<string, ContentBlock> = {};
                (data.content || [])
                    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
                    .forEach((block: ContentBlock) => {
                        blocks[block.id] = block;
                    });

                return {
                    id: d.id,
                    title: data.title,
                    type: data.type,
                    order: data.order,
                    content: data.content || [],
                    blocks,
                };
            });

            // Convert into dictionary keyed by section.title
            const sectionDict: Record<string, SectionWithBlocks> = {};
            pageSections.forEach((sec) => {
                sectionDict[sec.title] = sec;
            });

            setSectionsBySlug((prev) => ({ ...prev, [slug]: sectionDict }));
        } finally {
            setLoading(false);
        }
    };

    const loadMembers = async () => {
        const teamSlugs = ["kurt", "ibrahim", "james"]; // hardcoded team members

        const q = query(collection(db, "pages"), where("slug", "in", teamSlugs));
        const snap = await getDocs(q);

        const members = await Promise.all(
            snap.docs.map(async (doc) => {
                const data = doc.data();
                const sectionsSnap = await getDocs(
                    collection(db, "pages", doc.id, "sections")
                );

                const sections = sectionsSnap.docs.map((s) => ({
                    id: s.id,
                    ...s.data(),
                }));

                return {
                    id: doc.id,
                    slug: data.slug,
                    title: data.title,
                    sections,
                };
            })
        );

        return members;
    };



    return (
        <ContentContext.Provider value={{ media, sectionsBySlug, loadSectionsBySlug, loading, loadMembers }}>
            {children}
        </ContentContext.Provider>
    );
}

// Hook
export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) throw new Error("useContent must be used inside ContentProvider");
    return ctx;
}
