export function timeSince(date, type) {
  if (!date) return "";
  const now = new Date().getTime();
  const seconds = Math.floor((now - new Date(date).getTime()) / 1000);

  let interval = seconds / 31536000;
  const suffix = type === "minimal" ? "" : " ago";

  if (interval >= 1 && interval < 2) {
    return Math.floor(interval) + " year" + suffix;
  } else if (interval >= 2) {
    return Math.floor(interval) + " years" + suffix;
  }

  interval = seconds / 2592000;
  if (interval >= 1 && interval < 2) {
    return Math.floor(interval) + " month" + suffix;
  } else if (interval >= 2) {
    return Math.floor(interval) + " months" + suffix;
  }

  interval = seconds / 86400;
  if (interval >= 1 && interval < 2) {
    return Math.floor(interval) + " day" + suffix;
  } else if (interval >= 2) {
    return Math.floor(interval) + " days" + suffix;
  }

  interval = seconds / 3600;
  if (interval >= 1 && interval < 2) {
    return Math.floor(interval) + " hour" + suffix;
  } else if (interval >= 2) {
    return Math.floor(interval) + " hours" + suffix;
  }

  interval = seconds / 60;
  if (interval >= 1 && interval < 2) {
    return Math.floor(interval) + " minute" + suffix;
  } else if (interval >= 2) {
    return Math.floor(interval) + " minutes" + suffix;
  }

  return "now";
}

export function isAsyncFunction(fn) {
  return fn && fn.constructor.name === "AsyncFunction";
}

export function toCapitalCamelCase(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str; // Return the input as is if it's not a non-empty string
  }

  const words = str.split(" ");

  const capitalCamelCased = words
    .map((word) => {
      const capitalized =
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return capitalized;
    })
    .join("");

  return capitalCamelCased;
}
