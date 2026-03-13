import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Skull, Loader2 } from 'lucide-react';
import { ScrollArea } from '../components/ui/scroll-area';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Welcome to Catrina\'s Tacos & Tequilas! I\'m here to help you with our menu, hours, reservations, or any questions you have. What can I help you with today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        message: userMessage,
        session_id: sessionId,
      });

      setSessionId(response.data.session_id);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.data.response },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lo siento! I\'m having trouble connecting right now. Please call us at (816) 534-9203 for immediate assistance.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What are your hours?',
    'What\'s on the menu?',
    'Do you have vegetarian options?',
    'How do I make a reservation?',
  ];

  return (
    <div className="chat-widget">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="chat-panel flex flex-col"
            data-testid="chat-panel"
          >
            {/* Header */}
            <div className="bg-catrina-orange p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-catrina-bg/20 rounded-full">
                  <Skull className="w-5 h-5 text-catrina-cream" />
                </div>
                <div>
                  <h4 className="font-accent text-catrina-bg text-sm tracking-wider">
                    La Catrina
                  </h4>
                  <p className="text-catrina-bg/70 text-xs">Your virtual host</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                data-testid="chat-close-btn"
                className="p-2 hover:bg-catrina-bg/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-catrina-bg" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-[300px]">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    data-testid={`chat-message-${index}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-catrina-orange text-catrina-bg'
                          : 'bg-catrina-card text-catrina-cream'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-catrina-card p-3 rounded-lg">
                      <Loader2 className="w-5 h-5 text-catrina-orange animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-catrina-muted text-xs mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(q);
                        inputRef.current?.focus();
                      }}
                      data-testid={`quick-question-${i}`}
                      className="text-xs px-3 py-1 bg-catrina-card text-catrina-cream hover:bg-catrina-orange hover:text-catrina-bg transition-colors rounded-full"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-catrina-card">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  data-testid="chat-input"
                  className="flex-1 bg-catrina-bg border border-catrina-card text-catrina-cream px-4 py-2 text-sm focus:outline-none focus:border-catrina-orange transition-colors rounded-none placeholder:text-catrina-muted"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  data-testid="chat-send-btn"
                  className="p-2 bg-catrina-orange text-catrina-bg hover:bg-catrina-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="chat-toggle-btn"
        className="chat-bubble"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-catrina-cream" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Skull className="w-6 h-6 text-catrina-cream" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
