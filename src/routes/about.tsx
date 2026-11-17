import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/features/marketplace/info";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead("About NEXORA", "Discover the vision for NEXORA, your Ethiopian marketplace."),
  component: Page,
});
function Page() {
  return <InfoPage kind="about" />;
}
