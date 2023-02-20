import { NavbarItem } from "../navbar-items";

export interface NavbarProps {
  href?: string;
  logo: string;
  title: string;
  items?: NavbarItem[];
}

export default function Navbar(props: NavbarProps) {
  return (
    <div className="navbar hidden bg-base-200 sm:flex">
      <div className="flex-none">
        <a href={props.href ?? "/"} className="btn-ghost btn-xs btn sm:btn-md">
          <img src={props.logo} className="tooltip h-8 w-8" data-tip={props.title} />
          <span className="ml-5 text-xl normal-case">{props.title}</span>
        </a>
      </div>
      <div className="flex-none">
        {props.items && (
          <ul className="menu menu-horizontal px-1">
            {props.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`btn normal-case ${item.active ? "btn-outline btn-primary" : "btn-ghost"}`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
