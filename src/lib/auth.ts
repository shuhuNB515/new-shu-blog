import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "shu-blog-secret-key-2024";
const SALT_ROUNDS = 10;

export interface User {
  username: string;
}

// 唯一的用户账号（密码哈希存储在环境变量或默认值）
const ADMIN_USERNAME = "shuhu";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(
  process.env.ADMIN_PASSWORD || "Hu200692?",
  SALT_ROUNDS
);

export function verifyLogin(username: string, password: string): User | null {
  if (username !== ADMIN_USERNAME) return null;
  const valid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  if (!valid) return null;
  return { username };
}

export function createToken(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch {
    return null;
  }
}

export function isLoggedIn(cookies: { get: (name: string) => { value: string } | undefined }): boolean {
  const token = cookies.get("token")?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}
