import CheckinMap from "../components/CheckinMap";
import CheckinFeed from "../components/CheckinFeed";
import { useCallback, useMemo, useState } from "react";
import { FeedEventHandler, PopupEventHandler } from "../types";
import Stats from "../components/Stats";
import { useCheckinState } from "../checkin-state";
import { StatMap } from "../stat-map";

export default function Home() {
  const { checkins } = useCheckinState();

  const stats = useMemo(() => {
    const statMap = new StatMap();
    checkins.forEach((c) => {
      statMap.inc("Total Checkins");
      statMap.uniq("Unique Beers", c.beer_name);
      statMap.uniq("Unique Breweries", c.brewery_name);
      if (c.venue_country) {
        statMap.uniq("Unique Countries", c.venue_country);
      }
      if (c.venue_lat && c.venue_lng) {
        statMap.uniq("Unique Locations", `${c.venue_lat},${c.venue_lng}`);
      }
      statMap.inc("Total Filtered");
    });
    return statMap;
  }, [checkins]);

  const [activeCheckinId, setActiveCheckinId] = useState<number | null>(null);

  const onFeedItemClicked = useCallback<FeedEventHandler>(
    (checkin) => {
      console.log("onFeedItemClicked", checkin);
      setActiveCheckinId(checkin.checkin_id);
    },
    [setActiveCheckinId]
  );

  const onPopupOpen = useCallback<PopupEventHandler>(
    (checkin) => {
      console.log("onPopupOpen", checkin);
      setActiveCheckinId(checkin.checkin_id);
    },
    [setActiveCheckinId]
  );

  const onPopupClose = useCallback<PopupEventHandler>(() => {
    setActiveCheckinId(null);
  }, [setActiveCheckinId]);

  return (
    <main className="relative w-full px-12">
      <div className="mx-auto py-6">
        <div className="flex flex-row pb-2 border-b-2">
          <h1 className="text-4xl text-primary font-semibold leading-6">Drinkin' All Over the World</h1>
          <h3 className="text-lg text-accent pt-2 ml-5">Beers and travels of a nomad</h3>
        </div>
        <div className="flex flex-col">
          <Stats
            stats={[
              { name: "Total Checkins", stat: stats.get("Total Checkins") },
              { name: "Unique Beers", stat: stats.getUniq("Unique Beers") },
              { name: "Unique Locations", stat: stats.getUniq("Unique Locations") },
              { name: "Unique Breweries", stat: stats.getUniq("Unique Breweries") },
              { name: "Unique Countries", stat: stats.getUniq("Unique Countries") },
            ]}
            summary="Checkin Stats"
          />
        </div>
      </div>
      <div className="flex flex-row mx-auto shadow-xl">
        <div className="basis-9/12 shadow-xl sm:overflow-hidden">
          <div className="inset-0">
            <CheckinMap
              center={[checkins[0].venue_lat, checkins[0].venue_lng]}
              zoom={10}
              checkins={checkins}
              activeCheckinId={activeCheckinId}
              onPopupClose={onPopupClose}
              onPopupOpen={onPopupOpen}
            />
          </div>
        </div>
        <div className="basis-3/12 shadow-xl overflow-y-scroll ml-2">
          <CheckinFeed checkins={checkins} activeCheckinId={activeCheckinId} onFeedItemClicked={onFeedItemClicked} />
        </div>
      </div>
    </main>
  );
}
