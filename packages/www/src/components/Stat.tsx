export interface StatProps {
  name: string;
  stat?: string | number;
}

export default function Stat({ name, stat }: StatProps) {
  return (
    <div key={name} className="px-4 py-2 bg-base-300 shadow-xl rounded-md">
      <dt className="text-md font-medium text-secondary truncate">{name}</dt>
      <dd className="mt-1 text-xl font-semibold text-white">{stat}</dd>
    </div>
  );
}
