import prisma from "./prisma";
import {
  generatedPassword,
  mailOptions,
  generateToken,
} from "../../utils/index";

export default {
  Mutation: {
    signup: async (
      _: any,
      { username, email }: { username: string; email: string }
    ) => {
      const userExists = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      if (userExists) {
        throw new Error("Username or Email already exists.");
      } else {
        try {
          await prisma.user.create({
            data: {
              username,
              email,
            },
          });
          return true;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    },

    signin: async (_: any, { email }: { email: string }) => {
      const userExists = await prisma.user.findUnique({ where: { email } });
      const password = generatedPassword;

      if (!userExists) {
        throw new Error(
          "No account associated with this email, please Sign Up if you have not already created one."
        );
      } else {
        try {
          await prisma.user.update({
            where: { email },
            data: { password },
          });
          mailOptions(email, password);
          return true;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    },

    confirmPassword: async (
      _: any,
      { password, email }: { password: string; email: string }
    ) => {
      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (!userExists) {
        throw new Error(
          "No account associated with this email, please Sign Up if you have not already created one."
        );
      } else {
        try {
          if (userExists.password === password) {
            await prisma.user.update({
              where: { id: userExists.id },
              data: { password: "" },
            });
            return generateToken(userExists.id);
          } else {
            throw new Error("Password not matching, please try again!");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      }
    },

    // FIXME: Fix missing fields like avatar
    updateProfile: async (
      _: any,
      { username, email }: { username: string; email: string },
      { user: { id } }: { user: { id: number } }
    ) => {
      try {
        await prisma.user.update({
          where: { id },
          data: {
            username,
            email,
          },
        });

        return true;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
};
