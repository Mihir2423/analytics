export type FAQItem = {
  question: string;
  answer: string;
};

export const FAQS: FAQItem[] = [
  {
    question: "What kind of analytics does this tool provide?",
    answer:
      "Our platform provides insights into website metadata, Open Graph images, and essential SEO information to help you understand how your site appears in search engines and social media.",
  },
  {
    question: "Do I need technical knowledge to use this tool?",
    answer:
      "Not at all! Our user-friendly interface makes it easy for anyone to analyze a website’s SEO performance and metadata without requiring coding or technical expertise.",
  },
  {
    question: "How do I check my website’s SEO data?",
    answer:
      "Simply enter your website URL, and our tool will fetch and display key SEO data, including title tags, meta descriptions, Open Graph images, and indexing information.",
  },
  {
    question: "Is this tool free to use?",
    answer: "Yes, our basic features are completely free.",
  },
];
