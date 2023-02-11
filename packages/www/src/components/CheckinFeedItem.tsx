import { CheckinData } from "../../../data/types";
import CheckinCard from "./CheckinCard";

export interface CheckinFeedItemProps {
  checkin: CheckinData;
  onClick?: (checkin: CheckinData) => void;
}

export default function CheckinFeedItem({ checkin, onClick }: CheckinFeedItemProps) {
  return (
    <li
      key={checkin.checkin_id}
      className="relative cursor-pointer rounded-md bg-base-300 py-2 px-2 shadow-xl"
      onClick={() => onClick && onClick(checkin)}
    >
      <CheckinCard checkin={checkin} />
    </li>
  );
}
