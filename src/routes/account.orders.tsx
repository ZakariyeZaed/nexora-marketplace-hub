import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/account/orders")({
  head: () =>
    pageHead(
      "Account Orders",
      "Manage sample marketplace activity in your NEXORA customer demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <OrdersPage role="customer" />;
}
