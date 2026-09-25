export type Sentiment = "Positive" | "Neutral" | "Negative";
export type Priority = "High" | "Medium" | "Low";

export type FeedbackItem = {
  id: number;
  customer: string;
  email: string;
  message: string;
  sentiment: Sentiment;
  category: string;
  priority: Priority;
  date: string;
};

export type CustomerRecord = {
  id: number;
  name: string;
  email: string;
  company: string;
  feedback: number;
  sentiment: Sentiment;
  score: number;
  lastFeedback: string;
  status: "Active" | "Inactive";
};

export type InsightItem = {
  id: number;
  title: string;
  description: string;
  confidence: number;
  category: string;
};

export type ThemeItem = {
  id: number;
  name: string;
  percentage: number;
  feedbackCount: number;
};

export type RecommendationItem = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  applied: boolean;
};

export const feedbackItems: FeedbackItem[] = [
  {
    id: 1,
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    message:
      "The new dashboard is really easy to use. I especially like the clean layout.",
    sentiment: "Positive",
    category: "Product",
    priority: "Low",
    date: "Sep 15, 2026",
  },
  {
    id: 2,
    customer: "Michael Chen",
    email: "michael@example.com",
    message:
      "The export feature is useful, but generating large reports takes too long.",
    sentiment: "Neutral",
    category: "Performance",
    priority: "Medium",
    date: "Sep 14, 2026",
  },
  {
    id: 3,
    customer: "Emily Davis",
    email: "emily@example.com",
    message:
      "I had trouble finding the billing settings. The navigation could be clearer.",
    sentiment: "Negative",
    category: "UX",
    priority: "High",
    date: "Sep 13, 2026",
  },
  {
    id: 4,
    customer: "James Wilson",
    email: "james@example.com",
    message:
      "Great experience overall. Your support team responded very quickly.",
    sentiment: "Positive",
    category: "Support",
    priority: "Low",
    date: "Sep 12, 2026",
  },
  {
    id: 5,
    customer: "Olivia Brown",
    email: "olivia@example.com",
    message:
      "The mobile experience is good, but some buttons are a little difficult to tap.",
    sentiment: "Neutral",
    category: "Mobile",
    priority: "Medium",
    date: "Sep 11, 2026",
  },
  {
    id: 6,
    customer: "Daniel Miller",
    email: "daniel@example.com",
    message:
      "The application keeps logging me out. Please look into the authentication issue.",
    sentiment: "Negative",
    category: "Account",
    priority: "High",
    date: "Sep 10, 2026",
  },
];

export const customerRecords: CustomerRecord[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    company: "Acme Inc.",
    feedback: 24,
    sentiment: "Positive",
    score: 92,
    lastFeedback: "Sep 15, 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    company: "TechFlow",
    feedback: 18,
    sentiment: "Positive",
    score: 87,
    lastFeedback: "Sep 14, 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    company: "Bright Labs",
    feedback: 15,
    sentiment: "Neutral",
    score: 71,
    lastFeedback: "Sep 13, 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@example.com",
    company: "Nova Systems",
    feedback: 11,
    sentiment: "Negative",
    score: 43,
    lastFeedback: "Sep 12, 2026",
    status: "Active",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.brown@example.com",
    company: "CloudBase",
    feedback: 9,
    sentiment: "Positive",
    score: 95,
    lastFeedback: "Sep 11, 2026",
    status: "Active",
  },
  {
    id: 6,
    name: "Daniel Miller",
    email: "daniel.miller@example.com",
    company: "Vertex Digital",
    feedback: 7,
    sentiment: "Neutral",
    score: 68,
    lastFeedback: "Sep 10, 2026",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    company: "PixelWorks",
    feedback: 21,
    sentiment: "Positive",
    score: 89,
    lastFeedback: "Sep 9, 2026",
    status: "Active",
  },
  {
    id: 8,
    name: "William Anderson",
    email: "william.anderson@example.com",
    company: "DataCore",
    feedback: 13,
    sentiment: "Negative",
    score: 48,
    lastFeedback: "Sep 8, 2026",
    status: "Inactive",
  },
];

export const insightItems: InsightItem[] = [
  {
    id: 1,
    title: "Customer satisfaction is improving",
    description:
      "Positive customer sentiment has increased over the recent feedback period, indicating stronger overall satisfaction.",
    confidence: 94,
    category: "Sentiment",
  },
  {
    id: 2,
    title: "Support response time needs attention",
    description:
      "Several customers mentioned delays in receiving support responses. Faster response times may improve customer satisfaction.",
    confidence: 89,
    category: "Support",
  },
  {
    id: 3,
    title: "Product usability is a recurring theme",
    description:
      "Customers frequently mention ease of use and interface simplicity when describing their experience with the product.",
    confidence: 86,
    category: "Product",
  },
];

export const themeItems: ThemeItem[] = [
  {
    id: 1,
    name: "Product Experience",
    percentage: 72,
    feedbackCount: 842,
  },
  {
    id: 2,
    name: "Customer Support",
    percentage: 58,
    feedbackCount: 674,
  },
  {
    id: 3,
    name: "Pricing",
    percentage: 46,
    feedbackCount: 521,
  },
  {
    id: 4,
    name: "User Interface",
    percentage: 41,
    feedbackCount: 463,
  },
  {
    id: 5,
    name: "Performance",
    percentage: 34,
    feedbackCount: 347,
  },
];

