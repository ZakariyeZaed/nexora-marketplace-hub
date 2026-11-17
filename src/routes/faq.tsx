import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/features/marketplace/info";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead(
      "Frequently Asked Questions",
      "Answers about NEXORA listings, shopping, stores, and the demo marketplace.",
    ),
  component: Page,
});
function Page() {
  return <HelpPage faq={true} />;
}
