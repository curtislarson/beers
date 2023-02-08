import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { NAVBAR_ITEMS } from "./navbar-items";

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
