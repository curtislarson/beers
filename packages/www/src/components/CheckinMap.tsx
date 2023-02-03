import { MapContainer, TileLayer } from "react-leaflet";
import { PopupEventHandler } from "../types";
import CheckinMarker from "./CheckinMarker";
import { CheckinData } from "../../../data/types";

export interface ClusteredMapProps {
  readonly center: [number, number];
  readonly zoom: number;
  readonly checkins: CheckinData[];
  readonly activeCheckinId: number | null;
  readonly onPopupOpen: PopupEventHandler;
  readonly onPopupClose: PopupEventHandler;
}

export default function ClusteredMap({
  center,
  zoom,
  checkins,
  activeCheckinId,
  onPopupOpen,
  onPopupClose,
}: ClusteredMapProps) {
  return (
    <div>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
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
