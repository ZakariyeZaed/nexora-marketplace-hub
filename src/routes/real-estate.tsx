import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BrowsePage } from "@/features/marketplace/browse";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/real-estate")({
  validateSearch: z.object({ type: z.string().optional() }),
  head: () =>
    pageHead(
      "Real Estate",
      "Discover real estate in Addis Ababa. Browse and filter sample NEXORA listings.",
    ),
  component: Page,
});
function Page() {
  const { type } = Route.useSearch();
  return <BrowsePage key={type ?? ""} category="real-estate" initialType={type} />;
}
