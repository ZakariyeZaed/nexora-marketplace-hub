import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/features/marketplace/info";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead("Contact NEXORA", "Explore this experience on the NEXORA Ethiopian demo marketplace."),
  component: ContactPage,
});
