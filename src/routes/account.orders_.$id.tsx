import { createFileRoute } from "@tanstack/react-router";
import { OrderDetail } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/account/orders_/$id")({
  head: () =>
    pageHead("Demo Order Details", "Explore and manage the details in the NEXORA demo workspace."),
  component: Page,
});
function Page() {
  const { id } = Route.useParams();
  return <OrderDetail id={id} />;
}
