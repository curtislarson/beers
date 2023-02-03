import Stat, { StatProps } from "./Stat";

export interface StatsProps {
  summary?: string;
  stats: StatProps[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-5 gap-5">
        {stats.map(({ name, stat }) => (
          <Stat key={name} name={name} stat={stat} />
        ))}
      </dl>
    </div>
  );
}
