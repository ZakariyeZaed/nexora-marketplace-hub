import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/account/settings")({
  head: () =>
    pageHead(
      "Account Settings",
      "Manage sample marketplace activity in your NEXORA customer demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <SettingsPage role="customer" />;
}
