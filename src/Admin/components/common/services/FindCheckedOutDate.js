export default function canChangeStatusToCheckedOut(checkOutDate) {
    const now = new Date(); // Get current date and time
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Today at 00:00
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Tomorrow at 00:00

    const checkOut = new Date(checkOutDate);
    const checkOutDay = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate()); // Normalize check-out date

    // Allow status change if check-out date is today or tomorrow
    return checkOutDay.getTime() === today.getTime() || checkOutDay.getTime() === tomorrow.getTime();
}