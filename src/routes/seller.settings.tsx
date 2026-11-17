import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/settings")({
  head: () =>
    pageHead(
      "Seller Settings",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <SettingsPage role="seller" />;
}
