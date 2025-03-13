import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt()
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}
