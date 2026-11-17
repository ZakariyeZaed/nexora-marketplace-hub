import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from "@/features/marketplace/browse";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/featured")({
  head: () =>
    pageHead(
      "Featured Listings",
      "Explore the NEXORA edit of standout sample properties, cars, and everyday products.",
    ),
  component: Page,
});
function Page() {
  return <BrowsePage featured />;
}
