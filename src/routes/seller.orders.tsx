import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/orders")({
  head: () =>
    pageHead(
      "Seller Orders",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <OrdersPage role="seller" />;
}
