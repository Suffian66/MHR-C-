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
      slug: 'kitchen-renovation',
      number: '01',
      title: services?.heading3?.text,
      text: services?.paragraph2?.text,
      image: getUrl(services?.image1?.imageId) || '/images/kitchen-renovation.jpg',
    },
    {
      slug: 'basement-renovation',
      number: '02',
      title: services?.heading4?.text,
      text: services?.paragraph3?.text,
      image: getUrl(services?.image3?.imageId) || '/images/basement.jpg',
    },
    {
      slug: 'window-covering',
      number: '03',
      title: services?.heading5?.text,
      text: services?.paragraph4?.text,
      image: getUrl(services?.image4?.imageId) || '/images/blinds.jpg',
    },
    {
      slug: 'bathroom-renovation',
      number: '04',
      title: services?.heading6?.text,
      text: services?.paragraph5?.text,
      image: getUrl(services?.image2?.imageId) || '/images/bathroom-renovation.jpg',
    },
    {
      slug: 'drywall',
      number: '05',
      title: services?.heading7?.text,
      text: services?.paragraph6?.text,
      image: getUrl(services?.image5?.imageId) || '/images/drywall.jpg',
    },
    {
      slug: 'home-staging',
      number: '06',
      title: services?.heading8?.text,
      text: services?.paragraph7?.text,
      image: getUrl(services?.image6?.imageId) || '/images/home-staging.jpg',
    },
  ];
};




export const navItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blogs', href: '/blog' },
];