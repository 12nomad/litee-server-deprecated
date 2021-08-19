import { rule, shield } from "graphql-shield";

const isAuthenticated = rule()(
  (_: any, __: any, { user }: { user: any }) => user !== null
);

const permissions = shield({
  // User: {
  //   isFollowing: isAuthenticated,
  //   postCount: isAuthenticated,
  //   myAccount: isAuthenticated,
  //   followingCount: isAuthenticated,
  //   followersCount: isAuthenticated,
  // },
  // Post: {
  //   isLiked: isAuthenticated,
  //   likeCount: isAuthenticated,
  // },
  // Chat: {
  //   newMessageCount: isAuthenticated,
  // },
  // Message: {
  //   seen: isAuthenticated,
  // },
  Query: {
    loggedUser: isAuthenticated,
    searchUsers: isAuthenticated,
    //   searchPost: isAuthenticated,
    //   checkProfile: isAuthenticated,
    //   checkPost: isAuthenticated,
    //   feed: isAuthenticated,
    //   checkFollowers: isAuthenticated,
    //   checkFollowing: isAuthenticated,
    //   checkChats: isAuthenticated,
    //   checkChat: isAuthenticated,
  },
  // Mutation: {
  //   uploadPost: isAuthenticated,
  //   toggleLike: isAuthenticated,
  //   commentPost: isAuthenticated,
  //   editComment: isAuthenticated,
  //   toggleFollow: isAuthenticated,
  //   editProfile: isAuthenticated,
  //   editPost: isAuthenticated,
  //   seenMessage: isAuthenticated,
  //   sendMessage: isAuthenticated,
  // },
});

export default permissions;
