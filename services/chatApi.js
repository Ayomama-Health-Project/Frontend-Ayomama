import api from "../api";

const unwrap = async (promise) => {
  const response = await promise;
  return response.data.data;
};

export const chatApi = {
  fetchMessages: () => unwrap(api.get("/api/v1/chat/messages")),
  clearMessages: () => unwrap(api.delete("/api/v1/chat/messages")),
  sendMessage: (content) => unwrap(api.post("/api/v1/chat/messages", { content })),
  streamMessage: async (content, accessToken, onChunk) => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000"}/api/v1/chat/messages?stream=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ content }),
      },
    );

    if (!response.ok) {
      throw new Error("Unable to stream chat response.");
    }

    if (!response.body) {
      throw new Error("Streaming is not available on this device.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let finalMessage = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() || "";

      for (const eventBlock of events) {
        const eventLine = eventBlock.split("\n").find((line) => line.startsWith("event:"));
        const dataLine = eventBlock.split("\n").find((line) => line.startsWith("data:"));
        if (!dataLine) continue;

        const eventName = eventLine?.replace("event:", "").trim() || "message";
        const payload = JSON.parse(dataLine.replace("data:", "").trim());
        if (eventName === "chunk") {
          onChunk?.(payload.delta);
        }
        if (eventName === "done") {
          finalMessage = payload;
        }
      }
    }

    return finalMessage;
  },
};
