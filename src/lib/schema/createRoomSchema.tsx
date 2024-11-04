import { z } from "zod";

const createRoomSchema = z.object({
  ghPrLink: z.string().url(),
});

export default createRoomSchema;
