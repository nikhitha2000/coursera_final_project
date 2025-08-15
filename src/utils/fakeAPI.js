// This function simulates fetching table availability based on a selected time.
export const fetchTableAvailability = (time) => {
    // A real API would make a network request here.
    // We will just use some simple logic.

    const hour = parseInt(time.split(':')[0], 10);

    // Let's say outdoor seating is not available from 18:00 (6 PM) onwards.
    const isOutdoorAvailable = hour < 18;

    // Standard and Counter tables are always available in this simulation.
    const availability = {
        standard: true,
        counter: true,
        outdoor: isOutdoorAvailable,
    };

    // In a real API, this might take some time, so we can wrap it in a promise
    // to simulate that, but for now, we'll keep it simple and return it directly.
    return availability;
};