import { createFileRoute } from "@tanstack/react-router";
import { AdminRecords } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/admin/sellers")({
  head: () =>
    pageHead(
      "Admin Sellers Management",
      "Manage sample marketplace activity in your NEXORA admin demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <AdminRecords kind="sellers" />;
}
