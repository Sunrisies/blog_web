// utils/websocket.ts
import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { ErrorEvent, CloseEvent } from "reconnecting-websocket";
interface WebSocketMessage {
  room_id: number;
  room_name: string;
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
  roomId: number,
  roomName: string,
  userId: string,
  userNickname: string
) {
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // 使用 useRef 保存 ReconnectingWebSocket 实例
  const rws = useRef<ReconnectingWebSocket | null>(null);

  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window === "undefined") return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "wss:";
    // 注意：这里去掉了 /api/v1/rooms 前缀，根据你的后端路由调整
    const wsUrl = `${protocol}//${
      process.env.NEXT_PUBLIC_WS_URL || "localhost:2345"
    }/ws/${roomName}/${userId}`;

    console.log("初始化 ReconnectingWebSocket:", wsUrl);

    // 初始化 ReconnectingWebSocket
    rws.current = new ReconnectingWebSocket(wsUrl, [], {});

    // 存储事件处理函数以便清理
    const handleOpen = () => {
      console.log("WebSocket 连接成功");
      setIsConnected(true);
    };

    const handleMessage = (event: MessageEvent) => {
      console.log("收到 WebSocket 消息:", event.data);
      setLastMessage(event);
    };

    const handleError = (event: ErrorEvent) => {
      console.error("WebSocket 错误:", event);
      setIsConnected(false);
    };

    const handleClose = (event: CloseEvent) => {
      console.log("WebSocket 连接关闭:", event, new Date().toLocaleString());
      console.log("WebSocket 连接关闭:", event.code, event.reason);
      setIsConnected(false);
    };

    // 绑定事件监听
    rws.current.addEventListener("open", handleOpen);
    rws.current.addEventListener("message", handleMessage);
    rws.current.addEventListener("error", handleError);
    rws.current.addEventListener("close", handleClose);

    // 组件卸载或依赖变更时的清理函数
    return () => {
      console.log("清理 WebSocket 连接");
      if (rws.current) {
        // 移除事件监听
        rws.current.removeEventListener("open", handleOpen);
        rws.current.removeEventListener("message", handleMessage);
        rws.current.removeEventListener("error", handleError);
        rws.current.removeEventListener("close", handleClose);
        // 关闭连接
        rws.current.close();
        rws.current = null;
      }
      setIsConnected(false);
      setLastMessage(null);
    };
  }, [roomName, userId]); // 依赖项

  const sendMessage = (
    message: Omit<
      WebSocketMessage,
      "room_id" | "user_id" | "timestamp" | "user_nickname" | "room_name"
    >
  ) => {
    if (rws.current) {
      const fullMessage: WebSocketMessage = {
        ...message,
        room_id: roomId,
        room_name: roomName,
        user_id: userId,
        user_nickname: userNickname,
        timestamp: new Date().toISOString(),
      };

      const messageJson = JSON.stringify(fullMessage);
      console.log("发送 WebSocket 消息:", messageJson);
      rws.current.send(messageJson);
    } else {
      console.error("WebSocket 实例未初始化");
    }
  };

  return { lastMessage, sendMessage, isConnected };
}
