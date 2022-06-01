import React from "react";
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
    </Layout>
  );
};

export default LandingPage;
