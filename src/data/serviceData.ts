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

// export const serviceDetails = {
//   'kitchen-renovations': {
//     eyebrow: 'THE HEART OF YOUR HOME',
//     headline: 'A kitchen made for',
//     highlight: 'living.',
//     description:
//       'Thoughtful layouts, beautiful materials, and considered details come together to create a kitchen that feels entirely your own.',
//     introTitle: 'More than a place to cook.',
//     intro:
//       'A well-designed kitchen brings people together. From the way you move through the space to the materials you touch every day, every decision should balance beauty with everyday function.',
//     statement:
//       'Beautifully considered. Thoughtfully crafted. Made for the way you live.',
//     features: [
//       {
//         number: '01',
//         title: 'Thoughtful layouts',
//         text: 'Make the most of your space with a layout that supports cooking, gathering, and everyday routines.',
//       },
//       {
//         number: '02',
//         title: 'Materials that matter',
//         text: 'Explore cabinetry, countertops, backsplashes, and finishes that work beautifully together.',
//       },
//       {
//         number: '03',
//         title: 'Details that define',
//         text: 'Lighting, hardware, storage, and finishing touches bring the entire design together.',
//       },
//     ],
//     galleryTitle: 'A closer look at the details.',
//     galleryDescription:
//       'The materials, textures, and finishes that give a kitchen its character.',
//     gallery: [
//       {
//         image: '/images/project-rsc/kitchen.png',
//         caption: 'Spaces that welcome',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Considered finishes',
//       },
//       {
//         image: '/images/project-rsc/kitchen2.jpeg',
//         caption: 'A cohesive interior',
//       },
//     ],
//     process: [
//       {
//         title: 'Discover',
//         text: 'We learn about your space, priorities, lifestyle, and the changes you want to make.',
//       },
//       {
//         title: 'Plan',
//         text: 'We work through layout ideas, material choices, and the important details of your project.',
//       },
//       {
//         title: 'Transform',
//         text: 'The work moves forward with attention to craftsmanship, communication, and the finishing details.',
//       },
//     ],
//     ctaTitle: 'Your kitchen transformation starts here.',
//     heroImages: [
//       {
//         image: "/images/project-aa/kitchen.jpg",
//         caption: "Modern kitchen renovation",
//       },
//       {
//         image: "/images/kitchen.png",
//         caption: "Custom kitchen cabinetry",
//       },
//       {
//         image: "/images/project-rsc/kitchen.png",
//         caption: "Premium kitchen finishes",
//       },
//       {
//         image: "/images/project-rsc/kitchen4.JPEG",
//         caption: "Kitchen island design",
//       },
//       {
//         image: "/images/project-rsc/kitchen3.jpeg",
//         caption: "Contemporary kitchen interiors",
//       },
//     ],
//   },

//   'bathroom-renovations': {
//     eyebrow: 'EVERYDAY COMFORT, REIMAGINED',
//     headline: 'A little more room to',
//     highlight: 'unwind.',
//     description:
//       'Create a bathroom that feels calm, considered, and beautifully suited to your everyday routine.',
//     introTitle: 'Your own everyday retreat.',
//     intro:
//       'A thoughtful bathroom renovation brings together practical planning, carefully selected materials, and the right balance of light, storage, and comfort.',
//     statement:
//       'A quieter palette. Better details. A space to recharge.',
//     features: [
//       {
//         number: '01',
//         title: 'Beautiful surfaces',
//         text: 'Explore tile, stone-inspired finishes, colours, and textures that create a cohesive look.',
//       },
//       {
//         number: '02',
//         title: 'Fixtures and fittings',
//         text: 'Bring together vanities, showers, faucets, and accessories with a consistent design direction.',
//       },
//       {
//         number: '03',
//         title: 'Comfort in every detail',
//         text: 'Consider lighting, ventilation, storage, and layout to make your bathroom work better.',
//       },
//     ],
//     galleryTitle: 'The art of slowing down.',
//     galleryDescription:
//       'Explore the textures, finishes, and details that shape a more considered bathroom.',
//     gallery: [
//       {
//         image: '/images/project-rsc/bathroom6.png',
//         caption: 'A calmer atmosphere',
//       },
//       {
//         image: '/images/project-rsc/bathroom7.png',
//         caption: 'Refined materials',
//       },
//       {
//         image: '/images/project-rsc/bathroom2.jpeg',
//         caption: 'Thoughtful details',
//       },
//     ],
//     process: [
//       {
//         title: 'Discuss',
//         text: 'We explore your priorities, preferred style, practical needs, and plans for the space.',
//       },
//       {
//         title: 'Coordinate',
//         text: 'We consider finishes, fixtures, layout, and the details that shape the renovation.',
//       },
//       {
//         title: 'Complete',
//         text: 'The renovation progresses through the planned work and finishing details.',
//       },
//     ],
//     ctaTitle: 'Ready for a more considered bathroom?',
//     heroImages: [
//       {
//         image: "/images/project-rsc/bathroom1.jpeg",
//         caption: "Modern kitchen renovation",
//       },
//       {
//         image: "/images/bathroom-1/4.jpg",
//         caption: "Custom kitchen cabinetry",
//       },
//       {
//         image: "/images/bathroom-1/5.jpg",
//         caption: "Premium kitchen finishes",
//       },
//       {
//         image: "/images/bathroom-1/2.jpg",
//         caption: "Kitchen island design",
//       },
//       {
//         image: "/images/project-rsc/bathroom5.jpeg",
//         caption: "Contemporary kitchen interiors",
//       },

