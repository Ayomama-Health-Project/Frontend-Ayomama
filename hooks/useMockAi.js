import { useState } from "react";
import { buildMockChatReply } from "../utils/mockData";

export default function useMockAi() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageId, setLastMessageId] = useState(null);

  const initializeSession = async () => ({ success: true });

  const sendMessage = async (content) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    const assistantMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: "assistant",
      content: buildMockChatReply(content),
      timestamp: new Date().toISOString(),
    };

    setIsLoading(true);
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setLastMessageId(assistantMessage.id);
    setIsLoading(false);

    return { success: true };
  };

  const clearSession = () => {
    setMessages([]);
    setLastMessageId(null);
  };

  return {
    messages,
    isLoading,
    initializeSession,
    sendMessage,
    clearSession,
    lastMessageId,
    error: null,
    storageWarning: false,
  };
}
