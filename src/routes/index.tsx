import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/marketplace/home";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Home — Everything You Need. All in One Place.",
      "Discover homes, vehicles, products, and local services in Addis Ababa on NEXORA, the Ethiopian marketplace.",
    ),
  component: Page,
});
function Page() {
  return <HomePage />;
}
