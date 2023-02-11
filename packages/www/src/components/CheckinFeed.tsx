import { ComponentType } from "react";
import { CheckinData } from "../../../data/types";
import CheckinFeedItem from "./CheckinFeedItem";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { FeedEventHandler } from "../types";

export interface CheckinFeedProps {
  readonly checkins: CheckinData[];
  listRef: React.MutableRefObject<List | null>;
  listHeight?: number;
  activeCheckinId: number | null;
  readonly onFeedItemClicked: FeedEventHandler;
}

export default function CheckinFeed({
  checkins,
  listRef,
  listHeight,
  onFeedItemClicked,
  activeCheckinId,
}: CheckinFeedProps) {
  const Row: ComponentType<ListChildComponentProps<number | null>> = ({ index, style, data }) => {
    const active = data === checkins[index].checkin_id;
    return (
      <div style={style}>
        <div
          className={active ? "rounded-1 border-2 border-primary" : "rounded-1 border-2 border-base-300"}
          onClick={() => onFeedItemClicked(index)}
        >
          <CheckinFeedItem checkin={checkins[index]} />
        </div>
      </div>
    );
  };

  console.log(listHeight);

  return (
    <div className="flow-root">
      <ul role="list">
        <List
          itemCount={checkins.length}
          itemSize={108}
          height={725}
          width={"100%"}
          itemKey={(idx) => checkins[idx].checkin_id}
          overscanCount={5}
          ref={listRef}
          itemData={activeCheckinId}
        >
          {Row}
        </List>
      </ul>
    </div>
  );
}