//     ],
//   },

//   'basement-renovations': {
//     eyebrow: 'MAKE MORE OF YOUR HOME',
//     headline: 'Room to live a little',
//     highlight: 'more.',
//     description:
//       'Turn underused space into a welcoming extension of your home, designed around the things that matter to you.',
//     introTitle: 'Discover the potential below.',
//     intro:
//       'A basement can become so much more than extra storage. With a thoughtful layout and a clear design direction, it can support family time, entertaining, working, or simply having more room to breathe.',
//     statement:
//       'More possibility. More flexibility. More room for life.',
//     features: [
//       {
//         number: '01',
//         title: 'Spaces for gathering',
//         text: 'Plan comfortable family rooms, entertainment areas, or places to spend time together.',
//       },
//       {
//         number: '02',
//         title: 'Work and unwind',
//         text: 'Explore layouts for a home office, hobby area, or a quieter place to relax.',
//       },
//       {
//         number: '03',
//         title: 'A finished feel',
//         text: 'Bring together lighting, flooring, wall finishes, and storage for a cohesive result.',
//       },
//     ],
//     galleryTitle: 'A new perspective on space.',
//     galleryDescription:
//       'Ideas for making a lower level feel welcoming, functional, and connected to the rest of your home.',
//     gallery: [
//       {
//         image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Comfortable living',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Warm, inviting finishes',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Designed for everyday life',
//       },
//     ],
//     process: [
//       {
//         title: 'Explore',
//         text: 'We discuss how you want to use the space and identify your priorities.',
//       },
//       {
//         title: 'Organize',
//         text: 'We consider the layout, lighting, finishes, and practical requirements.',
//       },
//       {
//         title: 'Create',
//         text: 'The space takes shape through coordinated work and considered finishing.',
//       },
//     ],
//     ctaTitle: 'Let’s make more of your home.',
//     heroImages: [
//       {
//         image: "/images/services/kitchen/kitchen-1.jpg",
//         caption: "Modern kitchen renovation",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-2.jpg",
//         caption: "Custom kitchen cabinetry",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-3.jpg",
//         caption: "Premium kitchen finishes",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-4.jpg",
//         caption: "Kitchen island design",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-5.jpg",
//         caption: "Contemporary kitchen interiors",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-6.jpg",
//         caption: "Kitchen renovation details",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-7.jpg",
//         caption: "Completed kitchen project",
//       },
//     ],
//   },

