import { LatLng, LatLngBounds, Map } from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import CheckinFeed from "../components/CheckinFeed";
import CheckinMapContent from "../components/CheckinMapContent";
import CheckinFacets from "../components/CheckinFacets";
import Stats from "../components/Stats";
import CheckinMapWrapper from "../containers/CheckinMapWrapper";
import { getTripData } from "../trip";
import { FeedEventHandler, PopupEventHandler } from "../types";
import { useCheckinManager } from "../utils/checkin-manager";
import { FixedSizeList } from "react-window";

const trips = getTripData();

export default function Home() {
  const mapRef = useRef<Map | null>(null);
  const listRef = useRef<FixedSizeList | null>(null);

  const { checkins, stats, setActiveTrip, setSearchFilter, suggestedLatLng, filtered, bounds } = useCheckinManager();
  const [activeCheckinId, setActiveCheckinId] = useState<number | null>(null);

  const flyTo = useCallback(
    (latlng: LatLng | LatLngBounds) => {
      if (latlng instanceof LatLng) {
        mapRef.current?.flyTo(latlng, mapRef.current.getZoom(), { animate: true });
      } else {
        mapRef.current?.flyToBounds(latlng, { animate: true });
      }
    },
    [mapRef]
  );

  useEffect(() => {
    // If we have filtered results
    if (filtered) {
      // If there is no active checkin
      if (activeCheckinId == null) {
        // fly to the suggested bounds
        flyTo(bounds);
      }
      // If the active checkin does not exist in our filtered results
      else if (!checkins.some((c) => c.checkin_id === activeCheckinId)) {
        // Remove the active checkin
        setActiveCheckinId(null);
        // fly to the suggested bounds
        flyTo(bounds);
      }
    } else if (!activeCheckinId && suggestedLatLng) {
      // not filtered and no active checkin, just revert to suggested
      flyTo(suggestedLatLng);
    }
  }, [flyTo, checkins, bounds, filtered, activeCheckinId, suggestedLatLng]);

  const onFeedItemClicked = useCallback<FeedEventHandler>(
    (checkinIndex) => {
      const activeCheckin = checkins[checkinIndex];
      if (mapRef.current) {
        flyTo(new LatLng(activeCheckin.venue_lat, activeCheckin.venue_lng));
      }
      setActiveCheckinId(activeCheckin.checkin_id);
    },
    [setActiveCheckinId, flyTo, checkins]
  );

  const onPopupOpen = useCallback<PopupEventHandler>(
    (checkinIndex) => {
      const activeCheckin = checkins[checkinIndex];
      if (listRef.current) {
        listRef.current.scrollToItem(checkinIndex, "start");
      }
      setActiveCheckinId(activeCheckin.checkin_id);
    },
    [setActiveCheckinId, checkins]
  );

  const onPopupClose = useCallback<PopupEventHandler>(() => {
    setActiveCheckinId(null);
  }, [setActiveCheckinId]);

  return (
    <main className="px-2 py-2 sm:px-12 sm:py-6">
      <div className="sm:flex sm:flex-row">
        <div className="flex flex-none flex-col sm:basis-9/12">
          <div className="mb-2 flex w-full flex-col sm:flex-row">
            <h1 className="text-lg font-semibold leading-6 text-primary sm:text-4xl">Drinkin' All Over the World</h1>
            <h3 className="text-xs text-accent sm:ml-5 sm:pt-2 sm:text-lg">Beers and travels of a nomad</h3>
          </div>
          <Stats
            stats={[
              { name: "Total Checkins", stat: stats.get("Total Checkins") },
              { name: "Unique Beers", stat: stats.getUniq("Unique Beers") },
              { name: "Unique Locations", stat: stats.getUniq("Unique Locations") },
              { name: "Unique Breweries", stat: stats.getUniq("Unique Breweries") },
              { name: "Favorite Style", stat: stats.getFave("Favorite Style") },
              { name: "Favorite Venue", stat: stats.getFave("Favorite Venue") },
            ]}
          />
        </div>
        <div className="ml-0 sm:ml-4 sm:basis-3/12">
          <CheckinFacets trips={trips} onSearchUpdated={setSearchFilter} onTripUpdated={setActiveTrip} />
        </div>
      </div>
      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="flex-none sm:basis-9/12">
          <div className="divider my-2 h-2" />
          <CheckinMapWrapper center={[checkins?.[0]?.venue_lat, checkins?.[0]?.venue_lng]} zoom={10}>
            <CheckinMapContent
              activeCheckinId={activeCheckinId}
              mapRef={mapRef}
              checkins={checkins}
              onPopupClose={onPopupClose}
              onPopupOpen={onPopupOpen}
            />
          </CheckinMapWrapper>
        </div>
        <div className="ml-2 flex-1 sm:basis-3/12">
          <div className="mt-6 overflow-y-scroll shadow-xl">
            <CheckinFeed
              checkins={checkins}
              listRef={listRef}
              activeCheckinId={activeCheckinId}
              onFeedItemClicked={onFeedItemClicked}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
