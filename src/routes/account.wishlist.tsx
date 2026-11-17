import { createFileRoute } from "@tanstack/react-router";
import { DashboardSaved } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/account/wishlist")({
  head: () =>
    pageHead(
      "Account Wishlist",
      "Manage sample marketplace activity in your NEXORA customer demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <DashboardSaved />;
}
