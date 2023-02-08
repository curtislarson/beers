import { MapContainer, TileLayer } from "react-leaflet";
import { PopupEventHandler } from "../types";
import CheckinMarker from "./CheckinMarker";
import { CheckinData } from "../../../data/types";
import { useEffect, useRef } from "react";
import { LatLng, Map } from "leaflet";

export interface CheckinMapProps {
  center: [number, number];
  zoom: number;
  checkins: CheckinData[];
  activeCheckinId: number | null;
  onPopupOpen: PopupEventHandler;
  onPopupClose: PopupEventHandler;
  forceView?: LatLng | null;
}

export default function CheckinMap({
  center,
  zoom,
  checkins,
  activeCheckinId,
  onPopupOpen,
  onPopupClose,
  forceView,
}: CheckinMapProps) {
  const mapRef = useRef<Map>(null);
  useEffect(() => {
    if (mapRef.current != null && forceView != null) {
      mapRef.current.setView(forceView, mapRef.current.getZoom());
    }
  }, [forceView]);

  return (
    <div>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {checkins.map((b) => (
          <CheckinMarker
            key={b.checkin_id}
            checkin={b}
            openPopup={activeCheckinId === b.checkin_id}
            onPopupClose={onPopupClose}
            onPopupOpen={onPopupOpen}
          />
        ))}
      </MapContainer>
    </div>
  );
}
