import Stat, { StatProps } from "./Stat";

export interface StatsProps {
  stats: StatProps[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid auto-cols-max grid-flow-col gap-2 first:gap-0">
      {stats.map(({ name, stat }) => (
        <div key={name} className="tooltip" data-tip={`${name}: ${stat ?? ""}`}>
          <Stat name={name} stat={stat} />
        </div>
      ))}
    </div>
  );
}
