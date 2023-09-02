// import { Config, Span } from "./types";

import { toast } from 'sonner'
export const displayError = (e: unknown) => {
    toast.error(e instanceof Error ? e.message : JSON.stringify(e))
};

export const displaySuccess = (msg: string) => {
    toast.success(msg)
};

// export const getConfig = async () => {
//     const resourcePath = await resolveResource("config.json");
//     return JSON.parse(await readTextFile(resourcePath)) as Config;
// };

// export const inSpan = ([lb, up]: Span, hour: number, minute: number) => {
//     return (
//         (hour > lb.h || (hour == lb.h && minute >= lb.m)) &&
//         (hour < up.h || (hour == up.h && minute <= up.m))
//     );
// };

// export const getDatePart = (timestamp: Date): string =>
//     new Date(timestamp.getTime() - timestamp.getTimezoneOffset() * 60000)
//         .toISOString()
//         .split("T")[0];

// export const getTimePart = (timestamp: Date): string =>
//     new Date(timestamp.getTime() - timestamp.getTimezoneOffset() * 60000)
//         .toISOString()
//         .split("T")[1]
//         .slice(0, 5);
