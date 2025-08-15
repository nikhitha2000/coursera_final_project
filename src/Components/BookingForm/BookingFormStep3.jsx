import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './BookingForm.module.css';
import { fetchTableAvailability } from '../../utils/fakeAPI'; // Import our new fake API
import { MdArrowBackIos } from "react-icons/md";

const tableTypes = [
    { id: 'standard', name: 'Standard table' },
    { id: 'counter', name: 'Counter table' },
    { id: 'outdoor', name: 'Outdoor table' },
];

export default function BookingFormStep3({ bookingData, updateBookingData, goToNextStep, goToPreviousStep }) {
    const [selectedTable, setSelectedTable] = useState(bookingData.tableType);
    const [availability, setAvailability] = useState({
        standard: true,
        counter: true,
        outdoor: true,
    });

    // This effect runs when the component loads to check table availability.
    useEffect(() => {
        if (bookingData.time) {
            const newAvailability = fetchTableAvailability(bookingData.time);
            setAvailability(newAvailability);
        }
    }, [bookingData.time]);

    const handleTableSelect = (tableType) => {
        setSelectedTable(tableType);
        updateBookingData({ tableType: tableType });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        goToNextStep(); // Move to Step 4
    };

    const formattedDate = bookingData.date ? dayjs(bookingData.date).format('D MMMM YYYY').toUpperCase() : '';
    const summaryText = `${formattedDate} FOR ${bookingData.guests} ${bookingData.guests > 1 ? 'GUESTS' : 'GUEST'} AT ${bookingData.time}`;

    return (
        <form className={styles.bookingFormStep} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <MdArrowBackIos
                    className={styles.backButton}
                    onClick={goToPreviousStep}
                />
                <h3 className={styles.pageHeading}>Table options</h3>
            </div>
            <p className={styles.stepTitle}>{summaryText}</p>

            <div className={styles.tableOptionsContainer}>
                {tableTypes.map((table) => {
                    const isAvailable = availability[table.id];
                    return (
                        <div key={table.id} className={styles.tableOption}>
                            <span>{table.name}</span>
                            <button
                                type="button"
                                disabled={!isAvailable}
                                className={`${styles.availabilityButton} ${selectedTable === table.id ? styles.selectedTable : ''}`}
                                onClick={() => handleTableSelect(table.id)}
                            >
                                {isAvailable ? 'Available' : 'Unavailable'}
                            </button>
                        </div>
                    );
                })}
            </div>
            {selectedTable && (
                <p className={styles.summaryText}>
                    Your selected: <strong>{selectedTable} table</strong>
                </p>
            )}

            <button
                type="submit"
                className={styles.checkAvailableBtn}
                disabled={!selectedTable}
            >
                Confirm your table
            </button>
        </form>
    );
}