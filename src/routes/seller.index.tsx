import { createFileRoute } from "@tanstack/react-router";
import { DashboardOverview } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/")({
  head: () =>
    pageHead(
      "Seller Overview",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <DashboardOverview role="seller" />;
}
