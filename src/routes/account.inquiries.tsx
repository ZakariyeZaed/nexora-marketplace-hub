import { createFileRoute } from "@tanstack/react-router";
import { InquiriesPage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/account/inquiries")({
  head: () =>
    pageHead(
      "Account My Inquiries",
      "Manage sample marketplace activity in your NEXORA customer demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <InquiriesPage role="customer" />;
}
