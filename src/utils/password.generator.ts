import { generate } from "generate-password";

export const generatedPassword = generate({ length: 6, numbers: true });
