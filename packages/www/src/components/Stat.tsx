export interface StatProps {
  name: string;
  stat?: string | number;
}

export default function Stat({ name, stat }: StatProps) {
  return (
    <div key={name} className="rounded-md bg-base-300 px-2 py-1 text-left shadow-xl sm:px-4 sm:py-2">
      <dt className="truncate text-xs font-medium text-secondary sm:text-sm">{name}</dt>
      <dd className="sm:text-md mt-1 max-w-xs truncate text-sm font-semibold text-white">{stat}</dd>
    </div>
  );
}
