export type Meta = {
  createdAt: string;
  updatedAt: string;
  faviconUrl: string | null;
  logo: string | null;
  siteDescription: string;
  siteName: string;
  _id: string;
  footer: FooterType;
};

export type FooterType = {
  aboutText: string;
  copyrightText: string;
  email: string;
  location: string;
  logo: string;
  phone: string;
  _id: string;
};
