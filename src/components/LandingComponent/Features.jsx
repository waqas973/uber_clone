import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const featuresMockData = [
  {
    id: 1,
    icon: <AiOutlineUsergroupAdd className="icon" />,
    title: "About",
    text: "Find out how we started, what drives us, and how we’re reimagining how the world moves.",
    link: "Learn more about Uber",
  },
  {
    id: 2,
    icon: <CgNotes className="icon" />,
    title: "Newsroom",
    text: "See announcements about our latest releases, initiatives, and partnerships.",
    link: "Go to Newsroom",
  },
  {
    id: 3,

    icon: <BiHomeAlt className="icon" />,
    title: "Global citizenship",
    text: "Read about our commitment to making a positive impact in the cities we serve.",
    link: "See our partnerships",
  },
];

const Features = () => {
  return (
    <section className="features ">
      <div className="container">
        <div className="row">
          {featuresMockData.map(item => (
            <div className="col-lg-4 col-md-6 mb-lg-0 mb-5" key={item.id}>
              <div className=" shadow-lg  p-4">
                {item.icon}
                <h4>{item.title}</h4>
                <p>{item.text}</p>
                <Link to="/#">{item.link}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
