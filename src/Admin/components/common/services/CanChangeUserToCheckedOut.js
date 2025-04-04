export const canChangeStatusToCheckedOut =  (checkInDate) => {
    const now = new Date(); // Get current date and time
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Today at 00:00
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Tomorrow at 00:00

    const checkIn = new Date(checkInDate);
    const checkInDay = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate()); // Normalize check-in date

    // Allow "checked-out" status change if it's today or tomorrow relative to the check-in date
    return checkInDay.getTime() === today.getTime() || checkInDay.getTime() === tomorrow.getTime();
};
