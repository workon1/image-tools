export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  updated: string;
};
