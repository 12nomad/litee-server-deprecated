import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import app from "./app";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers/index";
import permissions from "./utils/permissions";

dotenv.config();
const port = process.env.PORT || 8000;
const jwtSecret = process.env.JWT_SECRET || "d~rZ2aUTnY[Xu4=";

const startApolloServer = async () => {
  const server = new ApolloServer({
    // FIXME: With Shield
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers }),
      permissions
    ),
    context: (ctx) => {
      if (ctx && ctx.req && ctx.req.user) {
        const { user } = ctx.req;
        return { user };
      } else {
        const token = ctx.req.headers.authorization || "";
        const decodedJwt = jwt.verify(token, jwtSecret);
        return { decodedJwt };
      }
    },

    // FIXME: Without Shield
    // typeDefs,
    // resolvers,
    // context: (ctx) => {
    //   if (ctx && ctx.req) {
    //     const { user } = ctx.req;
    //     return { user };
    //   }
    // },
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port });
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  return { server, app };
};
startApolloServer();
