export const siteConfig = {
  name: "NexaCart AI",
  description:
    "An AI-powered e-commerce marketplace with smart recommendations, secure checkout, and premium shopping experiences.",
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