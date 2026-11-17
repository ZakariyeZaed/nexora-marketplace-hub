import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/admin/orders")({
  head: () =>
    pageHead(
      "Admin Orders",
      "Manage sample marketplace activity in your NEXORA admin demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <OrdersPage role="admin" />;
}
