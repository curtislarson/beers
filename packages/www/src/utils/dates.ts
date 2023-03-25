import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

// Wed, 01 Feb 2023 07:16:08 +0000
export const CHECKIN_DATE_ORIGINAL_FORMAT = "ddd, DD MMM YYYY HH:mm:ss ZZ";

export const CHECKIN_DATE_DISPLAY_FORMAT = "MM/DD/YY h:mm A";

export const BASIC_DATE_DISPLAY_FORMAT = "MM/DD/YY";

export const NOW_DATE = dayjs().utc();

export function relative(val: dayjs.Dayjs) {
  return val.fromNow();
}
