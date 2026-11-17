import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/features/marketplace/commerce";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/login")({
  head: () =>
    pageHead(
      "Sign In",
      "Explore NEXORA with a simulated marketplace account. No real credentials are created.",
    ),
  component: Page,
});
function Page() {
  return <AuthPage mode="login" />;
}
