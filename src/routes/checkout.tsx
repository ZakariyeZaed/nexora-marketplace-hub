import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/features/marketplace/commerce";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/checkout")({
  head: () =>
    pageHead("Demo Checkout", "Explore this experience on the NEXORA Ethiopian demo marketplace."),
  component: CheckoutPage,
});
