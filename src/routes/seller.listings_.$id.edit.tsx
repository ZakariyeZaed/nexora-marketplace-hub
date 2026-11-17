import { createFileRoute } from "@tanstack/react-router";
import { ListingForm } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/listings_/$id/edit")({
  head: () =>
    pageHead("Edit Demo Listing", "Explore and manage the details in the NEXORA demo workspace."),
  component: Page,
});
function Page() {
  const { id } = Route.useParams();
  return <ListingForm id={id} />;
}
