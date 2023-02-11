export const NAVBAR_ITEMS: NavbarItem[] = [
  { href: "https://curtislarson.dev/#/projects", text: "Projects" },
  {
    href: "https://beers.curtislarson.dev",
    text: "Beers",
    active: true,
  },
];

export interface NavbarItem {
  text: string;
  href: string;
  active?: boolean;
}
