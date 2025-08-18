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

test("ErgonomicDate.earliest(…)", () => {
  const a = new ErgonomicDate(1753410100000);
  const b = new ErgonomicDate(1753410101000);
  const c = new ErgonomicDate(1753410102000);

  expect(ErgonomicDate.earliest([c, b, a])?.unixtimeMilliseconds).toEqual(
    a.unixtimeMilliseconds,
  );
});

test("ErgonomicDate.latest(…)", () => {
  const a = new ErgonomicDate(1753410100000);
  const b = new ErgonomicDate(1753410101000);
  const c = new ErgonomicDate(1753410102000);

  expect(ErgonomicDate.latest([c, b, a])?.unixtimeMilliseconds).toEqual(
    c.unixtimeMilliseconds,
  );
});
