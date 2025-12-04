import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { initializeChat, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface GeminiGuideProps {
  contextName: string;
}

const GeminiGuide: React.FC<GeminiGuideProps> = ({ contextName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Re-initialize chat when context changes (e.g., user switches collection)
  useEffect(() => {
    initializeChat(contextName);
    setMessages([{
      role: 'model',
      text: `¡Hola! Soy tu guía virtual en la sección ${contextName}. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date()
    }]);
  }, [contextName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-museum-200 overflow-hidden flex flex-col animate-fade-in-up" style={{height: '500px'}}>
          {/* Header */}
          <div className="bg-museum-800 text-museum-50 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icons.Info size={18} />
              <h3 className="font-serif font-semibold">Guía Virtual</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-museum-200 transition-colors">
              <Icons.Close size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-museum-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-museum-600 text-white rounded-br-none' 
                    : 'bg-white border border-museum-200 text-museum-900 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-museum-200 text-museum-600 p-3 rounded-lg rounded-bl-none shadow-sm text-xs italic">
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-museum-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Pregunta sobre la historia..."
              className="flex-1 border border-museum-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-museum-600 bg-museum-50"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-museum-700 text-white p-2 rounded-full hover:bg-museum-800 disabled:opacity-50 transition-colors"
            >
              <Icons.Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-museum-800 text-white px-5 py-3 rounded-full shadow-lg hover:bg-museum-900 transition-all transform hover:scale-105"
      >
        <Icons.Chat size={24} />
        <span className="font-serif font-semibold">
          {isOpen ? 'Cerrar Guía' : 'Preguntar al Guía'}
        </span>
      </button>
    </div>
  );
};

export default GeminiGuide;