export const recommendationItems: RecommendationItem[] = [
  {
    id: 1,
    title: "Improve support response time",
    description:
      "Consider reducing the average first-response time for customer support requests.",
    priority: "High",
    applied: false,
  },
  {
    id: 2,
    title: "Review product usability feedback",
    description:
      "Analyze recurring usability complaints and identify the most common friction points.",
    priority: "Medium",
    applied: false,
  },
  {
    id: 3,
    title: "Monitor pricing sentiment",
    description:
      "Continue monitoring feedback related to pricing before making product changes.",
    priority: "Low",
    applied: false,
  },
];

export const reportTypes = [
  "Feedback",
  "Sentiment",
  "Customer",
  "Analytics",
] as const;

export type ReportItem = {
  id: number;
  name: string;
  type: string;
  dateRange: string;
  createdAt: string;
  status: "Ready" | "Processing";
  description: string;
};

export const reportItems: ReportItem[] = [
  {
    id: 1,
    name: "Monthly Feedback Report",
    type: "Feedback",
    dateRange: "September 2026",
    createdAt: "Sep 14, 2026",
    status: "Ready",
    description:
      "Overview of customer feedback collected during September 2026.",
  },
  {
    id: 2,
    name: "Sentiment Analysis Report",
    type: "Sentiment",
    dateRange: "Last 30 days",
    createdAt: "Sep 12, 2026",
    status: "Ready",
    description:
      "Detailed breakdown of positive, neutral, and negative customer sentiment.",
  },
  {
    id: 3,
    name: "Customer Engagement Report",
    type: "Customer",
    dateRange: "Last 90 days",
    createdAt: "Sep 08, 2026",
    status: "Ready",
    description:
      "Customer activity, engagement levels, and feedback participation.",
  },
  {
    id: 4,
    name: "Analytics Performance Report",
    type: "Analytics",
    dateRange: "Last 6 months",
    createdAt: "Sep 02, 2026",
    status: "Ready",
    description:
      "Performance overview covering feedback trends, themes, and sentiment.",
  },
];

export const dashboardSummary = {
  stats: [
    {
      title: "Total Feedback",
      value: "2,847",
      change: "+12.5%",
    },
    {
      title: "Customers",
      value: "1,284",
      change: "+8.2%",
    },
    {
      title: "Positive Sentiment",
      value: "78.4%",
      change: "+4.6%",
    },
    {
      title: "Response Rate",
      value: "64.8%",
      change: "+7.1%",
    },
  ],
  chartData: [
    { month: "Apr", height: 42 },
    { month: "May", height: 58 },
    { month: "Jun", height: 48 },
    { month: "Jul", height: 72 },
    { month: "Aug", height: 64 },
    { month: "Sep", height: 86 },
    { month: "Oct", height: 78 },
    { month: "Nov", height: 94 },
    { month: "Dec", height: 70 },
    { month: "Jan", height: 82 },
    { month: "Feb", height: 90 },
    { month: "Mar", height: 96 },
  ],
  sentimentBreakdown: [
    { label: "Positive", value: "78%" },
    { label: "Neutral", value: "14%" },
    { label: "Negative", value: "8%" },
  ],
};

export const analyticsRangeData = {
  "7d": {
    label: "Last 7 days",
    trend: [
      { name: "Mon", feedback: 86, positive: 68 },
      { name: "Tue", feedback: 112, positive: 88 },
      { name: "Wed", feedback: 96, positive: 74 },
      { name: "Thu", feedback: 128, positive: 101 },
      { name: "Fri", feedback: 116, positive: 91 },
      { name: "Sat", feedback: 92, positive: 72 },
      { name: "Sun", feedback: 104, positive: 82 },
    ],
    totalFeedback: "2,847",
    feedbackChange: "+12.8%",
    customers: "1,284",
    customerChange: "+8.4%",
    positiveSentiment: "78.4%",
    sentimentChange: "+5.2%",
    responseRate: "64.8%",
    responseChange: "+3.7%",
  },
  "30d": {
    label: "Last 30 days",
    trend: [
      { name: "Week 1", feedback: 522, positive: 394 },
      { name: "Week 2", feedback: 618, positive: 482 },
      { name: "Week 3", feedback: 704, positive: 556 },
      { name: "Week 4", feedback: 812, positive: 637 },
    ],
    totalFeedback: "2,847",
    feedbackChange: "+12.8%",
    customers: "1,284",
    customerChange: "+8.4%",
    positiveSentiment: "78.4%",
    sentimentChange: "+5.2%",
    responseRate: "64.8%",
    responseChange: "+3.7%",
  },
  "90d": {
    label: "Last 90 days",
    trend: [
      { name: "Jan", feedback: 820, positive: 612 },
      { name: "Feb", feedback: 940, positive: 708 },
      { name: "Mar", feedback: 1087, positive: 852 },
    ],
    totalFeedback: "2,847",
    feedbackChange: "+12.8%",
    customers: "1,284",
    customerChange: "+8.4%",
    positiveSentiment: "78.4%",
    sentimentChange: "+5.2%",
    responseRate: "64.8%",
    responseChange: "+3.7%",
  },
};
