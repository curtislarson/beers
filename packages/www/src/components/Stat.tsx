export interface StatProps {
  name: string;
  stat?: string | number;
}

export default function Stat({ name, stat }: StatProps) {
  return (
    <div key={name} className="px-4 py-2 bg-base-300 shadow-xl rounded-md text-left">
      <dt className="text-sm font-medium text-secondary truncate">{name}</dt>
      <dd className="mt-1 text-md font-semibold text-white truncate">{stat}</dd>
    </div>
  );
}
