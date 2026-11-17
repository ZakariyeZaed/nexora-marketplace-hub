import { createFileRoute } from "@tanstack/react-router";
import { DashboardSaved } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/account/properties")({
  head: () =>
    pageHead(
      "Account Saved Properties",
      "Manage sample marketplace activity in your NEXORA customer demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <DashboardSaved properties />;
}
