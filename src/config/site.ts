export const siteConfig = {
  name: "Velora",
  description:
    "A premium AI-powered marketplace with curated collections, intelligent recommendations, and seamless checkout.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  links: {
    github: "https://github.com/mahmud71113",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
};

export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
