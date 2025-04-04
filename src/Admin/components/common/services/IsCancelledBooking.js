export const isCancelledBooking = (checkInDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Tomorrow at midnight

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2); // The day after tomorrow at midnight

    const checkIn = new Date(checkInDate);
    checkIn.setHours(0, 0, 0, 0); // Normalize check-in date to midnight

    // Check if the check-in date is tomorrow or the day after tomorrow
    if (checkIn.getTime() === tomorrow.getTime() || checkIn.getTime() === dayAfterTomorrow.getTime()) {
        return true; // Valid if the check-in is tomorrow or the day after tomorrow
    }

    return false; // Invalid if the check-in is today or any earlier date
};