//   'window-coverings': {
//     eyebrow: 'THE FINISHING TOUCH',
//     headline: 'Frame the light.',
//     highlight: 'Beautifully.',
//     description:
//       'Bring softness, privacy, and character to your interiors with window coverings selected for your space.',
//     introTitle: 'Small details. A different feeling.',
//     intro:
//       'Window coverings influence the way a room feels throughout the day. The right fabric, finish, and style can soften natural light, provide privacy, and bring a room together.',
//     statement:
//       'The right light. The right texture. The right finishing touch.',
//     features: [
//       {
//         number: '01',
//         title: 'Curtains and drapery',
//         text: 'Explore fabrics, lengths, and styles that complement the proportions of your room.',
//       },
//       {
//         number: '02',
//         title: 'Blinds and light control',
//         text: 'Consider practical options for privacy and managing daylight throughout the day.',
//       },
//       {
//         number: '03',
//         title: 'A considered finish',
//         text: 'Coordinate colours, textures, and hardware with your wider interior design.',
//       },
//     ],
//     galleryTitle: 'Light, texture, and atmosphere.',
//     galleryDescription:
//       'Discover how window treatments can complement the materials and mood of an interior.',
//     gallery: [
//       {
//         image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Soft natural light',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Textures in harmony',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=85',
//         caption: 'A finished interior',
//       },
//     ],
//     process: [
//       {
//         title: 'Explore',
//         text: 'We discuss your preferred style, privacy needs, and how you use each room.',
//       },
//       {
//         title: 'Select',
//         text: 'We consider suitable materials, colours, styles, and measurements.',
//       },
//       {
//         title: 'Finish',
//         text: 'The selected window coverings bring the final layer of detail to your interior.',
//       },
//     ],
//     ctaTitle: 'Let’s find the right finishing touch.',
//     heroImages: [
//       {
//         image: "/images/services/kitchen/kitchen-1.jpg",
//         caption: "Modern kitchen renovation",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-2.jpg",
//         caption: "Custom kitchen cabinetry",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-3.jpg",
//         caption: "Premium kitchen finishes",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-4.jpg",
//         caption: "Kitchen island design",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-5.jpg",
//         caption: "Contemporary kitchen interiors",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-6.jpg",
//         caption: "Kitchen renovation details",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-7.jpg",
//         caption: "Completed kitchen project",
//       },
//     ],
//   },

//   drywall: {
//     eyebrow: 'THE FOUNDATION OF A GREAT FINISH',
//     headline: 'Good work starts',
//     highlight: 'beneath the surface.',
//     description:
//       'Careful preparation and clean finishing create the foundation for interiors that look polished and feel complete.',
//     introTitle: 'The details you notice without seeing.',
//     intro:
//       'Walls and ceilings set the tone for an entire room. Quality drywall work and surface preparation help create a clean, consistent finish ready for the next stage of your interior project.',
//     statement:
//       'Clean lines. Smooth surfaces. Care in every detail.',
//     features: [
//       {
//         number: '01',
//         title: 'Installation and repairs',
//         text: 'Address drywall needs as part of your renovation or interior improvement project.',
//       },
//       {
//         number: '02',
//         title: 'Finishing and preparation',
//         text: 'Prepare wall and ceiling surfaces for the finish that follows.',
//       },
//       {
//         number: '03',
//         title: 'A cleaner result',
//         text: 'Give attention to joints, edges, transitions, and the details that influence the final appearance.',
//       },
//     ],
//     galleryTitle: 'Craftsmanship in the details.',
//     galleryDescription:
//       'A closer look at the surfaces and finishing work that help complete an interior.',
//     gallery: [
//       {
//         image: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Careful preparation',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Clean interior lines',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
//         caption: 'The finished space',
//       },
//     ],
//     process: [
//       {
//         title: 'Assess',
//         text: 'We review the surfaces, the work required, and how it fits into the wider project.',
//       },
//       {
//         title: 'Prepare',
//         text: 'The relevant surfaces and surrounding work areas are prepared for the job.',
//       },
//       {
//         title: 'Finish',
//         text: 'Installation, repairs, and finishing are completed according to the agreed scope.',
//       },
//     ],
//     ctaTitle: 'Let’s get the details right.',
//     heroImages: [
//       {
//         image: "/images/services/kitchen/kitchen-1.jpg",
//         caption: "Modern kitchen renovation",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-2.jpg",
//         caption: "Custom kitchen cabinetry",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-3.jpg",
//         caption: "Premium kitchen finishes",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-4.jpg",
//         caption: "Kitchen island design",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-5.jpg",
//         caption: "Contemporary kitchen interiors",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-6.jpg",
//         caption: "Kitchen renovation details",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-7.jpg",
//         caption: "Completed kitchen project",
//       },
//     ],
//   },

