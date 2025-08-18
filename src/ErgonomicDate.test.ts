import { expect, test } from "bun:test";
import { ErgonomicDate } from "./ErgonomicDate";

test("ErgonomicDate.parseMultipurposeDateOrTimestamp(…)", () => {
  expect(
    ErgonomicDate.parseMultipurposeDateOrTimestamp(
      "unixtime-1753410935.localdate-2025-07-24",
    ).unixtimeMilliseconds,
  ).toEqual(1753410935000);
  expect(
    ErgonomicDate.parseMultipurposeDateOrTimestamp(
      "unixtime-1753410935.localtime-2025-07-24T19-35-35",
    ).unixtimeMilliseconds,
  ).toEqual(1753410935000);
  expect(
    ErgonomicDate.parseMultipurposeDateOrTimestamp(
      "unixtime-1753410935.localtime-2025-07-24T19-35-35",
    ).unixtimeMilliseconds,
  ).toEqual(1753410935000);
  expect(
    () =>
      ErgonomicDate.parseMultipurposeDateOrTimestamp("unixtime-1753410935")
        .unixtimeMilliseconds,
  ).toThrow("Invalid format.");
});
