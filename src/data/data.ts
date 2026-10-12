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

export const services: Service[] = [
  {
    slug: 'kitchen-renovations',
    number: '01',
    title: 'Kitchen Renovations',
    text: 'Thoughtful layouts, premium finishes, and kitchens made for the way you live.',
    image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'bathroom-renovations',
    number: '02',
    title: 'Bathroom Renovations',
    text: 'Calm, considered spaces with expert craftsmanship in every detail.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'basement-renovations',
    number: '03',
    title: 'Basement Renovations',
    text: 'Unlock more room with warm, functional spaces built for living.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'window-coverings',
    number: '04',
    title: 'Window Coverings',
    text: 'Beautiful light control and privacy, tailored to your interiors.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'drywall',
    number: '05',
    title: 'Drywall',
    text: 'Clean lines and a flawless finish that sets every room up beautifully.',
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'home-staging',
    number: '06',
    title: 'Home Staging',
    text: 'Present your home at its best with considered styling and detail.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
  },
];


export const projects = [
  {
    title: 'The Modern Kitchen',
    category: 'Kitchen renovation',
    description:
      'A thoughtful kitchen transformation combining clean lines, warm materials and practical design to create a space for everyday living.',
    images: [
      '/images/kitchen-1.jpg',
      '/images/kitchen-2.jpg',
      '/images/kitchen-3.jpg',
      '/images/kitchen-4.jpg',
      '/images/kitchen-5.jpg',
      '/images/kitchen-6.jpg',
      '/images/kitchen-7.jpg',
    ],
  },
  {
    title: 'A Calmer Bathroom',
    category: 'Bathroom renovation',
    description:
      'A refined bathroom refresh with considered finishes, balanced lighting and a calm, timeless atmosphere.',
    images: [
      '/images/bathroom-1.jpg',
      '/images/bathroom-2.jpg',
      '/images/bathroom-3.jpg',
      '/images/bathroom-4.jpg',
      '/images/bathroom-5.jpg',
      '/images/bathroom-6.jpg',
      '/images/bathroom-7.jpg',
    ],
  },
  {
    title: 'Room to Reimagine',
    category: 'Interior renovation',
    description:
      'A considered home transformation that makes better use of space while bringing a consistent feel to every detail.',
    images: [
      '/images/interior-1.jpg',
      '/images/interior-2.jpg',
      '/images/interior-3.jpg',
      '/images/interior-4.jpg',
      '/images/interior-5.jpg',
      '/images/interior-6.jpg',
      '/images/interior-7.jpg',
    ],
  },
]


export const navItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];