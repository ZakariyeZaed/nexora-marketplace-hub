import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/features/marketplace/dashboard";
import { pageHead } from "@/features/marketplace/data";
export const Route = createFileRoute("/account/profile")({
  head: () =>
    pageHead(
      "Account My Profile",
      "Manage sample marketplace activity in your NEXORA customer demonstration dashboard.",
    ),
  component: Page,
});
function Page() {
  return <ProfilePage />;
}
