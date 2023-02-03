import { Outlet } from "react-router-dom";
import Navbar, { NavbarItem } from "./components/Navbar";

const NAVBAR_ITEMS: NavbarItem[] = [{ href: "/", text: "Home" }];

export default function Layout() {
  return (
    <div>
      <Navbar
        logo={new URL("../public/quack.png", import.meta.url).pathname}
        title="curtislarson.dev"
        href="https://curtislarson.dev"
        items={NAVBAR_ITEMS}
      />
      <Outlet />
    </div>
  );
}
