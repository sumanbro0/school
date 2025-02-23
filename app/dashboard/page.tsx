import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { DataTable } from "@/components/dashboard/data-table";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-1 container mx-auto p-4 space-y-4">
        <MetricsGrid />
        <ChartsSection />
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-lg font-semibold mb-4">Student Records</h2>
          <DataTable />
        </div>
      </main>
    </div>
  );
}
