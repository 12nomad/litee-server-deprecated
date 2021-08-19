const { mergeResolvers } = require("@graphql-tools/merge");
import queries from "./queries";
import mutations from "./mutations";
import customs from "./customs";

const resolversArray = [queries, mutations, customs];
const resolvers = mergeResolvers(resolversArray);

export default resolvers;
