import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import dayjs from 'dayjs';
import styles from './BookingForm.module.css';

export default function BookingConfirmation({ bookingData, resetForm }) {
    // useNavigate is the modern way to programmatically navigate in React Router
    const navigate = useNavigate();

    const handleDoneClick = () => {
        resetForm(); // Reset the parent's state
        navigate('/'); // Navigate to the homepage
    };

    // Format the data for display
    const formattedDate = bookingData.date
        ? dayjs(bookingData.date).format('D MMMM YYYY').toUpperCase()
        : '';
    const summaryText = `We've reserved a table for ${bookingData.guests} ${bookingData.guests > 1 ? 'guests' : 'guest'} on ${formattedDate} at ${bookingData.time} at our ${bookingData.tableType} table.`;
    console.log(bookingData);
    return (
        <div className={styles.confirmationStep}>
            <h2 className={styles.pageHeading}>Your reservation has been complete</h2>
            <p className={styles.confirmationText}>Thank you for booking with Little Lemon.</p>
            <p className={styles.confirmationText}>{summaryText}</p>
            <p className={styles.confirmationText}>
                You'll receive a confirmation email shortly with all the details.
                If you have any questions or need to make changes, feel free to contact us.
            </p>
            <p className={styles.confirmationText}>We look forward to welcoming you!</p>

            <button
                type="button"
                className={styles.checkAvailableBtn}
                onClick={handleDoneClick}
            >
                DONE
            </button>
        </div>
    );
}