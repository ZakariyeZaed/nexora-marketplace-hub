import { createFileRoute } from "@tanstack/react-router";
import { SavedPage } from "@/features/marketplace/browse";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/wishlist")({
  head: () =>
    pageHead("Your Wishlist", "Keep your favorite NEXORA finds together in your saved listings."),
  component: Page,
});
function Page() {
  return <SavedPage />;
}
