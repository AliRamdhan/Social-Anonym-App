import { formatDistanceToNow, parseISO } from "date-fns";
const formatTime = (timestamp) => {
  return timestamp
    ? formatDistanceToNow(parseISO(timestamp), { addSuffix: true })
    : "";
};

export default { formatTime };
