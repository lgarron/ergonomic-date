import { ErgonomicDate } from "../src";

const date = new ErgonomicDate();

console.log(date.localYearMonth); // 2025-07
console.log(date.localYearMonthDay); // 2025-07-24
console.log(date.localYearMonthDayTime); // 2025-07-24T19-35-35
console.log(date.unixtimeSeconds); // 1753410935
console.log(date.unixtimeMilliseconds); // 1753410935343
console.log(date.multipurposeDatestamp); // unixtime-1753410935.localdate-2025-07-24
console.log(date.multipurposeTimestamp); // unixtime-1753410935.localtime-2025-07-24T19-35-35
