import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import LoaderWithBackground from "../components/loader/LoaderWithBackground";
import axiosInstance from "../axios/Axios";
import { useSelector } from "react-redux";
import * as talkSession from "../shared/talk/talk-session";
import { getOrCreateConversation } from "../shared/utils/talk-util";

const Chat = () => {
  // state
  const [isLoading, setIsLoading] = useState(false);
  const {
    userData: { user_detail },
  } = useSelector(({ UserLogin }) => UserLogin);
  const talkjsContainer = useRef(null);

  // fill user data for create chat room
  const fillUserDataForChat = (current_user, other_user) => {
    let currentUser = {
      id: current_user.id,
      username: current_user.username,
      photoUrl: current_user.partner_photo ? current_user.partner_photo : "",
      role: "default",
    };
    let otherUser = {
      id: other_user.id,
      username: other_user.username,
      photoUrl: other_user.partner_photo ? other_user.partner_photo : "",
      role: "default",
    };

    return [currentUser, otherUser];
  };

  const talkUserChat = async (currentUser, otherUser) => {
    /* TalkJS */
    const session = await talkSession.get();

    const conversation = await getOrCreateConversation(session, currentUser, otherUser);
    let inbox = session.createChatbox();
    inbox.select(conversation);
    inbox.mount(talkjsContainer.current);
  };

  // check for accepted ride
  useEffect(() => {
    if (user_detail) {
      setIsLoading(true);
      const requests = async () => {
        axiosInstance
          .get(`${process.env.REACT_APP_API_BASE_URL}/accepted_rides/${user_detail.id}/`)
          .then(res => {
            if (res.data.response.length > 0) {
              // for talkjs purpose
              const requestorData = res.data.response[0].requester;
              const driverData = res.data.response[0].deriver;
              let currentUser = {};
              let otherUser = {};
              // check the account type
              if (user_detail.account_type === "drive_and_deliver") {
                let chatUser = fillUserDataForChat(driverData, requestorData);
                currentUser = chatUser[0];
                otherUser = chatUser[1];
              } else if (user_detail.account_type === "rider") {
                let chatUser = fillUserDataForChat(requestorData, driverData);
                currentUser = chatUser[0];
                otherUser = chatUser[1];
              }

              //  sending users to talkChat
              if (currentUser && otherUser) {
                talkUserChat(currentUser, otherUser);
              }
            }
          })
          .catch(() => {
            toast.error("unable to fetch rides. please try again later.");
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      requests();
    }
  }, [user_detail]);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        id="talkjs-container"
        style={{
          height: "80%",
          width: "100%",
        }}
        ref={talkjsContainer}
      ></div>

      <ToastContainer />
      {isLoading && <LoaderWithBackground />}
    </div>
  );
};

export default Chat;
