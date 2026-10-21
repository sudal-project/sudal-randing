import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "이메일 주소를 다시 확인해 주세요."),
  os: z.enum(["windows", "macos"]).nullable(),
  beta: z.boolean(),
  source: z.enum(["hero", "footer"]),
  agree: z.literal(true),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export function parseWaitlistForm(formData: FormData) {
  return waitlistSchema.safeParse({
    email: formData.get("email"),
    os: formData.get("os") ? String(formData.get("os")) : null,
    beta: formData.get("beta") === "on",
    source: formData.get("source"),
    agree: formData.get("agree") === "on",
  });
}
