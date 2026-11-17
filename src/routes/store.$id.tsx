import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from "@/features/marketplace/browse";
import { sellers, pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/store/$id")({
  head: ({ params }) =>
    pageHead(
      sellers.find((s) => s.id === params.id)?.name ?? "Seller Store",
      "Explore local sample stores and their collections on NEXORA.",
    ),
  component: Page,
});
function Page() {
  const { id } = Route.useParams();
  return <BrowsePage key={id} sellerId={id} />;
}
