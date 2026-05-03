# 🏔️ Moved to Codeberg 🏔️

This repo is now maintained at:

<span style="font-size: 200%"><a href="https://codeberg.org/lgarron/ergonomic-date">https://codeberg.org/lgarron/ergonomic-date</a></span>

Original README contents are below.

<br>
<br>
<br>
<br>

--------

<br>
<br>
<br>
<br>

# `ergonomic-date`

Ergonomic date formatting wrapper.

## Example

````ts example
import { ErgonomicDate } from "ergonomic-date";

const date = new ErgonomicDate();

console.log(date.localYear); // 2025
console.log(date.localYearMonth); // 2025-07
console.log(date.localYearMonthDay); // 2025-07-24
console.log(date.localYearMonthDayTime); // 2025-07-24T19-35-35
console.log(date.unixtimeSeconds); // 1753410935
console.log(date.unixtimeMilliseconds); // 1753410935343
console.log(date.multipurposeDatestamp); // unixtime-1753410935.localdate-2025-07-24
console.log(date.multipurposeTimestamp); // unixtime-1753410935.localtime-2025-07-24T19-35-35
````

Note that the local date in the example is 2025-07-24 (the date in `America/Los_Angeles`), not 2025-07-25 (UTC).
