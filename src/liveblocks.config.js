import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_eZFmL40jLyljMCvLPjq9dp_AYG2qxhMjMFPz0OOoGLQ4AwQN6OrD_IE2qww0c6zC",
});

export const {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  LiveblocksProvider,
} = createRoomContext(client);
