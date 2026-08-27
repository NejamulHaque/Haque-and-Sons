import { auth } from "@/lib/auth"; // Import the config from Step 2
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);