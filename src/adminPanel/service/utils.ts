// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// // type MediaItem = {
// //   id: string;
// //   name: string;
// //   url: string;
// //   type: string;
// //   altText?: string;
// // };

// type ContentBlock = {
//   id: string;
//   type: "heading" | "paragraph" | "image";
//   text?: string;
//   imageId?: string;
//   order: number;
// };

// type Section = {
//   id: string;
//   title: string;
//   type: string;
//   order: number;
//   content: ContentBlock[];
// };

// export function getSection(sections: Section[], title: string) {
//   return sections.find((sec) => sec.title === title);
// }

// export function getBlock(section: Section | undefined, blockId: string) {
//   return section?.content?.find((b) => b.id === blockId);
// }