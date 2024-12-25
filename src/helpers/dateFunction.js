export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Get the timezone offset in hours and minutes
  const timezoneOffset = -date.getTimezoneOffset();
  const tzHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2,"0");
  const tzMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, "0");
  const timezone = (timezoneOffset > 0 ? "+" : "-") + tzHours + ":" + tzMinutes;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timezone}`;
}
