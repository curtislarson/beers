import { CheckinData } from "../../../data/types";
import dayjs from "dayjs";
import VenueAddress from "./VenueAddress";
import { CHECKIN_DATE_DISPLAY_FORMAT, CHECKIN_DATE_ORIGINAL_FORMAT } from "../utils/dates";
import Rating from "./Rating";
import { memo } from "react";

export interface CheckinCardProps {
  checkin: CheckinData;
}

function CheckinCard({ checkin }: CheckinCardProps) {
  return (
    <div className="flex flex-row">
      <div className="self-center">
        {" "}
        {!import.meta.env.VITE_DISABLE_IMAGE_LOAD && (
          <img src={checkin.beer_label} className="h-16 w-16" loading="lazy" />
        )}
      </div>
      <div className="ml-2 flex flex-1 flex-col">
        <div className="flex flex-row">
          <h3 className="text-md flex-none font-semibold text-secondary"> {checkin.beer_name} </h3>
          <Rating className="flex-1 text-right text-sm font-bold" rating_score={checkin.rating_score} />
        </div>
        <h4 className="text-sm font-normal text-accent">{checkin.brewery_name}</h4>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h5 className="mt-1 text-xs font-normal text-white">{checkin.venue_name}</h5>
            <h5 className="text-xs font-normal text-white">
              {dayjs(checkin.created_at, CHECKIN_DATE_ORIGINAL_FORMAT).format(CHECKIN_DATE_DISPLAY_FORMAT)}
            </h5>
          </div>
          <div className="flex flex-1 flex-col">
            <h5 className="text-xs font-normal text-white">
              <VenueAddress
                venue_city={checkin.venue_city}
                venue_state={checkin.venue_state}
                venue_country={checkin.venue_country}
              />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CheckinCard);
