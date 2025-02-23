import { getSchool } from "@/actions/get-school";
import { getPages } from "@/actions/get-slug-page";
import { NavigationContent } from "./nav-content";

export async function Navigation() {
  const school = await getSchool();
  const pages = await getPages();

  return <NavigationContent school={school} pages={pages} />;
}
