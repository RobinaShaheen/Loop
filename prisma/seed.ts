import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingCustomers = await prisma.customer.count();
  if (existingCustomers > 0) return;

  const customerData = [
    { name: "Sarah Johnson", email: "sarah.johnson@example.com", company: "Acme Inc.", feedbackCount: 24, sentiment: "Positive", score: 92, lastFeedback: "Sep 15, 2026", status: "Active" },
    { name: "Michael Chen", email: "michael.chen@example.com", company: "TechFlow", feedbackCount: 18, sentiment: "Positive", score: 87, lastFeedback: "Sep 14, 2026", status: "Active" },
    { name: "Emily Davis", email: "emily.davis@example.com", company: "Bright Labs", feedbackCount: 15, sentiment: "Neutral", score: 71, lastFeedback: "Sep 13, 2026", status: "Active" },
    { name: "James Wilson", email: "james.wilson@example.com", company: "Nova Systems", feedbackCount: 11, sentiment: "Negative", score: 43, lastFeedback: "Sep 12, 2026", status: "Active" },
    { name: "Olivia Brown", email: "olivia.brown@example.com", company: "CloudBase", feedbackCount: 9, sentiment: "Positive", score: 95, lastFeedback: "Sep 11, 2026", status: "Active" },
    { name: "Daniel Miller", email: "daniel.miller@example.com", company: "Vertex Digital", feedbackCount: 7, sentiment: "Neutral", score: 68, lastFeedback: "Sep 10, 2026", status: "Inactive" },
  ];

  await prisma.customer.createMany({ data: customerData });

  const createdCustomers = await prisma.customer.findMany();

  await prisma.feedback.createMany({
    data: [
      { customerId: createdCustomers[0]?.id ?? 1, customerName: "Sarah Johnson", email: "sarah@example.com", message: "The new dashboard is really easy to use. I especially like the clean layout.", sentiment: "Positive", category: "Product", priority: "Low", date: "Sep 15, 2026" },
      { customerId: createdCustomers[1]?.id ?? 2, customerName: "Michael Chen", email: "michael@example.com", message: "The export feature is useful, but generating large reports takes too long.", sentiment: "Neutral", category: "Performance", priority: "Medium", date: "Sep 14, 2026" },
      { customerId: createdCustomers[2]?.id ?? 3, customerName: "Emily Davis", email: "emily@example.com", message: "I had trouble finding the billing settings. The navigation could be clearer.", sentiment: "Negative", category: "UX", priority: "High", date: "Sep 13, 2026" },
      { customerId: createdCustomers[3]?.id ?? 4, customerName: "James Wilson", email: "james@example.com", message: "Great experience overall. Your support team responded very quickly.", sentiment: "Positive", category: "Support", priority: "Low", date: "Sep 12, 2026" },
      { customerId: createdCustomers[4]?.id ?? 5, customerName: "Olivia Brown", email: "olivia@example.com", message: "The mobile experience is good, but some buttons are a little difficult to tap.", sentiment: "Neutral", category: "Mobile", priority: "Medium", date: "Sep 11, 2026" },
      { customerId: createdCustomers[5]?.id ?? 6, customerName: "Daniel Miller", email: "daniel@example.com", message: "The application keeps logging me out. Please look into the authentication issue.", sentiment: "Negative", category: "Account", priority: "High", date: "Sep 10, 2026" },
    ],
  });

  await prisma.insight.createMany({
    data: [
      { title: "Customer satisfaction is improving", description: "Positive customer sentiment has increased over the recent feedback period, indicating stronger overall satisfaction.", confidence: 94, category: "Sentiment" },
      { title: "Support response time needs attention", description: "Several customers mentioned delays in receiving support responses. Faster response times may improve customer satisfaction.", confidence: 89, category: "Support" },
      { title: "Product usability is a recurring theme", description: "Customers frequently mention ease of use and interface simplicity when describing their experience with the product.", confidence: 86, category: "Product" },
    ],
  });

  await prisma.theme.createMany({
    data: [
      { name: "Product Experience", percentage: 72, feedbackCount: 842 },
      { name: "Customer Support", percentage: 58, feedbackCount: 674 },
      { name: "Pricing", percentage: 46, feedbackCount: 521 },
      { name: "User Interface", percentage: 41, feedbackCount: 463 },
      { name: "Performance", percentage: 34, feedbackCount: 347 },
    ],
  });

  await prisma.recommendation.createMany({
    data: [
      { title: "Improve support response time", description: "Consider reducing the average first-response time for customer support requests.", priority: "High", applied: false },
      { title: "Review product usability feedback", description: "Analyze recurring usability complaints and identify the most common friction points.", priority: "Medium", applied: false },
      { title: "Monitor pricing sentiment", description: "Continue monitoring feedback related to pricing before making product changes.", priority: "Low", applied: false },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
