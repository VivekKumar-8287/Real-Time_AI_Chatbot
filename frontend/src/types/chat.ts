export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';