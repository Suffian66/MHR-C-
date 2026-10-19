export interface Service {
  slug: string;
  number: string;
  title: string;
  text: string;
  image: string;
}

export interface Project {
  title: string;
  category: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export function getServiceData(services: any, getUrl: (imageId?: string) => string | null
): Service[] {
  return [
    {
      slug: 'kitchen-renovations',
      number: '01',
      title: services?.heading3?.text,
      text: services?.paragraph2?.text,
      image: getUrl(services?.image1?.imageId) || 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=85',
    },
    {
      slug: 'bathroom-renovations',
      number: '02',
      title: services?.heading4?.text,
      text: services?.paragraph3?.text,
      image: getUrl(services?.image2?.imageId) || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    },
    {
      slug: 'basement-renovations',
      number: '03',
      title: services?.heading5?.text,
      text: services?.paragraph4?.text,
      image: getUrl(services?.image3?.imageId) || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    },
    {
      slug: 'window-coverings',
      number: '04',
      title: services?.heading6?.text,
      text: services?.paragraph5?.text,
      image: getUrl(services?.image4?.imageId) || 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=85',
    },
    {
      slug: 'drywall',
      number: '05',
      title: services?.heading7?.text,
      text: services?.paragraph6?.text,
      image: getUrl(services?.image5?.imageId) || 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&w=1200&q=85',
    },
    {
      slug: 'home-staging',
      number: '06',
      title: services?.heading8?.text,
      text: services?.paragraph7?.text,
      image: getUrl(services?.image6?.imageId) || 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    },
  ];
};

export const projects = [
  {
    title: 'Blue Holly Crescent',
    category: 'Complete Renovation of Bathroom & Laundry',
    description:
      'A thoughtful bathroom and laundry renovation combining clean lines, modern finishes and practical storage to create functional, stylish spaces for everyday living.',
    images: [
      '/images/project-bhc/bathroom.JPG',
      '/images/project-bhc/bathroom-4.JPG',
      '/images/project-bhc/bathroom-2.JPG',
      '/images/project-bhc/shower.JPG',
      '/images/project-bhc/cabinet.jpg',
      '/images/project-bhc/laundry.JPG',
      '/images/project-bhc/laundry-2.jpg',
    ],
  },
  {
    title: 'Absolute Avenue',
    category: 'Complete Home Renovation',
    description:
      'A complete home renovation combining thoughtful design, quality finishes and modern functionality to create a cohesive, comfortable and timeless living space.',
    images: [
      '/images/project-aa/kitchen.jpg',
      '/images/project-aa/hall.jpg',
      '/images/project-aa/hall-2.jpg',
      '/images/project-aa/bedroom.png',
      '/images/project-aa/bathroom.jpg',
      '/images/project-aa/bathroom-2.jpg',
      '/images/project-aa/bathroom-3.jpg',
    ],
  },
  {
    title: 'Redstone Crescent',
    category: 'Complete Renovation',
    description:
      'A thoughtful renovation combining clean lines, modern finishes and practical storage to create functional, stylish spaces for everyday living.',
    images: [
      '/images/project-rsc/kitchen4.JPEG',
      '/images/project-rsc/kitchen3.jpeg',
      '/images/project-rsc/bathroom.jpeg',
      '/images/project-rsc/bathroom2.jpeg',
      '/images/project-rsc/bathroom6.jpeg',
      '/images/project-rsc/sitting-area.jpeg',
      '/images/project-rsc/staircase.jpeg',
    ],
  },

]


export const navItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];