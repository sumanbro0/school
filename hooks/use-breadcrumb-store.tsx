import { BreadcrumbType } from "@/types/breadcrumb";
import { create } from "zustand";

type BreadcrumbStore = {
  breadcrumbs: BreadcrumbType[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbType[]) => void;
  clearBreadcrumbs: () => void;
};

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  breadcrumbs: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  clearBreadcrumbs: () => set({ breadcrumbs: [] }),
}));
