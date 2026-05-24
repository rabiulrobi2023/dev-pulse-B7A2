import bcrypt from "bcrypt";

const comparePassword = async (planePass: string, hashingPass: string) => {
  const result = await bcrypt.compare(planePass, hashingPass);
  return result;
};

export default comparePassword