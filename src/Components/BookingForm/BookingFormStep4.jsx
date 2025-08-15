import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './BookingForm.module.css';
import { MdArrowBackIos } from "react-icons/md";


export default function BookingFormStep4({ bookingData, submitForm, goToPreviousStep }) {
    // A single state object to hold all the form data for this step
    const [formData, setFormData] = useState({
        firstName: bookingData.firstName || '',
        lastName: bookingData.lastName || '',
        email: bookingData.email || '',
        tel: bookingData.tel || '',
        note: bookingData.note || '',
        promotional: bookingData.promotional || false,
        termsAccepted: bookingData.termsAccepted || false,
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // This effect will re-validate the form whenever the data changes
    useEffect(() => {
        const validate = () => {
            const newErrors = {};
            if (!formData.firstName) newErrors.firstName = 'First name is required.';
            if (!formData.lastName) newErrors.lastName = 'Last name is required.';
            if (!formData.email) {
                newErrors.email = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email address is invalid.';
            }
            if (!formData.tel) newErrors.tel = 'Telephone is required.';
            if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms.';

            setErrors(newErrors);
            setIsFormValid(Object.keys(newErrors).length === 0);
        };
        validate();
    }, [formData]);

    // A single handler to update the form data state for any input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            // It calls the submitForm function from the parent, passing its own local data.
            submitForm(formData);
        }
    };

    const summaryText = `${dayjs(bookingData.date).format('D MMMM YYYY').toUpperCase()} FOR ${bookingData.guests} ${bookingData.guests > 1 ? 'GUESTS' : 'GUEST'} AT ${bookingData.time} - ${bookingData.tableType} TABLE`;

    return (
        <form className={styles.bookingFormStep} onSubmit={handleSubmit} noValidate>
            <div className={styles.header}>
                            <MdArrowBackIos
                                className={styles.backButton}
                                onClick={goToPreviousStep}
                            />
                            <h3 className={styles.pageHeading}>Your information</h3>
                        </div>
            <p className={styles.stepTitle}>{summaryText}</p>

            <div className={styles.formField}>
                <label htmlFor="firstName">FIRST NAME</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Sarah"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.firstName}
                    aria-describedby="firstNameError"
                />
                {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="lastName">LAST NAME</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Thompson"
                    required
                />
                {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="email">EMAIL</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@example.com"
                    required
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="tel">TEL.</label>
                <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleChange}
                    placeholder="e.g. 501234567"
                    required
                />
                {errors.tel && <span className={styles.errorText}>{errors.tel}</span>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="note">NOTE</label>
                <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Allergies, celebrations, or special requests (optional)"
                />
            </div>

            <div className={styles.checkboxField}>
                <input
                    type="checkbox"
                    id="promotional"
                    name="promotional"
                    checked={formData.promotional}
                    onChange={handleChange}
                />
                <label htmlFor="promotional">I agree to receive promotional offers and updates from Little Lemon.</label>
            </div>

            <div className={styles.checkboxField}>
                <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="termsAccepted">I accept the reservation terms and privacy policy.</label>
                {errors.termsAccepted && <span className={styles.errorText}>{errors.termsAccepted}</span>}
            </div>

            <button
                type="submit"
                className={styles.checkAvailableBtn}
                disabled={!isFormValid}
            >
                Confirm reservation
            </button>
        </form>
    );
}