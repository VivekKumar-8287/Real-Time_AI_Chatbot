import React, { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSend, disabled }: Props) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white dark:bg-slate-800 dark:border-slate-700 transition-colors">
      <div className="flex gap-2 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={disabled ? "AI is typing..." : "Type your message..."}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 
                     bg-white dark:bg-slate-900 
                     text-slate-900 dark:text-slate-100 
                     border-slate-300 dark:border-slate-600 
                     disabled:bg-slate-50 dark:disabled:bg-slate-800 
                     disabled:cursor-not-allowed
                     placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
        />
        <button
          type="submit"
          disabled={disabled || input.trim() === ''} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-30 hover:bg-blue-700 active:scale-95 transition-all"
        >
          Send
        </button>
      </div>
    </form>
  );
};