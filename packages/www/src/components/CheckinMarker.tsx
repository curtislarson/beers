import { Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { CheckinData } from "../../../data/types";
import CheckinCard from "./CheckinCard";
import { memo, useEffect, useRef } from "react";
import { LatLng, Marker as LeafletMarker } from "leaflet";
import MarkerIconPath from "../imgs/marker-icon.png";
import { isSmallScreen } from "../utils/display";

export interface CheckinMarkerProps {
  readonly checkin: CheckinData;
  readonly openPopup?: boolean;
  index: number;
}

const MarkerIcon = new Icon({
  iconUrl: MarkerIconPath,
  iconSize: [25, 41],
  iconAnchor: [13, 41],
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
      {/**
       * eslint-disable-next-line @typescript-eslint/ban-ts-comment
       * @ts-ignore*/}
      <Popup minWidth={isSmallScreen() ? 300 : 400} checkinIndex={index}>
        <CheckinCard checkin={checkin} />
      </Popup>
    </Marker>
  );
}

export default memo(CheckinMarker);
