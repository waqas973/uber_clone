import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import LoginUserSetting from "./LoginUserSetting";
import * as talkSession from "../../shared/talk/talk-session";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const loginUser = useSelector(({ UserLogin }) => UserLogin);
  const isAuthUser = loginUser.IsUserLogIn || localStorage.getItem("uber-demo-token") !== null;
  const access_token = localStorage.getItem("uber-demo-token");

  // check for unread message count
  useEffect(() => {
    if (access_token && loginUser.userData.user_detail) {
      const talkUnreadMessage = async () => {
        /* TalkJS */
        let userData = loginUser.userData.user_detail;
        let user = {
          id: userData.id,
          username: userData.username,
          photoUrl: userData.partner_photo ? userData.partner_photo : "",
          role: "default",
        };

        // create a session of user with Talkjs for chatting purpose
        talkSession.initialize(user);
        const session = await talkSession.get();

        session.unreads.onChange(function (conversationIds) {
          let unreadCount = conversationIds.length;
          setUnreadCount(unreadCount);
        });
      };
      talkUnreadMessage();
    }
  }, [access_token, loginUser.userData.user_detail]);

  return (
    <nav className="navbar navbar-expand-lg navbar__transparent ">
      <div className="container position-relative">
        <Link className="navbar-brand " to="/">
          Uber
        </Link>
        {/* check it user login or not  */}

        {isAuthUser === true ? (
          <>
            <LoginUserSetting profile_pic={loginUser?.userData?.user_detail?.partner_photo} unreadCount={unreadCount} />
          </>
        ) : (
          <button
            className={`navbar-toggler ${!showMenu && "collapsed"}`}
            type="button"
            aria-expanded={showMenu}
            aria-label="Toggle navigation"
            onClick={() => setShowMenu(!showMenu)}
          >
            <GiHamburgerMenu className="navbar-toggler-icon" />
          </button>
        )}
        {isAuthUser === false && (
          <div className={`collapse navbar-collapse ${showMenu && "show"}`} id="navbarSupportedContent">
            <CgClose className="icon  close__icon" onClick={() => setShowMenu(false)} />
            <ul className="navbar-nav  mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
