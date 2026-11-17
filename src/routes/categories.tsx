import { createFileRoute } from "@tanstack/react-router";
import { CategoriesPage } from "@/features/marketplace/browse";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/categories")({
  head: () =>
    pageHead(
      "All Categories",
      "Explore seven Ethiopian marketplaces, from real estate and vehicles to fashion and local services.",
    ),
  component: Page,
});
function Page() {
  return <CategoriesPage />;
}
