import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const faqResponses: Record<string, string> = {
  'training': 'We offer 3-Day Training (₹1000), 1-Week Training (₹15000), and 1-Month Advanced Training (₹50000). All courses include hands-on patient demonstrations. Would you like to register?',
  'course': 'We offer 3-Day Training (₹1000), 1-Week Training (₹15000), and 1-Month Advanced Training (₹50000). All courses include hands-on patient demonstrations. Would you like to register?',
  'workshop': 'Our next workshop is on Dental Implantology from April 19-23, 2024. You can register online or call us at +91 91511 61267.',
  'price': 'Our training programs: 3-Day Training at ₹1000, 1-Week Training at ₹15000, and 1-Month Advanced Training at ₹50000.',
  'cost': 'Our training programs: 3-Day Training at ₹1000, 1-Week Training at ₹15000, and 1-Month Advanced Training at ₹50000.',
  'register': 'You can register for workshops by clicking the "Register Now" button on our Training page, or call us directly at +91 91511 61267.',
  'booking': 'You can book our Mobile Dental Clinic for your community by filling out the contact form or calling +91 91511 61267.',
  'mobile clinic': 'Our Mobile Dental Clinic provides screenings, extractions, and implant counseling in underserved areas. Book now!',
  'contact': 'You can reach us at hello@kindwaybio.com or call +91 91511 61267. Our office is in Varanasi, Uttar Pradesh.',
  'phone': 'You can reach us at +91 91511 61267.',
  'location': 'We are located in Varanasi, Uttar Pradesh, India.',
  'address': 'We are located in Varanasi, Uttar Pradesh, India.',
  'product': 'Our flagship product is the BioRezens Collagen Membrane - a resorbable barrier for guided bone regeneration.',
  'membrane': 'BioRezens Collagen Membrane offers predictable handling, excellent wound stability, and controlled resorption.',
  'implant': 'We provide dental implants and bone graft materials, along with comprehensive training programs.',
  'bone graft': 'Our bone graft materials are designed for ridge preservation, socket grafting, and implant placement.',
  'certificate': 'Yes, all participants receive a certificate after course completion.',
  'hello': 'Hello! Welcome to Kindway BIOREZENS. How can I help you today?',
  'hi': 'Hi there! How can I assist you with our dental products or training programs?',
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! Welcome to Kindway BIOREZENS. How can I help you today?', isBot: true },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return "I'm not sure about that. You can ask me about our training programs, products, mobile clinic, or contact information. Or you can call us at +91 91511 61267 for direct assistance.";
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickReplies = [
    'Training courses',
    'Product info',
    'Mobile clinic',
    'Contact us',
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-[#111827] rotate-90' : 'bg-[#3B5BFF] hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#3B5BFF] p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h4 className="text-white font-semibold">Kindway Assistant</h4>
            <p className="text-white/70 text-xs">Online - Ready to help</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot ? 'bg-[#3B5BFF]/10' : 'bg-[#111827]'
                }`}
              >
                {message.isBot ? (
                  <Bot size={14} className="text-[#3B5BFF]" />
                ) : (
                  <User size={14} className="text-white" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  message.isBot
                    ? 'bg-[#F6F8FC] text-[#111827] rounded-tl-none'
                    : 'bg-[#3B5BFF] text-white rounded-tr-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => {
                    setInputText(reply);
                    setTimeout(handleSend, 100);
                  }}
                  className="px-3 py-1.5 bg-[#E8EDF5] text-[#5A6478] text-xs rounded-full hover:bg-[#3B5BFF] hover:text-white transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 bg-[#F6F8FC] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-[#3B5BFF] rounded-full flex items-center justify-center hover:bg-[#2a48e0] transition-colors"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
