import { Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { CheckinData } from "../../../data/types";
import CheckinCard from "./CheckinCard";
import { memo, useEffect, useRef } from "react";
import { LatLng, Marker as LeafletMarker } from "leaflet";
import MarkerIconPath from "../imgs/marker-icon.png";

export interface CheckinMarkerProps {
  readonly checkin: CheckinData;
  readonly openPopup?: boolean;
  index: number;
}

const MarkerIcon = new Icon({
  iconUrl: MarkerIconPath,
});

function CheckinMarker({ checkin, openPopup, index }: CheckinMarkerProps) {
  const markerRef = useRef<LeafletMarker | null>(null);
  const map = useMap();

  useEffect(() => {
    if (openPopup) {
      const latLng = new LatLng(checkin.venue_lat, checkin.venue_lng);
      markerRef.current?.openPopup(latLng);
      map.flyTo(latLng, map.getZoom());
    }
  }, [openPopup, checkin, map]);

  return (
    <Marker position={[Number(checkin.venue_lat), Number(checkin.venue_lng)]} ref={markerRef} icon={MarkerIcon}>
      <Popup minWidth={350} className="bg-base-300" checkinIndex={index}>
        <CheckinCard checkin={checkin} />
      </Popup>
    </Marker>
  );
}

export default memo(CheckinMarker);
