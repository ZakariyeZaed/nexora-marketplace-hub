import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/features/marketplace/commerce";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/cart")({
  head: () =>
    pageHead(
      "Your Shopping Bag",
      "Explore this experience on the NEXORA Ethiopian demo marketplace.",
    ),
  component: CartPage,
});
