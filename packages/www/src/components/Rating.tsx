export interface RatingProps {
  className?: string;
  rating_score: string | number;
}

export default function Rating({ className, rating_score }: RatingProps) {
  const score = Number(rating_score);
  const color = score <= 2.75 ? "text-error" : score <= 3.7 ? "text-warning" : "text-success";
  return <h4 className={`${color} ${className ?? ""}`}>{rating_score} / 5</h4>;
}
