import { useEffect, useRef, useState } from "react";

interface WebSocketMessage {
  room_id: string;
  user_id: string;
  user_nickname: string;
  message_type: string;
  content?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  retention_hours: number;
  timestamp: string;
}

export function useWebSocket(
  roomId: string,
  userId: string,
  userNickname: string
) {
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout>();

  const connect = () => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${process.env.NEXT_PUBLIC_WS_URL}/ws/${roomId}/${userId}`;

    console.log("连接 WebSocket:", wsUrl);

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket 连接成功");
      setIsConnected(true);

      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };

    ws.current.onmessage = (event) => {
      console.log("收到 WebSocket 消息:", event.data);
      setLastMessage(event);
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket 连接关闭:", event.code, event.reason);
      setIsConnected(false);

      if (event.code !== 1000) {
        reconnectTimeout.current = setTimeout(() => {
          console.log("尝试重新连接...");
          connect();
        }, 3000);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket 错误:", error);
      setIsConnected(false);
    };
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close(1000, "组件卸载");
      }
    };
  }, [roomId, userId]);

  const sendMessage = (
    message: Omit<
      WebSocketMessage,
      "room_id" | "user_id" | "timestamp" | "user_nickname"
    >
  ) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const fullMessage: WebSocketMessage = {
        ...message,
        room_id: roomId,
        user_id: userId,
        user_nickname: userNickname,
        timestamp: new Date().toISOString(),
      };

      const messageJson = JSON.stringify(fullMessage);
      console.log("发送 WebSocket 消息:", messageJson);
      ws.current.send(messageJson);
    } else {
      console.error("WebSocket 未连接。当前状态:", ws.current?.readyState);
    }
  };

  return { lastMessage, sendMessage, isConnected };
}
