// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>(
    {
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10,
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1"],
        secure: false,
      },
    }
  );

export { getSession, commitSession, destroySession };