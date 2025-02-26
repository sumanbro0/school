import { ParentEnumValuesType } from "@/db/schemas/pages";
import { Pages } from "@/types/contents/home";

export type NavItem = {
  href: string;
  label: string;
  parentType?: ParentEnumValuesType;
  children?: {
    title: string;
    pageSlug: string;
  }[];
  action?: () => void;
};


export const getNavItems=({pages,setIsOpen}:{pages:Pages,setIsOpen:()=>void})=>{
  const items: NavItem[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "#",
      label: "About Us",
      parentType: "about",
      children: [
        {
          pageSlug: "",
          title: "Our Story",
        },
        ...(pages
          ?.filter((page) => page.parent === "about")
          .map(({ title, pageSlug }) => ({ title, pageSlug })) || []),
      ],
    },
    {
      href: "#",
      label: "Admission",
      parentType: "admission",
      action: setIsOpen,
      children: [
        {
          pageSlug: "register",
          title: "Admission Form",
        },
        ...(pages
          ?.filter((page) => page.parent === "admission")
          .map(({ title, pageSlug }) => ({ title, pageSlug })) || []),
      ],
    },
    {
      href: "/ac",
      label: "Academics",
      parentType: "academics",
      children: [
        {
          title: "Academic Excellence",
          pageSlug: "",
        },
        {
          title: "Fee Structure",
          pageSlug: "fee-structure",
        },
        ...(pages
          ?.filter((page) => page.parent === "academics")
          .map(({ title, pageSlug }) => ({ title, pageSlug })) || []),
      ],
    },
    {
      href: "#",
      label: "Members",
      parentType: "members",
      children: pages
        ?.filter((page) => page.parent === "members")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "#",
      label: "Facilities",
      parentType: "facilities",
      children: pages
        ?.filter((page) => page.parent === "facilities")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "#",
      label: "Co-Curricular",
      parentType: "co-curricular",
      children: [
        { title: "Activities", pageSlug: "activities" },
        ...(pages
          ?.filter((page) => page.parent === "co-curricular")
          .map(({ title, pageSlug }) => ({ title, pageSlug })) || []),
      ],
    },
    {
      href: "#",
      label: "Gallery",
      parentType: "gallery",
      children: [
        {
          title: "Photo",
          pageSlug: "photo",
        },
        {
          title: "Video",
          pageSlug: "video",
        },
      ],
    },
    {
      href: "/alumni",
      label: "Alumni",
      parentType: "alumni",
      children: pages
        ?.filter((page) => page.parent === "alumni")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "/carrer",
      label: "Career",
    },
    {
      href: "/news",
      label: "News",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];
  return items;
}