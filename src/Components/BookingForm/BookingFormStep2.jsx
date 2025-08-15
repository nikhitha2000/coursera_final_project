// src/components/BookingForm/BookingFormStep2.js
import React, { useState } from 'react';
import dayjs from 'dayjs';
import styles from './BookingForm.module.css'; // We'll re-use the same stylesheet
import { MdArrowBackIos } from "react-icons/md";


export default function BookingFormStep2({ bookingData, updateBookingData, goToNextStep, goToPreviousStep, availableTimes }) {
    // We use local state to track the currently selected time.
    const [selectedTime, setSelectedTime] = useState(bookingData.time);

    // This function runs when a user clicks a time slot.
    const handleTimeSelect = (time) => {
        setSelectedTime(time); // Update our local state for instant UI feedback
        updateBookingData({ time: time }); // Immediately update the parent's state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        goToNextStep(); // Move to Step 3
    };

    // Format the date and guest info from the parent for display
    const formattedDate = bookingData.date
        ? dayjs(bookingData.date).format('D MMMM YYYY').toUpperCase()
        : '';
    const guestText = `${bookingData.guests} ${bookingData.guests > 1 ? 'GUESTS' : 'GUEST'}`;

    return (
        <form className={styles.bookingFormStep} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <MdArrowBackIos
                className={styles.backButton}
                onClick={goToPreviousStep}
                />
                <h3 className={styles.pageHeading}>Select time</h3>
            </div>
            <p className={styles.stepTitle}>{`${formattedDate} FOR ${guestText}`}</p>

            {/* A grid to display all the time slots */}
            <div className={styles.timeGrid} role="group" aria-label="Available Times">
                {/* Map over the `availableTimes` array passed down from the parent */}
                {availableTimes && availableTimes.length > 0 ? (
                    availableTimes.map((time) => (
                        <button
                            key={time}
                            type="button"
                            className={`${styles.timeSlotButton} ${selectedTime === time ? styles.selectedTimeSlot : ''}`}
                            onClick={() => handleTimeSelect(time)}
                            aria-pressed={bookingData.time === time}
                        >
                            {time}
                        </button>
                    ))
                ) : (
                    <p>No available times for the selected date.</p>
                )}
            </div>

            {/* This text appears only after a time has been selected */}
            {selectedTime && (
                <p className={styles.summaryText}>
                    Your selected time: <strong>{selectedTime}</strong>
                </p>
            )}

            <button
                type="submit"
                className={styles.checkAvailableBtn}
                // The button is disabled until a time is chosen
                disabled={!selectedTime}
            >
                Reserve your time
            </button>
        </form>
    );
}