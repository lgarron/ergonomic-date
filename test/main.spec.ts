import { expect, test } from "bun:test";
import { ErgonomicDate } from "ergonomic-date";

process.env.TZ = "America/Los_Angeles";

test(".lock()", async () => {
  const date = new ErgonomicDate(1753410935343);

  expect(date.localYearMonth).toEqual("2025-07");
  expect(date.localYearMonthDay).toEqual("2025-07-24");
  expect(date.localYearMonthDayTime).toEqual("2025-07-24T19-35-35");
  expect(date.unixtimeSeconds).toEqual(1753410935);
  expect(date.unixtimeMilliseconds).toEqual(1753410935343);
  expect(date.multipurposeDatestamp).toEqual(
    "unixtime-1753410935.localdate-2025-07-24",
  );
  expect(date.multipurposeTimestamp).toEqual(
    "unixtime-1753410935.localtime-2025-07-24T19-35-35",
  );
});
