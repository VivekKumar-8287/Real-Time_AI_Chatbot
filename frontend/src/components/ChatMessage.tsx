import ReactMarkdown from 'react-markdown';
import { Copy, Check } from 'lucide-react'; // Assuming you installed lucide-react
import { useState } from 'react';
import type { Message } from '../types/chat';

export const ChatMessage = ({ message }: { message: Message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className={`relative max-w-[85%] rounded-2xl px-4 py-2 shadow-sm ${
        isUser ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border dark:border-slate-700'
      }`}>
        {/* FEATURE: Markdown Rendering */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        <div className="flex items-center justify-between mt-1 gap-4">
          <span className="text-[10px] opacity-50">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {/* FEATURE: Copy to Clipboard */}
          {!isUser && (
            <button 
              onClick={copyToClipboard}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
            >
              {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};