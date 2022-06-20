import React from "react";
import { Link } from "react-router-dom";

// mock data

const companyMockData = [
  { text: "About us" },
  { text: "Our offerings" },
  { text: "Newsroom" },
  { text: "Investors" },
  { text: "Blog" },
  { text: "Careers" },
  { text: "AI" },
];

const productMockData = [
  { text: "Ride" },
  { text: "Drive" },
  { text: "Eat" },
  { text: "Uber for Business" },
];
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h4>Uber</h4>
        <Link to="/#" className="visit__center">
          Visit Help Center
        </Link>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h6>Company</h6>
            <ul className="list-unstyled">
              {companyMockData.map((item, index) => (
                <li key={index}>
                  <Link to="/#">{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h6>Products</h6>
            <ul className="list-unstyled">
              {productMockData.map((item, index) => (
                <li key={index}>
                  <Link to="/#">{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h6>Global citizenship</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/#">Safety</Link>
              </li>
              <li>
                <Link to="/#">Diversity and Inclusion</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h6>Travel</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/#">Airports</Link>
              </li>
              <li>
                <Link to="/#">Cities</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* footer copyright */}
        <div className="footer__copyright text-center mt-5 text-white">
          <p>&copy; {new Date().getFullYear()} Tech Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
