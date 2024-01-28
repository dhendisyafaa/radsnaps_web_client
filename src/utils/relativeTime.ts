import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const relativeTimeSuffix = (time) => {
  return dayjs().to(dayjs(time));
};

export const relativeTimeWithoutSuffix = (time) => {
  return dayjs().to(dayjs(time), true);
};
