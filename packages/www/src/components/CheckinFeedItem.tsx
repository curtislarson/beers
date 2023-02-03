import { useEffect, useRef } from "react";
import { CheckinData } from "../../../data/types";
import CheckinCard from "./CheckinCard";

export interface CheckinFeedItemProps {
  checkin: CheckinData;
  activeCheckinId: number | null;
  onClick?: (checkin: CheckinData) => void;
}

export default function CheckinFeedItem({ checkin, onClick, activeCheckinId }: CheckinFeedItemProps) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (activeCheckinId === checkin.checkin_id && ref.current?.scrollIntoView) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeCheckinId, ref, checkin]);

  return (
    <li
      key={checkin.checkin_id}
      className={`cursor-pointer relative py-2 px-2 bg-base-300 shadow-xl rounded-md ${
        activeCheckinId === checkin.checkin_id ? "bg-primary-300 border-primary-500" : "border-primary border-1"
      }`}
      onClick={() => onClick && onClick(checkin)}
    >
      <CheckinCard checkin={checkin} />
    </li>
  );
}
