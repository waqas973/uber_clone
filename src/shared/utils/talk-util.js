import Talk from "talkjs";

export const appId = "tM3VZSAY";

export async function createTalkUser(applicationUser) {
  await Talk.ready;

  return new Talk.User({
    id: "talkjs_react_marketplace" + applicationUser.id,
    name: applicationUser.username,
    photoUrl: applicationUser.profilePictureUrl,
    role: "default",
  });
}

export async function getOrCreateConversation(session, currentUser, otherUser) {
  const currentTalkUser = await createTalkUser(currentUser);
  const otherTalkUser = await createTalkUser(otherUser);

  const conversationBuilder = session.getOrCreateConversation(Talk.oneOnOneId(currentTalkUser, otherTalkUser));
  conversationBuilder.setParticipant(currentTalkUser);
  conversationBuilder.setParticipant(otherTalkUser);

  return conversationBuilder;
}
