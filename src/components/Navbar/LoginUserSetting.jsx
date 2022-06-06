import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/actions/Actions";

const LoginUserSetting = () => {
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOut());
    navigator("/");
  };

  return (
    <div className="dropdown hide__dropdown">
      <div
        className="avatar__container dropdown-toggle"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={
            "https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
          }
          alt="avatar"
          referrerPolicy="no-referrer"
        />
        <BsChevronDown className="icon" />
      </div>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <DropdownLink
          link="/"
          text="Buy business packages"
          imageSrc="https://www.olx.com.pk/assets/iconBusinessPackages_noinline.64a7db94ef2eb1776d43916ce82b1a40.svg"
        />
        <DropdownLink
          link="/"
          text="Bought Packages & Billing"
          imageSrc="https://www.olx.com.pk/assets/iconBoughtPackages_noinline.b29b2b61c39def95f4bf58ac5b6dbb59.svg"
        />
        <DropdownLink
          link="/"
          text="help"
          imageSrc="https://www.olx.com.pk/assets/iconHelp_noinline.f07d255148323e318808a50c52097d0c.svg"
        />
        <DropdownLink
          link="/"
          text="settings"
          imageSrc="https://www.olx.com.pk/assets/iconHelp_noinline.f07d255148323e318808a50c52097d0c.svg"
        />
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={handleLogout}
          >
            <img
              src="https://www.olx.com.pk/assets/iconLogout_noinline.9da9ed94dfe84e900cc1ae3198b0375b.svg"
              alt="logout"
            />
            <span>logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LoginUserSetting;

// dropdown link

const DropdownLink = ({ link, text, imageSrc }) => {
  return (
    <li>
      <Link className="dropdown-item" to={link}>
        <img src={imageSrc} alt={text} />
        <span>{text}</span>
      </Link>
    </li>
  );
};
