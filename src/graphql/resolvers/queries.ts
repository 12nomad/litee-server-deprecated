import prisma from "./prisma";

export default {
  Query: {
    loggedUser: async (
      _: any,
      __: any,
      { user: { id } }: { user: { id: number } }
    ) => {
      return await prisma.user.findUnique({ where: { id } });
    },

    searchUsers: async (_: any, { keyword }: { keyword: string }) =>
      await prisma.user.findMany({
        where: {
          username: { contains: keyword },
        },
      }),
  },
};
