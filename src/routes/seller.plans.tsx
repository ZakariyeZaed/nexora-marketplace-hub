import { createFileRoute } from "@tanstack/react-router";
import { PlansPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/plans")({
  head: () =>
    pageHead(
      "Seller Subscription Plans",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <PlansPage />;
}
