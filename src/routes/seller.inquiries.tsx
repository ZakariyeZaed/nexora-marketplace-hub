import { createFileRoute } from "@tanstack/react-router";
import { InquiriesPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/inquiries")({
  head: () =>
    pageHead(
      "Seller Customer Inquiries",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <InquiriesPage role="seller" />;
}
