import Talk from "talkjs";

import { Deferred } from "../utils/deferred.util";
import { appId, createTalkUser } from "../utils/talk-util";

// create a object from Deferred Class
const sessionDeferred = new Deferred();

export const initialize = async user => {
  await Talk.ready;

  sessionDeferred.resolve(
    new Talk.Session({
      appId: appId,
      me: await createTalkUser(user),
    })
  );
};

export const get = () => {
  return sessionDeferred.promise;
};
