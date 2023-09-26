const MILI = 1000;

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

const rentingUnit = {
    "minute": MINUTE,
    "hour": HOUR,
    "day": DAY,
    "week": WEEK,
};

// Assume rental is coming from catalog
const makeDisplayTimeHelper = rental => {
    // When it expires
    // How long left
    // Renting duration to human readible
    // Grace period to human readible

    const {
        gracePeriodDuration: rawGracePeriod,
        rentingDurationUnit,
    } = rental;

    const rentingDurationBase = rentingUnit[rentingDurationUnit];
    const gracePeriodDuration = Number(rawGracePeriod) * MILI;

    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: 'numeric',
        minute: 'numeric'
    };
    const dateFormatter = new Intl.DateTimeFormat("en-GB", options);

    const getRentingEnd = rentingDuration => {
        const { date: rentingEnd } = getRentingEndDate(rentingDuration);
        return dateFormatter.format(rentingEnd)
    };

    const getLiquidateAt = rentingDuration => {
        const { date: liquidateAt } = getLiquidateAtDate(rentingDuration);
        return dateFormatter.format(liquidateAt);
    };

    const getRentingEndDate = rentingDuration => {
        const now = Date.now();
        const rentingDurationInMili = Number(rentingDuration) * rentingDurationBase * MILI;
        return { date: new Date(now + rentingDurationInMili), abs: rentingDurationInMili + now };
    };

    const getLiquidateAtDate = rentingDuration => {
      const { abs: rentingEnd } = getRentingEndDate(rentingDuration);
      const liquidateAtMili = rentingEnd + gracePeriodDuration;
      return { date: new Date(liquidateAtMili), abs: liquidateAtMili};
    };

    const gracePeriodToHumanReadable = () => {
        const inUnits = Number(gracePeriodDuration) / (rentingDurationBase * MILI);
        const timeIdentifier = inUnits > 0 ? `${rentingDurationUnit}s` : rentingDurationUnit;
        return `${inUnits} ${timeIdentifier}`;
    };

    const rentingDurationToHumanReadable = rentingDuration => {
        const timeIdentifier = Number(rentingDuration) > 0 ? `${rentingDurationUnit}s` : rentingDurationUnit;
        return `${rentingDuration} ${timeIdentifier}`;
    }

    const howLongLeft = absSeconds => {
        const now = Date.now();
        const target = Number(absSeconds) * MILI;
        const diff = target - now;
        const result = diff / (rentingDurationBase * MILI);
        return `${parseInt(result)} ${rentingDurationUnit}(s)`;
    };

    return harden({
        getRentingEnd,
        getLiquidateAt,
        gracePeriodToHumanReadable,
        rentingDurationToHumanReadable,
        howLongLeft,
    });
};

harden(makeDisplayTimeHelper);

export {
    makeDisplayTimeHelper
};