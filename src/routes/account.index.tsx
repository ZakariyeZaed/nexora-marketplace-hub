import { createFileRoute } from "@tanstack/react-router";
import { DashboardOverview } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/account/")({
  head: () =>
    pageHead(
      "Account Overview",
      "Manage sample marketplace activity in your NEXORA customer demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <DashboardOverview role="customer" />;
}
