import React from "react";
import { ToastContainer } from "react-toastify";
import Banner from "../components/LandingComponent/Banner";
import Features from "../components/LandingComponent/Features";
import Services from "../components/LandingComponent/Services";
import Layout from "../components/Layout";

const LandingPage = () => {
  return (
    <Layout>
      {/* hero  */}
      <Banner />
      <main>
        {/* Our aim  */}
        <Services />
        {/* features */}
        <Features />
      </main>
      <ToastContainer />
    </Layout>
  );
};

export default LandingPage;
