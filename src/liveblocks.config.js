import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "YOUR_LIVEBLOCKS_PUBLIC_KEY",
});

export const {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  LiveblocksProvider,
} = createRoomContext(client);
