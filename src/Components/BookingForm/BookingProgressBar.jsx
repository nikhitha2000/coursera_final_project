import React from 'react';
import styles from './BookingForm.module.css'; // Uses shared CSS for booking form components

export default function BookingProgressBar({ currentStep }) {
  const steps = [
    { id: 1, name: 'DATE / GUEST' },
    { id: 2, name: 'TIME' },
    { id: 3, name: 'TABLE' },
    { id: 4, name: 'INFORMATION' },
  ];

  return (
    <div className={styles.progressBar} role="navigation" aria-label="Booking Steps">
      {steps.map(step => (
        <span
          key={step.id}
          className={`${styles.step} ${currentStep === step.id ? styles.activeStep : ''}`} // Apply activeStep class
          aria-current={currentStep === step.id ? 'step' : 'false'}
        >
          {step.name}
          {/* Render separator only if it's not the last step */}
          {step.id < steps.length && <span className={styles.stepSeparator}></span>}
        </span>
      ))}
    </div>
  );
}