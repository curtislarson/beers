import { ComponentType } from "react";
import { CheckinData } from "../../../data/types";
import CheckinFeedItem from "./CheckinFeedItem";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

export interface CheckinFeedProps {
  readonly checkins: CheckinData[];
  readonly activeCheckinId: number | null;
  readonly onFeedItemClicked: (checkin: CheckinData) => void;
}

export default function CheckinFeed({ checkins, activeCheckinId, onFeedItemClicked }: CheckinFeedProps) {
  const Row: ComponentType<ListChildComponentProps<number | null>> = ({ index, style, data }) => {
    const active = data === checkins[index].checkin_id;
    return (
      <div style={style}>
        <div className={active ? "border-primary border-2 rounded-1" : "border-base-300 border-2 rounded-1"}>
          <CheckinFeedItem checkin={checkins[index]} activeCheckinId={activeCheckinId} onClick={onFeedItemClicked} />
        </div>
      </div>
    );
  };

  return (
    <div className="flow-root">
      <ul role="list">
        <List itemCount={checkins.length} itemSize={108} height={700} width={"100%"} itemData={activeCheckinId}>
          {Row}
        </List>
      </ul>
    </div>
  );
}
