import { createFileRoute } from "@tanstack/react-router";
import { ListingManagement } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/admin/listings")({
  head: () =>
    pageHead(
      "Admin Listing Management",
      "Manage sample marketplace activity in your NEXORA admin demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <ListingManagement role="admin" />;
}
