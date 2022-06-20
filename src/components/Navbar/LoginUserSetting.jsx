import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions/Actions";
import { BsChat } from "react-icons/bs";

const LoginUserSetting = ({ profile_pic, unreadCount }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOut());
    navigator("/");
  };

  return (
    <div className="d-flex align-items-center">
      {unreadCount > 0 && (
        <div className="position-relative" style={{ cursor: "pointer" }} onClick={() => navigator("/chat")}>
          <BsChat className="icon__bell " style={{ color: "white", fontSize: "1.6rem", marginRight: "2rem" }} />
          <div className="bell__notification">{unreadCount}</div>
        </div>
      )}
      <div className="dropdown hide__dropdown">
        <div
          className="avatar__container dropdown-toggle"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={profile_pic ? profile_pic : null} alt="avatar" />
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
            <button className="dropdown-item" type="button" onClick={handleLogout}>
              <img
                src="https://www.olx.com.pk/assets/iconLogout_noinline.9da9ed94dfe84e900cc1ae3198b0375b.svg"
                alt="logout"
              />
              <span>logout</span>
            </button>
          </li>
        </ul>
      </div>
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
