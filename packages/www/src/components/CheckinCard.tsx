import { CheckinData } from "../../../data/types";
import dayjs from "dayjs";
import VenueAddress from "./VenueAddress";
import { CHECKIN_DATE_FORMAT } from "../date-format";

export interface CheckinCardProps {
  checkin: CheckinData;
}

export default function CheckinCard({ checkin }: CheckinCardProps) {
  return (
    <div className="flex flex-row">
      <div className="self-center">
        {" "}
        {!import.meta.env.VITE_DISABLE_IMAGE_LOAD && (
          <img src={checkin.beer_label} className="w-16 h-16" loading="lazy" />
        )}
      </div>
      <div className="flex-1 flex flex-col ml-2">
        <h3 className="text-md font-semibold text-secondary">{checkin.beer_name}</h3>
        <h4 className="text-sm font-normal text-accent">{checkin.brewery_name}</h4>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h5 className="mt-1 text-xs font-normal text-white">{checkin.venue_name}</h5>
            <h5 className="text-xs font-normal text-white">
              {dayjs(checkin.created_at, CHECKIN_DATE_FORMAT).format("MM/DD/YYYY h:mm A")}
            </h5>
          </div>
          <div className="flex flex-col flex-1">
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
