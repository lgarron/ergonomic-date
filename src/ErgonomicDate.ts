const MILLISECONDS_PER_SECOND = 1000;

function padTwoDigits(v: number | string): string {
  return v.toString().padStart(2, "0");
}

export class ErgonomicDate {
  #date: Date;
  /** Takes the same argument as the `new Date(…)` constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date */
  constructor(
    ...args:
      | []
      | [number /* Unix time (milliseconds */]
      | [string /* Date string */]
      | [Date /* Date object */]
      | [
          number /* year */,
          number /* monthIndex */,
          number /* day */,
          number /* hours */,
          number /* minutes */,
          number /* seconds */,
          number /* milliseconds */,
        ]
  ) {
    // @ts-ignore
    // biome-ignore lint/suspicious/noExplicitAny: Needed to shim the wrapped `Date` constructor.
    this.#date = new Date(...(args as any));
  }

  #dayStringComponents(): { year: string; month: string; day: string } {
    return {
      year: this.#date.getFullYear().toString(),
      month: padTwoDigits((this.#date.getMonth() + 1).toString()),
      day: padTwoDigits(this.#date.getDate().toString()),
    };
  }

  #timeStringComponents(): { hours: string; minutes: string; seconds: string } {
    return {
      hours: padTwoDigits(this.#date.getHours()),
      minutes: padTwoDigits(this.#date.getMinutes()),
      seconds: padTwoDigits(this.#date.getSeconds()),
    };
  }

  /** Get a copy of the underlying `Date` object. */
  get jsDate(): Date {
    return new Date(this.#date);
  }

  /** Example: `2025-07` (July) */
  get localYearMonth(): string {
    const dayStringComponents = this.#dayStringComponents();
    return [dayStringComponents.year, dayStringComponents.month].join("-");
  }

  /** Example: `2025-07-24` (July 24) */
  get localYearMonthDay(): string {
    const dayStringComponents = this.#dayStringComponents();
    return [
      dayStringComponents.year,
      dayStringComponents.month,
      dayStringComponents.day,
    ].join("-");
  }

  /** Example: `2025-07-24` (July 24) */
  get localYearMonthDayTime(): string {
    const timeStringComponents = this.#timeStringComponents();
    const timeString = [
      timeStringComponents.hours,
      timeStringComponents.minutes,
      timeStringComponents.seconds,
    ].join("-");
    return `${this.localYearMonthDay}T${timeString}`;
  }

  /** Example: `1753410109` */
  get unixtimeMilliseconds(): number {
    return this.#date.getTime();
  }

  /** Example: `1753410109792` */
  get unixtimeSeconds(): number {
    return Math.floor(this.#date.getTime() / MILLISECONDS_PER_SECOND);
  }

  /**
   * Example: `unixtime-1753410109.localdate-2025-07-24`
   *
   * This particularly for naming files in a way that is:
   *
   * - Useful for humans: contains the date.
   * - Parsable by machines: contains the exact unix time.
   * - Produces sorted times even timestamps are generated in different timezones.
   * - Usable in portable file names.
   *
   */
  get multipurposeDatestamp(): string {
    return `unixtime-${this.unixtimeSeconds}.localdate-${this.localYearMonthDay}`;
  }

  /**
   * Example: `unixtime-1753410109.localdate-2025-07-24T`
   *
   * This particularly for naming files in a way that is:
   *
   * - Useful for humans: contains the date.
   * - Parsable by machines: contains the exact unix time.
   * - Produces sorted times even timestamps are generated in different timezones.
   * - Usable in portable file names.
   *
   */
  get multipurposeTimestamp(): string {
    return `unixtime-${this.unixtimeSeconds}.localtime-${this.localYearMonthDayTime}`;
  }
}
