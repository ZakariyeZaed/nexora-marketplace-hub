import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/admin/settings")({
  head: () =>
    pageHead(
      "Admin Settings",
      "Manage sample marketplace activity in your NEXORA admin demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <SettingsPage role="admin" />;
}
