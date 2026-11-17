import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/analytics")({
  head: () =>
    pageHead(
      "Seller Sales Analytics",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <AnalyticsPage />;
}
