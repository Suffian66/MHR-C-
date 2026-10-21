type FirebaseBlock = {
  id: string;
  type: string;
  text?: string;
  imageId?: string;
};

type FirebaseSection = {
  title: string;
  content: FirebaseBlock[];
};

export function mapSectionContent(sections: FirebaseSection[]) {
  return Object.fromEntries(
    sections.map((section) => [
      section.title.toLowerCase(),
      Object.fromEntries(
        section.content.map((block) => [block.id, block])
      ),
    ])
  );
}

export function getServiceDetails(
  slug: string,
  sections: any,
  getUrl: (imageId?: string) => string | null
) {
  switch (slug) {
    case 'kitchen-renovation':
      return {
        eyebrow: sections.banner?.heading1?.text,
        headline: sections.banner?.heading2?.text,
        highlight: sections.banner?.heading3?.text,
        description: sections.banner?.paragraph1?.text,
        introTitle: sections.intro?.heading2?.text,
        intro: sections?.intro?.paragraph1?.text,
        statement: sections?.intro?.paragraph2?.text,
        features: [
          {
            number: '01',
            title: sections?.details?.heading1?.text,
            text: sections?.details?.paragraph1?.text,
          },
          {
            number: '02',
            title: sections?.details?.heading2?.text,
            text: sections?.details?.paragraph2?.text,
          },
          {
            number: '03',
            title: sections?.details?.heading3?.text,
            text: sections?.details?.paragraph3?.text,
          },
        ],
        galleryTitle: sections?.gallery?.heading1?.text,
        galleryDescription: sections?.gallery?.paragraph1?.text,
        gallery: [
          {
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/project-rsc/kitchen.png',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/kitchen-2.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/project-rsc/kitchen2.jpeg',
            caption: sections?.gallery?.heading4?.text,
          },
        ],
        process: [
          {
            title: sections?.process?.heading1?.text,
            text: sections?.process?.paragraph1?.text,
          },
          {
            title: sections?.process?.heading2?.text,
            text: sections?.process?.paragraph2?.text,
          },
          {
            title: sections?.process?.heading3?.text,
            text: sections?.process?.paragraph3?.text,
          },
        ],
        ctaTitle: sections?.cta?.heading1?.text,
        heroImages: [
          {
            image: getUrl(sections.banner?.image1?.imageId) || "/images/kitchen-1.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/kitchen.png",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/project-rsc/kitchen.png",
            caption: "Premium kitchen finishes",
          },
          {
            image: getUrl(sections.banner?.image4?.imageId) || "/images/project-rsc/kitchen4.JPEG",
            caption: "Kitchen island design",
          },
          {
            image: getUrl(sections.banner?.image5?.imageId) || "/images/project-rsc/kitchen3.jpeg",
            caption: "Contemporary kitchen interiors",
          },
        ],
      }
    case 'bathroom-renovation':
      return {
        eyebrow: sections.banner?.heading1?.text,
        headline: sections.banner?.heading2?.text,
        highlight: sections.banner?.heading3?.text,
        description: sections.banner?.paragraph1?.text,
        introTitle: sections.intro?.heading1?.text,
        intro: sections?.intro?.paragraph1?.text,
        statement: sections?.intro?.paragraph1?.text,
        features: [
          {
            number: '01',
            title: sections?.details?.heading1?.text,
            text: sections?.details?.paragraph1?.text,
          },
          {
            number: '02',
            title: sections?.details?.heading2?.text,
            text: sections?.details?.paragraph2?.text,
          },
          {
            number: '03',
            title: sections?.details?.heading3?.text,
            text: sections?.details?.paragraph3?.text,
          },
        ],
        galleryTitle: sections?.gallery?.heading1?.text,
        galleryDescription: sections?.gallery?.paragraph1?.text,
        gallery: [
          {
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/project-rsc/bathroom6.png',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/project-rsc/bathroom7.png',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/project-rsc/bathroom2.jpeg',
            caption: sections?.gallery?.heading4?.text,
          },

        ],
        process: [
          {
            title: sections?.process?.heading1?.text,
            text: sections?.process?.paragraph1?.text,
          },
          {
            title: sections?.process?.heading2?.text,
            text: sections?.process?.paragraph2?.text,
          },
          {
            title: sections?.process?.heading3?.text,
            text: sections?.process?.paragraph3?.text,
          },
        ],
        ctaTitle: sections?.cta?.heading1?.text,
        heroImages: [
          {
            image: getUrl(sections.banner?.image1?.imageId) || "/images/project-rsc/bathroom1.jpeg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/bathroom-1/4.jpg",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/bathroom-1/5.jpg",
            caption: "Premium kitchen finishes",
          },
          {
            image: getUrl(sections.banner?.image4?.imageId) || "/images/bathroom-1/2.jpg",
            caption: "Kitchen island design",
          },
          {
            image: getUrl(sections.banner?.image5?.imageId) || "/images/project-rsc/bathroom5.jpeg",
            caption: "Contemporary kitchen interiors",
          },
        ],
      }
    case 'basement-renovation':
      return {
        eyebrow: sections.banner?.heading1?.text,
        headline: sections.banner?.heading2?.text,
        highlight: sections.banner?.heading3?.text,
        description: sections.banner?.paragraph1?.text,
        introTitle: sections.intro?.heading1?.text,
        intro: sections?.intro?.paragraph1?.text,
        statement: sections?.intro?.heading2?.text,
        features: [
          {
            number: '01',
            title: sections?.details?.heading1?.text,
            text: sections?.details?.paragraph1?.text,
          },
          {
            number: '02',
            title: sections?.details?.heading2?.text,
            text: sections?.details?.paragraph2?.text,
          },
          {
            number: '03',
            title: sections?.details?.heading3?.text,
            text: sections?.details?.paragraph3?.text,
          },
        ],
        galleryTitle: sections?.gallery?.heading1?.text,
        galleryDescription: sections?.gallery?.paragraph1?.text,
        gallery: [
          {
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/basement-4.jpg',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/basement-5.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/basement-3.jpg',
            caption: sections?.gallery?.heading4?.text,
          },

        ],
        process: [
          {
            title: sections?.process?.heading1?.text,
            text: sections?.process?.paragraph1?.text,
          },
          {
            title: sections?.process?.heading2?.text,
            text: sections?.process?.paragraph2?.text,
          },
          {
            title: sections?.process?.heading3?.text,
            text: sections?.process?.paragraph3?.text,
          },
        ],
        ctaTitle: sections?.cta?.heading1?.text,
        heroImages: [
          {
            image: getUrl(sections.banner?.image1?.imageId) || "/images/basement-6.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/basement-1.jpg",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/basement-2.jpg",
            caption: "Premium kitchen finishes",
          },
          {
            image: getUrl(sections.banner?.image4?.imageId) || "/images/project-bhc/laundry.JPG",
            caption: "Kitchen island design",
          },
          {
            image: getUrl(sections.banner?.image5?.imageId) || "/images/project-bhc/cabinet.jpg",
            caption: "Contemporary kitchen interiors",
          },
        ],
      }
    case 'window-covering':
      return {
        eyebrow: sections.banner?.heading1?.text,
        headline: sections.banner?.heading2?.text,
        highlight: sections.banner?.heading3?.text,
        description: sections.banner?.paragraph1?.text,
        introTitle: sections.intro?.heading1?.text,
        intro: sections?.intro?.paragraph1?.text,
        statement: sections?.intro?.heading2?.text,
        features: [
          {
            number: '01',
            title: sections?.details?.heading1?.text,
            text: sections?.details?.paragraph1?.text,
          },
          {
            number: '02',
            title: sections?.details?.heading2?.text,
            text: sections?.details?.paragraph2?.text,
          },
          {
            number: '03',
            title: sections?.details?.heading3?.text,
            text: sections?.details?.paragraph3?.text,
          },
        ],
        galleryTitle: sections?.gallery?.heading1?.text,
        galleryDescription: sections?.gallery?.paragraph1?.text,
        gallery: [
          {
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/blinds-5.jpg',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/blinds-7.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/blinds-6.jpg',
            caption: sections?.gallery?.heading4?.text,
          },

        ],
        process: [
          {
            title: sections?.process?.heading1?.text,
            text: sections?.process?.paragraph1?.text,
          },
          {
            title: sections?.process?.heading2?.text,
            text: sections?.process?.paragraph2?.text,
          },
          {
            title: sections?.process?.heading3?.text,
            text: sections?.process?.paragraph3?.text,
          },
        ],
        ctaTitle: sections?.cta?.heading1?.text,
        heroImages: [
          {
            image: getUrl(sections.banner?.image1?.imageId) || "/images/blinds-1.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/blinds-3.jpg",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/blinds-4.jpg",
            caption: "Premium kitchen finishes",
          },
          {
            image: getUrl(sections.banner?.image4?.imageId) || "/images/blinds-2.jpg",
            caption: "Kitchen island design",
          },
          {
            image: getUrl(sections.banner?.image5?.imageId) || "/images/blinds-7.jpg",
            caption: "Contemporary kitchen interiors",
          },
        ],
      }
    case 'drywall':
      return {
        eyebrow: sections.banner?.heading1?.text,
        headline: sections.banner?.heading2?.text,
        highlight: sections.banner?.heading3?.text,
        description: sections.banner?.paragraph1?.text,
        introTitle: sections.intro?.heading1?.text,
        intro: sections?.intro?.paragraph1?.text,
        statement: sections?.intro?.heading2?.text,
        features: [
          {
            number: '01',
            title: sections?.details?.heading1?.text,
            text: sections?.details?.paragraph1?.text,
          },
          {
            number: '02',
            title: sections?.details?.heading2?.text,
            text: sections?.details?.paragraph2?.text,
          },
          {
            number: '03',
            title: sections?.details?.heading3?.text,
            text: sections?.details?.paragraph3?.text,
          },
        ],
        galleryTitle: sections?.gallery?.heading1?.text,
        galleryDescription: sections?.gallery?.paragraph1?.text,
        gallery: [
          {
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/drywall-1.jpg',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/drywall-5.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/drywall-7.jpg',
            caption: sections?.gallery?.heading4?.text,
          },

        ],
        process: [
          {
            title: sections?.process?.heading1?.text,
            text: sections?.process?.paragraph1?.text,
          },
          {
            title: sections?.process?.heading2?.text,
            text: sections?.process?.paragraph2?.text,
          },
          {
            title: sections?.process?.heading3?.text,
            text: sections?.process?.paragraph3?.text,
          },
        ],
        ctaTitle: sections?.cta?.heading1?.text,
        heroImages: [
          {
            image: getUrl(sections.banner?.image1?.imageId) || "/images/drywall-2.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/drywall-3.jpg",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/drywall-4.jpg",
            caption: "Premium kitchen finishes",
          },
          {
            image: getUrl(sections.banner?.image4?.imageId) || "/images/drywall-5.jpg",
            caption: "Kitchen island design",
          },
          {
            image: getUrl(sections.banner?.image5?.imageId) || "/images/drywall-6.jpg",
            caption: "Contemporary kitchen interiors",
          },
        ],
      }
    case 'home-staging':
      return {
        eyebrow: sections.banner?.heading1?.text,
        headline: sections.banner?.heading2?.text,
        highlight: sections.banner?.heading3?.text,
        description: sections.banner?.paragraph1?.text,
        introTitle: sections.intro?.heading1?.text,
        intro: sections?.intro?.paragraph1?.text,
        statement: sections?.intro?.heading2?.text,
        features: [
          {
            number: '01',
            title: sections?.details?.heading1?.text,
            text: sections?.details?.paragraph1?.text,
          },
          {
            number: '02',
            title: sections?.details?.heading2?.text,
            text: sections?.details?.paragraph2?.text,
          },
          {
            number: '03',
            title: sections?.details?.heading3?.text,
            text: sections?.details?.paragraph3?.text,
          },
        ],
        galleryTitle: sections?.gallery?.heading1?.text,
        galleryDescription: sections?.gallery?.paragraph1?.text,
        gallery: [
          {
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/home-1.jpg',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/home-6.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/home-7.jpg',
            caption: sections?.gallery?.heading4?.text,
          },

        ],
        process: [
          {
            title: sections?.process?.heading1?.text,
            text: sections?.process?.paragraph1?.text,
          },
          {
            title: sections?.process?.heading2?.text,
            text: sections?.process?.paragraph2?.text,
          },
          {
            title: sections?.process?.heading3?.text,
            text: sections?.process?.paragraph3?.text,
          },
        ],
        ctaTitle: sections?.cta?.heading1?.text,
        heroImages: [
          {
            image: getUrl(sections.banner?.image1?.imageId) || "/images/home-8.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/home-2.jpg",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/home-3.jpg",
            caption: "Premium kitchen finishes",
          },
          {
            image: getUrl(sections.banner?.image4?.imageId) || "/images/home-4.jpg",
            caption: "Kitchen island design",
          },
          {
            image: getUrl(sections.banner?.image5?.imageId) || "/images/home-5.jpg",
            caption: "Contemporary kitchen interiors",
          },
        ],
      }
    default:
      return null;
  }
}