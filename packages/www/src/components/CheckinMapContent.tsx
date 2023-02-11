import { useMapEvents } from "react-leaflet";
import { PopupEventHandler } from "../types";
import CheckinMarker from "./CheckinMarker";
import { CheckinData } from "../../../data/types";
import { useEffect } from "react";
import { Map } from "leaflet";

export interface CheckinMapContentProps {
  mapRef: React.MutableRefObject<Map | null>;
  checkins: CheckinData[];
  activeCheckinId: number | null;
  onPopupOpen: PopupEventHandler;
  onPopupClose: PopupEventHandler;
}

export default function CheckinMapContent({
  mapRef,
  activeCheckinId,
  checkins,
  onPopupOpen,
  onPopupClose,
}: CheckinMapContentProps) {
  const map = useMapEvents({
    popupopen(e) {
      if ("checkinIndex" in e.popup.options && typeof e.popup.options.checkinIndex === "number") {
        onPopupOpen(e.popup.options.checkinIndex);
      }
    },
    popupclose(e) {
      if ("checkinIndex" in e.popup.options && typeof e.popup.options.checkinIndex === "number") {
        onPopupClose(e.popup.options.checkinIndex);
      }
    },
  });
  useEffect(() => {
    mapRef.current = map;
  }, [mapRef, map]);

  return (
    <div>
      {checkins.map((b, idx) => (
        <CheckinMarker
          key={b.checkin_id}
          checkin={b}
          index={idx}
          openPopup={activeCheckinId === b.checkin_id}
          onPopupClose={onPopupClose}
          onPopupOpen={onPopupOpen}
        />
      ))}
    </div>
  );
}
