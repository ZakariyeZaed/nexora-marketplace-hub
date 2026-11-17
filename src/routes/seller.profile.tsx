import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/seller/profile")({
  head: () =>
    pageHead(
      "Seller Store Profile",
      "Manage sample marketplace activity in your NEXORA seller demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <ProfilePage storeProfile />;
}
