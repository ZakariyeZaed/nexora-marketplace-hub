import { createFileRoute } from "@tanstack/react-router";
import { DetailPage } from "@/features/marketplace/detail";
import { initialListings, pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/listing/$id")({
  head: ({ params }) => {
    const listing = initialListings.find((l) => l.id === params.id);
    return pageHead(
      listing?.title ?? "Listing Details",
      listing?.description ?? "Explore the details of this NEXORA demo marketplace listing.",
    );
  },
  component: Page,
});
function Page() {
  const { id } = Route.useParams();
  return <DetailPage key={id} id={id} />;
}
