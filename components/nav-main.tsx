"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Link href={item.url} key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(
                  item.url === pathName && "bg-primary/10 text-primary",
                  "hover:text-primary hover:bg-primary/10 focus:text-primary focus:bg-primary/10"
                )}
                tooltip={item.title}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// {items.map((item) => (
//   <Collapsible
//     key={item.title}
//     asChild
//     defaultOpen={item.isActive}
//     className="group/collapsible"
//   >
//     <SidebarMenuItem>
//       <CollapsibleTrigger asChild>
//         <SidebarMenuButton tooltip={item.title}>
//           {item.icon && <item.icon />}
//           <span>{item.title}</span>
//           <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//         </SidebarMenuButton>
//       </CollapsibleTrigger>
//       <CollapsibleContent>
//         <SidebarMenuSub>
//           {item.items?.map((subItem) => (
//             <SidebarMenuSubItem key={subItem.title}>
//               <SidebarMenuSubButton asChild>
//                 <a href={subItem.url}>
//                   <span>{subItem.title}</span>
//                 </a>
//               </SidebarMenuSubButton>
//             </SidebarMenuSubItem>
//           ))}
//         </SidebarMenuSub>
//       </CollapsibleContent>
//     </SidebarMenuItem>
//   </Collapsible>
// ))}
