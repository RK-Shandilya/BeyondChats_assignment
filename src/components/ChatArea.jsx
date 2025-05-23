import React, { useRef, useEffect, useState } from 'react';
import { Send, SmilePlus, Paperclip, Menu, ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { usersData } from '../data/usersData';

const ChatArea = ({ 
    isMobile, 
    showSidebar, 
    toggleSidebar, 
    toggleRightSidebar, 
    theme, 
    activeChatId,
    addComposerMessage,
    onAddComposer
  }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
  
    const activeUser = usersData.find(user => user.id === activeChatId) || usersData[0];
  
    useEffect(() => {
      setMessages([
        {
          id: 1,
          text: 'Hi there! How can I help you today?',
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
        }
      ]);
    }, [activeChatId]);
  
    useEffect(() => {
      if (addComposerMessage) {
        setMessage(addComposerMessage);
        inputRef.current?.focus();
      }
    }, [addComposerMessage]);
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    const handleSendMessage = () => {
      if (!message.trim()) return;
  
      const userMessage = {
        id: Date.now(),
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sending'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      onAddComposer('');
      setIsTyping(true);
  
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === userMessage.id ? {...msg, status: 'delivered'} : msg
        ));
      }, 500);
  

      setTimeout(() => {
        setIsTyping(false);
        const aiResponse = {
          id: Date.now() + 1,
          text: `Thanks for your message! I understand you're asking about "${message}". Let me help you with that right away.`,
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 2000);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };
  
    const quickReplies = [
      "How do I get a refund?",
      "Where is my order?",
      "I need to change my address",
      "Cancel my subscription"
    ];
  
    return (
      <div className="flex-1 flex flex-col bg-gray-50 h-full">
        <div className={`py-3 px-4 bg-linear-to-r from-white via-blue-50 to-blue-100 text-black flex items-center justify-between shadow-sm h-13`}>
          <div className="flex items-center gap-3">
            {(isMobile || !showSidebar) && (
              <button 
                onClick={toggleSidebar}
                className="p-1 rounded-full hover:bg-blue-600 transition-colors"
              >
                {isMobile ? <ArrowLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white bg-opacity-20 flex items-center justify-center text-sm font-semibold">
                  {activeUser.name.charAt(0)}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-blue-500 ${
                  activeUser.status === 'online' ? 'bg-green-500' : 
                  activeUser.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{activeUser.name}</h2>
                <p className="text-xs text-blue-100 capitalize">{activeUser.status}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
              <Phone className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
              <Video className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
              <MoreVertical className="h-4 w-4" />
            </button>
            <button 
              onClick={toggleRightSidebar}
              className="p-2 rounded-full transition-colors cursor-pointer"
            >
              <span className="text-lg">🤖</span>
            </button>
          </div>
        </div>
  
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-xs md:max-w-md rounded-2xl p-3 shadow-sm
                ${msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-md' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }
              `}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                  {msg.sender === 'user' && (
                    <span className={`text-xs ${
                      msg.status === 'sending' ? 'text-blue-200' :
                      msg.status === 'delivered' ? 'text-blue-100' : 'text-green-300'
                    }`}>
                      {msg.status === 'sending' ? '⏳' : '✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
  
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button 
                key={index}
                onClick={() => setMessage(reply)}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
  
          <div className="flex items-end gap-3">
            <div className="flex-1 flex items-end bg-gray-50 border border-gray-300 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
              <button type="button" className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <SmilePlus className="h-5 w-5" />
              </button>
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 py-1 px-2 bg-transparent resize-none focus:outline-none max-h-32"
                rows="1"
                onKeyPress={handleKeyPress}
                style={{
                  minHeight: '20px',
                  height: 'auto'
                }}
              />
              <button type="button" className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`p-3 rounded-full ${theme.highlightColor} ${
                !message.trim() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-600 cursor-pointer shadow-lg'
              } transition-all`}
            >
              <Send className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ChatArea;