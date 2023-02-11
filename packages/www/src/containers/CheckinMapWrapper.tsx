import { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export interface CheckinMapWrapperProps {
  readonly center: [number, number];
  readonly zoom: number;
  /** Children that will have access to `useMap` */
  children: ReactNode;
}

export default function CheckinMapWrapper({ center, zoom, children }: CheckinMapWrapperProps) {
  return (
    <div className="basis-9/12 shadow-xl sm:overflow-hidden">
      <div className="inset-0">
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {children}
        </MapContainer>
      </div>
    </div>
  );
}
