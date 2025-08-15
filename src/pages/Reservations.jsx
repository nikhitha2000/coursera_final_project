// src/pages/Reservations.js
import React, { useState, useReducer, useEffect } from 'react';
import BookingFormStep1 from '../components/BookingForm/BookingFormStep1';
import BookingFormStep2 from '../components/BookingForm/BookingFormStep2';
import BookingFormStep3 from '../components/BookingForm/BookingFormStep3';
import BookingFormStep4 from '../components/BookingForm/BookingFormStep4';
import BookingConfirmation from '../Components/BookingForm/BookingConfirmation';
import BookingProgressBar from '../components/BookingForm/BookingProgressBar';
import styles from "./Reservations.module.css";
import { initialBookingData } from '../data/initialBookingData';
import { fetchAPI, submitAPI } from '../api';

export const updateTimes = (state, action) => {
    if (action.type === 'UPDATE_TIMES') {
        return { ...state, times: action.payload };
    }
    return state;
};

function Reservations() {
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState(initialBookingData);
    const [availableTimes, dispatch] = useReducer(updateTimes, { times: [] });

    useEffect(() => {
        const todaysTimes = fetchAPI(new Date());
        dispatch({ type: 'UPDATE_TIMES', payload: todaysTimes });
    }, []);

    const updateBookingData = (newData) => {
        setBookingData(prevData => ({ ...prevData, ...newData }));

        if (newData.date) {
            // --- THIS IS THE ONLY CHANGE. IT IS A NON-VISUAL FIX. ---
            // We create a new, standard Date object to ensure the correct data type.
            const standardDate = new Date(newData.date);
            const newAvailableTimes = fetchAPI(standardDate); // Pass the safe, standard date to the API
            dispatch({ type: 'UPDATE_TIMES', payload: newAvailableTimes });
        }
    };

    const submitForm = (finalFormData) => {
        // First, update the main state with the last pieces of data from Step 4
        const completeBookingData = { ...bookingData, ...finalFormData };
        // Now, submit the complete data to the API
        const success = submitAPI(completeBookingData);

        // If the submission is successful, move to the confirmation page
        if (success) {
            // We update the state one last time so the confirmation page has all the data
            setBookingData(completeBookingData);
            goToNextStep();
        } else {
            // Handle submission failure if needed (e.g., show an error message)
            console.error("Form submission failed.");
        }
    };

    const goToNextStep = () => setCurrentStep(prev => prev + 1);
    const goToPreviousStep = () => setCurrentStep(prev => prev - 1);
    const resetForm = () => {
        setCurrentStep(1);
        setBookingData(initialBookingData);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <BookingFormStep1 bookingData={bookingData} updateBookingData={updateBookingData} goToNextStep={goToNextStep} />;
            case 2:
                return <BookingFormStep2 bookingData={bookingData} updateBookingData={updateBookingData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} availableTimes={availableTimes.times} />;
            case 3:
                 return <BookingFormStep3 bookingData={bookingData} updateBookingData={updateBookingData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
            case 4:
                return <BookingFormStep4 bookingData={bookingData} submitForm={submitForm}  goToPreviousStep={goToPreviousStep} />;
            case 5:
                return <BookingConfirmation bookingData={bookingData} resetForm={resetForm} />;
            default:
                return <p>Something went wrong!</p>;
        }
    };

    return (
        <div className={styles.reservationsContainer}>
            <BookingProgressBar currentStep={currentStep} />
            <div className={styles.formContentWrapper}>
                {renderStep()}
            </div>
        </div>
    );
}

export default Reservations;