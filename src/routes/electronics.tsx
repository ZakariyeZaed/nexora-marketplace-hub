import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from "@/features/marketplace/browse";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/electronics")({
  head: () =>
    pageHead(
      "Electronics & Technology",
      "Discover electronics & technology in Addis Ababa. Browse and filter sample NEXORA listings.",
    ),
  component: Page,
});
function Page() {
  return <BrowsePage category="electronics" />;
}
