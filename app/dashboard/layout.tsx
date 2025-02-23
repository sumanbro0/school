import { AppSidebar } from "@/components/app-sidebar";
import PageHeader from "@/components/header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />
        <Suspense>
          <main className="flex flex-1 flex-col gap-4 p-4 px-8 pt-0 bg-background">
            {children}
          </main>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
