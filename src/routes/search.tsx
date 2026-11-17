import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BrowsePage } from "@/features/marketplace/browse";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/search")({
  validateSearch: z.object({
    q: z.string().optional().default(""),
    category: z.string().optional().default(""),
  }),
  head: () =>
    pageHead(
      "Search Marketplace",
      "Find homes, cars, everyday essentials, and local services across Addis Ababa.",
    ),
  component: Page,
});
function Page() {
  const { q, category } = Route.useSearch();
  return <BrowsePage key={`${q}-${category}`} query={q} searchCategory={category} />;
}
