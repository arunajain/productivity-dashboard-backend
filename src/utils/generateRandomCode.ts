import { generate } from "randomstring";
const generateRandomCode = (length: number): string => {
  return generate({
    length,
    charset: "numeric",
  });
};
export default generateRandomCode;
