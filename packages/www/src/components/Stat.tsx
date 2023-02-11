export interface StatProps {
  name: string;
  stat?: string | number;
}

export default function Stat({ name, stat }: StatProps) {
  return (
    <div key={name} className="rounded-md bg-base-300 px-4 py-2 text-left shadow-xl">
      <dt className="truncate text-sm font-medium text-secondary">{name}</dt>
      <dd className="text-md mt-1 max-w-xs truncate font-semibold text-white">{stat}</dd>
    </div>
  );
}
