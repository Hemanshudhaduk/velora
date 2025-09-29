import moment from "moment";

moment.updateLocale("sv", {
  months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
  monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
  monthsParseExact: true,
  weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
  weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
  weekdaysMin: "Sö_Må_Ti_On_To_Fr_Lö".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Idag kl] LT",
    nextDay: "[Imorgon kl] LT",
    nextWeek: "dddd [kl] LT",
    lastDay: "[Igår kl] LT",
    lastWeek: "dddd [kl] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "om %s",
    past: "för %s sedan",
    s: "några sekunder",
    m: "en minut",
    mm: "%d minuter",
    h: "en timme",
    hh: "%d timmar",
    d: "en dag",
    dd: "%d dagar",
    M: "en månad",
    MM: "%d månader",
    y: "ett år",
    yy: "%d år",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(e)/,
  ordinal: function (number) {
    return number + (number === 1 ? "e" : "e");
  },
  meridiemParse: /FM|EM/,
  isPM: function (input) {
    return input.charAt(0) === "E";
  },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? "FM" : "EM";
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine the first week of the year.
  },
});

moment.updateLocale("en", {
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
  monthsParseExact: true,
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
  weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "MM/DD/YYYY",
    LL: "MMMM D YYYY",
    LLL: "MMMM D YYYY h:mm A",
    LLLL: "dddd, MMMM D YYYY h:mm A",
  },
  calendar: {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "dddd [at] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function (number) {
    const suffixes = {
      1: "st",
      2: "nd",
      3: "rd",
      21: "st",
      22: "nd",
      23: "rd",
      31: "st",
    };
    const suffix = suffixes[number] || "th";
    return number + suffix;
  },
  meridiemParse: /AM|PM/,
  isPM: function (input) {
    return input.toUpperCase() === "PM";
  },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? "AM" : "PM";
  },
  week: {
    dow: 0, // Sunday is the first day of the week.
    doy: 6, // Used to determine the first week of the year.
  },
});
