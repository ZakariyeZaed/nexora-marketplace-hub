import { createFileRoute } from "@tanstack/react-router";
import { AdminRecords } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/admin/categories")({
  head: () =>
    pageHead(
      "Admin Categories Management",
      "Manage sample marketplace activity in your NEXORA admin demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <AdminRecords kind="categories" />;
}
