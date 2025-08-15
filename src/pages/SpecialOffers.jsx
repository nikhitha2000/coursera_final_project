import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./Onprogress.module.css";


function SpecialOffers() {
  return (
    <div className={styles.onProgress}>
      <h1>Special Offer</h1>
      <p>On progress!!!!</p>
    </div>
  );
}

export default SpecialOffers;