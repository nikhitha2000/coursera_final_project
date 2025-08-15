import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Feedback from "../Components/Feedback";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Layout from "../Components/Layout";
import Menu from "../Components/Menu";
import Offer from "../Components/Offer";


function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <Offer />
      <Feedback />
    </>
  );
}

export default Home;

