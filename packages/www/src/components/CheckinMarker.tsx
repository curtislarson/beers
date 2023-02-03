import { Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { CheckinData } from "../../../data/types";
import CheckinCard from "./CheckinCard";
import { PopupEventHandler } from "../types";
import { useEffect, useRef } from "react";
import { LatLng, Marker as LeafletMarker } from "leaflet";
import MarkerIconPath from "../imgs/marker-icon.png";

export interface CheckinMarkerProps {
  readonly checkin: CheckinData;
  readonly openPopup?: boolean;
  readonly onPopupOpen: PopupEventHandler;
  readonly onPopupClose: PopupEventHandler;
}

const MarkerIcon = new Icon({
  iconUrl: MarkerIconPath,
});

export default function CheckinMarker({ checkin, openPopup, onPopupClose, onPopupOpen }: CheckinMarkerProps) {
  const markerRef = useRef<LeafletMarker>(null);
  const map = useMap();

  useEffect(() => {
    if (openPopup) {
      const latLng = new LatLng(checkin.venue_lat, checkin.venue_lng);
      markerRef.current?.openPopup(latLng);
      map.setView(latLng, map.getZoom());
    }
  }, [openPopup, checkin, map]);

  return (
    <Marker
      position={[Number(checkin.venue_lat), Number(checkin.venue_lng)]}
      eventHandlers={{
        popupopen: () => onPopupOpen(checkin),
        popupclose: () => onPopupClose(checkin),
      }}
      ref={markerRef}
      icon={MarkerIcon}
    >
      <Popup minWidth={300} className="bg-base-300">
        <CheckinCard checkin={checkin} />
      </Popup>
    </Marker>
  );
}
