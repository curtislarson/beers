import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { NavbarItemProps } from "./components/NavbarItem";
import GithubIcon from "./icons/Github.svg";

const NAVBAR_ITEMS: NavbarItemProps[] = [
  { href: "https://curtislarson.dev/projects", text: "Projects" },
  {
    href: "https://nomadlist.com/@curtis",
    text: "Travel",
  },
  {
    href: "https://beers.curtislarson.dev",
    text: "Beers",
    active: true,
  },
  {
    href: "https://github.com/curtislarson/daotw",
    image: GithubIcon,
    align: "right",
    tooltip: "View on GitHub",
  },
];

export default function Layout() {
  return (
    <div className="flex flex-col">
      <div className="flex-none">
        <Navbar
          logo={new URL("../public/quack.png", import.meta.url).pathname}
          title="curtislarson.dev"
          href="https://curtislarson.dev"
          items={NAVBAR_ITEMS}
        />
      </div>
      <div className="min-h-0 w-screen grow">
        <Outlet />
      </div>
    </div>
  );
}
