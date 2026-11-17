import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/admin/reports")({
  head: () =>
    pageHead(
      "Admin Reports and Analytics",
      "Manage sample marketplace activity in your NEXORA admin demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <AnalyticsPage admin />;
}
