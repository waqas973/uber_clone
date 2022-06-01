import React from "react";
import { Link } from "react-router-dom";
import safetyImg from "../../images/services/pexels-oleksandr-pidvalnyi-376729.jpg";
import citiesImg from "../../images/services/pexels-pixabay-210182.jpg";

const mockData = [
  {
    id: 1,
    image: safetyImg,
    title: "Our commitment to your safety",
    text: "With every safety feature and every standard in our Community Guidelines, we’re committed to helping to create a safe environment for our users.",
    link: "Read about our Community Guidelines",
  },
  {
    id: 2,
    image: citiesImg,
    title: "Setting 10,000+ cities in motion",
    text: "The app is available in thousands of cities worldwide, so you can request a ride even when you’re far from home.",
    link: "View all cities",
  },
];

const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <h3>Focused on safety, wherever you go</h3>
        <div className="row">
          {mockData.map(item => (
            <div className="col-lg-6 mb-5 mb-lg-0" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="img-fluid img__fixed"
              />
              <h4>{item.title}</h4>
              <p>{item.text}</p>
              <Link to="/#">{item.link}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
