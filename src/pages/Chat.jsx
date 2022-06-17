import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import cometchat ui.
import { CometChatMessages, CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

import LoaderWithBackground from "../components/loader/LoaderWithBackground";
import axiosInstance from "../axios/Axios";
import { useSelector } from "react-redux";

const Chat = () => {
  const [currentRide, setCurrentRide] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    userData: { user_detail },
  } = useSelector(({ UserLogin }) => UserLogin);

  const findUser = () => {
    if (user_detail && currentRide) {
      if (user_detail.account_type === "rider" && currentRide.deriver && currentRide.deriver.id) {
        let userId = currentRide.deriver.first_name + currentRide.deriver.id;
        return userId;
      } else if (
        user_detail.account_type === "drive_and_deliver" &&
        currentRide.requester &&
        currentRide.requester.id
      ) {
        let userId = currentRide.requester.first_name + currentRide.requester.id;

        return userId;
      }
    }
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
              setCurrentRide(res.data.response[0]);
            } else {
              setCurrentRide(null);
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
    <div style={{ width: "100vw", height: "100vh" }}>
      <CometChatMessages chatWithUser={findUser()} />
      {/* <CometChatUI /> */}
      <ToastContainer />
      {isLoading && <LoaderWithBackground />}
    </div>
  );
};

export default Chat;