//   'home-staging': {
//     eyebrow: 'MAKE THE FIRST IMPRESSION COUNT',
//     headline: 'Help them imagine',
//     highlight: 'home.',
//     description:
//       'Thoughtful presentation, balanced styling, and carefully chosen details help your property make a memorable first impression.',
//     introTitle: 'Every room tells a story.',
//     intro:
//       'Home staging helps people understand the potential of a space. By considering furniture placement, visual balance, and the flow between rooms, you can present your property in a more inviting way.',
//     statement:
//       'A considered presentation can change how a space is experienced.',
//     features: [
//       {
//         number: '01',
//         title: 'Thoughtful room layouts',
//         text: 'Arrange furniture and define spaces to support a natural flow through the home.',
//       },
//       {
//         number: '02',
//         title: 'Styling and balance',
//         text: 'Bring together colour, texture, accessories, and focal points without overwhelming a room.',
//       },
//       {
//         number: '03',
//         title: 'A cohesive presentation',
//         text: 'Create a consistent impression across key rooms and shared spaces.',
//       },
//     ],
//     galleryTitle: 'Presented with purpose.',
//     galleryDescription:
//       'Explore interior styling ideas that bring clarity, warmth, and balance to a space.',
//     gallery: [
//       {
//         image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Welcoming spaces',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
//         caption: 'Balanced styling',
//       },
//       {
//         image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
//         caption: 'A cohesive impression',
//       },
//     ],
//     process: [
//       {
//         title: 'Review',
//         text: 'We consider the property, its features, and the impression you want to create.',
//       },
//       {
//         title: 'Style',
//         text: 'We plan furniture placement, presentation, and details that support the space.',
//       },
//       {
//         title: 'Present',
//         text: 'The rooms are prepared to feel clear, inviting, and ready to be experienced.',
//       },
//     ],
//     ctaTitle: 'Let’s present your home at its best.',
//     heroImages: [
//       {
//         image: "/images/services/kitchen/kitchen-1.jpg",
//         caption: "Modern kitchen renovation",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-2.jpg",
//         caption: "Custom kitchen cabinetry",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-3.jpg",
//         caption: "Premium kitchen finishes",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-4.jpg",
//         caption: "Kitchen island design",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-5.jpg",
//         caption: "Contemporary kitchen interiors",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-6.jpg",
//         caption: "Kitchen renovation details",
//       },
//       {
//         image: "/images/services/kitchen/kitchen-7.jpg",
//         caption: "Completed kitchen project",
//       },
//     ],
//   },
// }
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
            image: getUrl(sections?.gallery?.image2?.imageId) || 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=85',
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
            image: getUrl(sections.banner?.image1?.imageId) || "/images/project-aa/kitchen.jpg",
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
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/project-bhc/laundry.JPG',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/project-bhc/cabinet.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/project-bhc/shower.JPG',
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
            image: getUrl(sections.banner?.image1?.imageId) || "/images/project-bhc/laundry-2.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/project-bhc/bathroom-2.JPG",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/project-bhc/shower.JPG",
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
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/project-bhc/laundry.JPG',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/project-bhc/cabinet.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/project-bhc/shower.JPG',
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
            image: getUrl(sections.banner?.image1?.imageId) || "/images/project-bhc/laundry-2.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/project-bhc/bathroom-2.JPG",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/project-bhc/shower.JPG",
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
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/project-bhc/laundry.JPG',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/project-bhc/cabinet.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/project-bhc/shower.JPG',
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
            image: getUrl(sections.banner?.image1?.imageId) || "/images/project-bhc/laundry-2.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/project-bhc/bathroom-2.JPG",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/project-bhc/shower.JPG",
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
            image: getUrl(sections?.gallery?.image1?.imageId) || '/images/project-bhc/laundry.JPG',
            caption: sections?.gallery?.heading2?.text,
          },
          {
            image: getUrl(sections?.gallery?.image2?.imageId) || '/images/project-bhc/cabinet.jpg',
            caption: sections?.gallery?.heading3?.text,
          },
          {
            image: getUrl(sections?.gallery?.image3?.imageId) || '/images/project-bhc/shower.JPG',
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
            image: getUrl(sections.banner?.image1?.imageId) || "/images/project-bhc/laundry-2.jpg",
            caption: "Modern kitchen renovation",
          },
          {
            image: getUrl(sections.banner?.image2?.imageId) || "/images/project-bhc/bathroom-2.JPG",
            caption: "Custom kitchen cabinetry",
          },
          {
            image: getUrl(sections.banner?.image3?.imageId) || "/images/project-bhc/shower.JPG",
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
    default:
      return null;
  }
}