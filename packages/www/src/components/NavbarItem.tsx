import Icon from "./Icon";

export interface NavbarItemBase {
  id: string;
  /** @default "left" */
  align?: "left" | "right";
}

export interface NavbarItemDivider extends NavbarItemBase {
  divider: true;
}

export interface NavbarItemLink extends NavbarItemBase {
  href: string;
  active?: boolean;
  divider?: false;
}

export interface NavbarItemLinkText extends NavbarItemLink {
  text: string;
}

export interface NavbarItemLinkImage extends NavbarItemLink {
  image: string;
  tooltip?: string;
}

export type NavbarItemProps = NavbarItemDivider | NavbarItemLinkText | NavbarItemLinkImage;

export default function NavbarItem(props: NavbarItemProps) {
  if (props.divider) {
    return <div className="divider divider-horizontal mx-0 hidden sm:flex"></div>;
  } else if ("image" in props) {
    return (
      <li>
        <a href={props.href}>
          <Icon src={props.image} tooltip={props.tooltip} />
        </a>
      </li>
    );
  } else {
    return (
      <li>
        <a
          href={props.href}
          className={`w-max rounded-md text-xs normal-case sm:text-sm ${
            props.active ? "btn-outline btn-primary" : "btn-ghost"
          }`}
        >
          {props.text}
        </a>
      </li>
    );
  }
}
