export type ContentTable = {
  caption?: string;
  columns: string[];
  rows: string[][];
};

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: string[];
  table?: ContentTable;
};

export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  updated: string;
};
