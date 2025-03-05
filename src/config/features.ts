export interface FeaturesItem {
  title: string;
  description: string;
  icon: string;
}

export const Features: FeaturesItem[] = [
  {
    title: "Traffic Overview",
    description: "Get a clear breakdown of your website visitors.",
    icon: "/icons/perk-one.svg",
  },
  {
    title: "In-Depth Analytics",
    description: "Gain actionable insights with detailed reports.",
    icon: "/icons/perk-two.svg",
  },
  {
    title: "SEO Insights",
    description: "View essential metadata, OG images, and indexing info.",
    icon: "/icons/perk-three.svg",
  },
  {
    title: "User Engagement",
    description: "Track visitor interactions and conversion rates.",
    icon: "/icons/perk-four.svg",
  },
];
