import { useState, useEffect, useRef } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Trash2, Sun, Moon } from 'lucide-react';

function App() {
  const { messages, status, sendMessage, isTyping, isStreaming, clearChat } = useWebSocket('ws://localhost:8080');
  const [isDark, setIsDark] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <header className="p-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700 shadow-sm flex justify-between items-center px-6">
          <h1 className="text-xl font-bold text-blue-600">AI Stream Chat</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={clearChat} className="p-2 text-slate-400 hover:text-red-500 rounded-full transition-colors" title="Clear Chat">
              <Trash2 size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && (
               <div className="flex gap-1 p-4 bg-white dark:bg-slate-800 w-fit rounded-2xl ml-2 shadow-sm">
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
               </div>
            )}
            <div ref={scrollRef} />
          </div>
        </main>

        <footer className="bg-white dark:bg-slate-800 border-t dark:border-slate-700">
          <ChatInput 
            onSend={sendMessage} 
            disabled={status !== 'connected' || isTyping || isStreaming} 
          />
        </footer>
      </div>
    </div>
  );
}

export default App;