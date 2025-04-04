export const IsAllowed = ({
  checkInDate,
  checkOutDate,
  currentStatus,
  newStatus,
}) => {
  switch (newStatus) {
    case "Checked-in": {
      if (currentStatus == "Confirmed") {
        return true;
      } else {
        return false;
      }
    } /* Done */
    case "Checked-out": {
      if (currentStatus == "Checked-in") {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

        const checkIn = new Date(checkInDate);
        checkIn.setHours(0, 0, 0, 0); // Normalize check-in date to midnight

        // Check if the check-in date is today or in the future (not in the past)
        return checkIn.getTime() >= today.getTime();
      } else {
        return false;
      }
      break;
    } /*Done*/
    case "Canceled": {
      if (currentStatus === "Confirmed") {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Tomorrow at midnight

        const checkIn = new Date(checkInDate);
        checkIn.setHours(0, 0, 0, 0); // Normalize check-in date to midnight

        // Check if the check-in date is tomorrow or any future date
        if (checkIn.getTime() > today.getTime()) {
          return true; // Valid if the check-in is tomorrow or in the future
        }

        return false; // Invalid if the check-in is today or in the past
      } else {
        return false;
      }
    } /* Done */
    case "No-show": {
      if (currentStatus === "Checked-out") {
        return true; // Invalid if the check-in is today or in the past
      } else {
        return false;
      }
    } /* Done */
  }
};
