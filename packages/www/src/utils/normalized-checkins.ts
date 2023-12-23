import { default as _CD } from "../../../data/checkins.json";
import { CheckinData } from "../../../data/types";

export const ALL_CHECKINS = (_CD as CheckinData[]).slice();

const AT_HOME_CHECKIN_VENUE_NAME = "Untappd at Home";

// TODO(@curtislarson): It would be better to replace this with the purchase location but im not sure if i can pull this from the api
const AT_HOME_LAT = 38.6984559;
const AT_HOME_LNG = -76.3340112;

export function getDefaultAtHomeLocation() {
  // Add a bit of variance
  const negativeLat = Math.random() > 0.5;
  const negativeLng = Math.random() > 0.5;

  return {
    lat: (negativeLat ? Math.random() * -1 : Math.random()) + AT_HOME_LAT,
    lng: (negativeLng ? Math.random() * -1 : Math.random()) + AT_HOME_LNG,
  };
}

export function getNormalizedCheckins() {
  return ALL_CHECKINS.map((c) => {
    if (
      c.venue_name === AT_HOME_CHECKIN_VENUE_NAME &&
      (!c.venue_lat || !c.venue_lng)
    ) {
      const { lat, lng } = getDefaultAtHomeLocation();
      return {
        ...c,
        venue_lat: lat,
        venue_lng: lng,
      };
    }
    return c;
  });
}
