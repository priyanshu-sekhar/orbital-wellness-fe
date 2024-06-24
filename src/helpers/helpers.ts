import {format, parseISO} from "date-fns";

export const formatTimestamp = (timestamp: string): string => {
    return format(parseISO(timestamp), 'yyyy-MM-dd HH:mm');
};