import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./Onprogress.module.css";


function Reviews() {
  return (
    <div className={styles.onProgress}>
      <h1>Reviews</h1>
      <p>On progress!!!!</p>
    </div>
  );
}

export default Reviews;