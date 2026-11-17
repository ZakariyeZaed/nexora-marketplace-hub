import { createFileRoute } from "@tanstack/react-router";
import { ListingForm } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/add")({
  head: () =>
    pageHead(
      "Seller Add New Listing",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <ListingForm />;
}
