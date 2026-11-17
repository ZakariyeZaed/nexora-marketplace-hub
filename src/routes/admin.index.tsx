import { createFileRoute } from "@tanstack/react-router";
import { DashboardOverview } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/admin/")({
  head: () =>
    pageHead(
      "Admin Overview",
      "Manage sample marketplace activity in your NEXORA admin demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <DashboardOverview role="admin" />;
}
