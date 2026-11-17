import { createFileRoute } from "@tanstack/react-router";
import { ListingManagement } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/listings")({
  head: () =>
    pageHead(
      "Seller My Listings",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <ListingManagement role="seller" />;
}
