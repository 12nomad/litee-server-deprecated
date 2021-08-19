import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    password: String
    posts: [Post!]
    createdAt: String!
  }

  type Post {
    id: Int!
    user: User
    userId: Int
    description: String
    location: String
    createdAt: String!
    updatedAt: String!
  }

  type Picture {
    id: Int!
  }

  type Like {
    id: Int!
  }

  type Comment {
    id: Int!
  }

  # TODO: Operations =>
  type Query {
    loggedUser: User!
    searchUsers(keyword: String!): [User!]
  }

  type Mutation {
    signup(email: String!, username: String!): Boolean
    signin(email: String!): Boolean
    confirmPassword(email: String!, password: String!): String
    updateProfile(username: String, email: String, avatar: String): Boolean
  }
`;

export default typeDefs;
