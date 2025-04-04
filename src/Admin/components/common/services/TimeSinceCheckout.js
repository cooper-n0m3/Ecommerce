export default function timeSinceCheckout(checkoutTime) {
  const currentTime = new Date(); // Get current date and time
  const checkoutDate = new Date(checkoutTime); // Convert checkout time string to Date object

  const diffInMilliseconds = currentTime - checkoutDate; // Time difference in milliseconds

  const seconds = Math.floor(diffInMilliseconds / 1000); // Convert to seconds
  const minutes = Math.floor(seconds / 60); // Convert to minutes
  const hours = Math.floor(minutes / 60); // Convert to hours
  const days = Math.floor(hours / 24); // Convert to days
  const weeks = Math.floor(days / 7); // Convert to weeks
  const months = Math.floor(days / 30); // Convert to months (approximate)
  const years = Math.floor(days / 365); // Convert to years

  // Check if the difference is under 1 minute
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }
  // Check if the difference is under 1 hour
  else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }
  // Check if the difference is under 1 day
  else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  // Check if the difference is under 1 week
  else if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  // Check if the difference is under 1 month
  else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  }
  // Check if the difference is under 1 year
  else if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }
  // If the difference is more than a year
  else {
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}
