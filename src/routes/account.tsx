import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/features/marketplace/dashboard";
export const Route = createFileRoute("/account")({ component: Page });
function Page() {
  return <DashboardLayout role="customer" />;
}
