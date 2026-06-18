export const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge: 1000 * 60 * 60, // 1 hour (FIXED)
};