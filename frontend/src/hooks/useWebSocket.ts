import { useState, useEffect, useCallback, useRef } from 'react';
import type { ConnectionStatus, Message } from '../types/chat';

export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [isTyping, setIsTyping] = useState(false); // Waiting for 1st chunk
  const [isStreaming, setIsStreaming] = useState(false); // Text is currently dripping
  const [displayQueue, setDisplayQueue] = useState<string>(""); 
  const socketRef = useRef<WebSocket | null>(null);
  
  const typingSpeed = 30; 

  // Load from LocalStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history');
    if (!saved) return [];
    try {
      return JSON.parse(saved).map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }));
    } catch (e) {
      return [];
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setDisplayQueue("");
    setIsStreaming(false);
    setIsTyping(false);
    localStorage.removeItem('chat_history');
  }, []);

  // FEATURE: Slow Typing Effect + Streaming Lock
  useEffect(() => {
    if (displayQueue.length > 0) {
      setIsStreaming(true); // Keep input disabled
      const timeout = setTimeout(() => {
        const nextChar = displayQueue[0];
        
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.role === 'ai') {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              ...lastMsg,
              content: lastMsg.content + nextChar,
            };
            return newMessages;
          } else {
            return [...prev, { 
              id: Date.now().toString(), 
              role: 'ai', 
              content: nextChar, 
              timestamp: new Date() 
            }];
          }
        });

        setDisplayQueue((prev) => prev.slice(1));
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      // The queue is empty, typing is finished
      setIsStreaming(false); 
    }
  }, [displayQueue]);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;
    setStatus('connecting');

    socket.onopen = () => setStatus('connected');
    socket.onclose = () => setStatus('disconnected');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chunk') {
        setIsTyping(false); 
        setDisplayQueue((prev) => prev + data.content);
      }
      if (data.type === 'done' || data.type === 'error') {
        setIsTyping(false);
      }
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [connect]);

  const sendMessage = useCallback((text: string) => {
    const isReady = socketRef.current && socketRef.current.readyState === WebSocket.OPEN;
    if (isReady) {
      const userMsg: Message = { 
        id: Date.now().toString(), 
        role: 'user', 
        content: text, 
        timestamp: new Date() 
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true); // Trigger disabled state immediately
      socketRef.current?.send(JSON.stringify({ text }));
    } else {
      connect(); 
      alert("Reconnecting to server... please try again in a moment.");
    }
  }, [connect]);

  return { messages, status, sendMessage, isTyping, isStreaming, clearChat };
};