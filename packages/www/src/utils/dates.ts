import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Wed, 01 Feb 2023 07:16:08 +0000
export const CHECKIN_DATE_ORIGINAL_FORMAT = "ddd, DD MMM YYYY HH:mm:ss ZZ";

export const CHECKIN_DATE_DISPLAY_FORMAT = "MM/DD/YY h:mm A";

export const BASIC_DATE_DISPLAY_FORMAT = "MM/DD/YY";

export function relative(val: dayjs.Dayjs) {
  return val.fromNow();
}
