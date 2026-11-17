import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  FileText, 
  Truck, 
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { CHATBOT_KNOWLEDGE } from '../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-initial',
      sender: 'bot',
      text: 'Olá! Posso ajudar com documentação, rastreamento e logística internacional. Como posso orientar você?',
      timestamp: 'Agora'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Smart matching logic based on domain knowledge
    const query = text.toLowerCase();
    let reply = 'Compreendo a sua dúvida. Nossa equipe aduaneira no polo de Itapetininga e os despachantes credenciados em Santos e Callao estão à disposição. Você pode consultar o NCM no menu principal ou navegar pelas abas de Cotações e Rastreamento.';

    for (const item of CHATBOT_KNOWLEDGE) {
      if (item.keywords.some((k) => query.includes(k))) {
        reply = item.response;
        break;
      }
    }

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-[#1A3026] hover:bg-[#254436] text-white rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group border border-[#3E6652]"
        title="Assistente Virtual Brapex"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline text-xs font-bold pr-1">
          Suporte Aduaneiro
        </span>
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[540px] h-[500px] bg-white rounded-2xl shadow-2xl border border-[#D5D0C5] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-[#1A3026] text-white flex items-center justify-between border-b border-[#254436]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2E5A44] flex items-center justify-center text-white">
                <Bot className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">
                  Assistente Brapex
                </h3>
                <p className="text-[10px] text-[#B5C9BD]">
                  Orientação Aduaneira & Logística Brasil-Peru
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#C5D5CC] hover:text-white p-1 rounded-md"
              title="Fechar Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9F8F6]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#1A3026] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    B
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#1A3026] text-white rounded-tr-xs'
                      : 'bg-white text-[#1A3026] border border-[#E5E1D8] shadow-2xs rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-[#A8BEB1]' : 'text-[#7A8E82]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#1351B4] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#697E72] pl-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A3026] animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A3026] animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A3026] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px]">Consultando regulamento aduaneiro...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-[#F1EFEA] border-t border-[#E5E1D8] flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <button
              onClick={() => handleSendMessage('Quais são os documentos exigidos?')}
              className="px-2 py-1 bg-white hover:bg-[#E8E5DD] text-[#1A3026] border border-[#D5D0C5] rounded-full transition-colors"
            >
              Documentos exigidos
            </button>
            <button
              onClick={() => handleSendMessage('Como funciona o NCM e a isenção ACE 58?')}
              className="px-2 py-1 bg-white hover:bg-[#E8E5DD] text-[#1A3026] border border-[#D5D0C5] rounded-full transition-colors"
            >
              NCM e Alíquotas
            </button>
            <button
              onClick={() => handleSendMessage('Onde está a carga BRAPEX2026?')}
              className="px-2 py-1 bg-white hover:bg-[#E8E5DD] text-[#1A3026] border border-[#D5D0C5] rounded-full transition-colors"
            >
              Rastrear BRAPEX2026
            </button>
            <button
              onClick={() => handleSendMessage('Qual o valor da taxa Gov.br e Pix?')}
              className="px-2 py-1 bg-white hover:bg-[#E8E5DD] text-[#1A3026] border border-[#D5D0C5] rounded-full transition-colors"
            >
              Taxa R$ 245 no Pix
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E5E1D8] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua dúvida sobre o processo aduaneiro..."
              className="flex-1 py-2 px-3 bg-[#FBFBF9] border border-[#DDD9D0] rounded-xl text-xs text-[#1A3026] placeholder-[#8A9C92] focus:border-[#1A3026] focus:ring-1 focus:ring-[#1A3026] outline-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-[#1A3026] hover:bg-[#254436] disabled:opacity-50 text-white rounded-xl transition-colors shadow-2xs"
              title="Enviar Mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
