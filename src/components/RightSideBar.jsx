import React, { useState } from 'react';
import { X, SendHorizontal } from 'lucide-react';

const RightSidebar = ({ isMobile,isTablet, showRightSidebar, toggleRightSidebar, theme, aiTab, setAiTab, onAddComposer }) => {
    const [value, setValue] = useState("");
    const [activeSuggestion, setActiveSuggestion] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const suggestions = [
      "How do I get a refund?",
      "Refund for an order placed by mistake",
      "Refund for an unwanted gift"
    ];

    const handleAiTexthandler = (e) => {
        setValue(e.target.value);
    }

    const handleSendMessage = () => {
        if (value.trim() === "") return;
        setIsLoading(true);
        
        const newMessages = [...messages, { sender: 'user', text: value }];
        setMessages(newMessages);
        setValue("");
        
        setTimeout(() => {
            setIsLoading(false);
            setMessages([...newMessages, { sender: 'ai', text: refundInfo }]);
        }, 1000);
    }

    const handleAddComposer = () => {
        if (messages.length > 0) {
            const lastAiMessage = messages.find(msg => msg.sender === 'ai');
            if (lastAiMessage) {
                onAddComposer(lastAiMessage.text);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setActiveSuggestion(suggestion);
        setIsLoading(true);
        setMessages([{ sender: 'user', text: suggestion }]);
        setTimeout(() => {
            setIsLoading(false);
            setMessages([
              { sender: 'user', text: suggestion },
              { sender: 'ai', text: refundInfo }
            ]);
        }, 1500);
    }
  
    const refundInfo = `We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund.

To assist you with your refund request, could you please provide your order ID and proof of purchase.

Please note:
We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding.

Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back to us. Your refund will be automatically issued once you put it in the post.`;
  
    if (!showRightSidebar) return null;
  
    return (
        <div className={`
            ${isMobile ? 'fixed inset-0 z-20 w-80' : 'relative'}
            ${isTablet ? 'w-72' : 'w-80'}
            h-full border-l ${theme.borderColor} flex flex-col
            transition-transform duration-300 ease-in-out shadow-lg
            ${showRightSidebar ? 'translate-x-0' : 'translate-x-full'}
            bg-white
        `}>
    
        <div className="h-13 flex border-b border-gray-200 px-6 ">
          <button 
            onClick={() => setAiTab('copilot')}
            className={`flex-1 py-3 px-4 font-medium text-sm border-b-2 ${
              aiTab === 'copilot' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center justify-center">
              <span className="text-lg mr-1">🤖</span>
              <span>AI Copilot</span>
            </div>
          </button>
          <button 
            onClick={() => setAiTab('details')}
            className={`flex-1 py-3 font-medium text-sm border-b-2 ${
              aiTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            Details
          </button>
          <button 
            onClick={toggleRightSidebar}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
  
        {aiTab === 'copilot' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center border-b border-gray-200">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg">🤖</span>
                </div>
                <h3 className="font-medium">Hi, I'm Fin AI Copilot</h3>
                <p className="text-sm text-gray-500">Ask me anything about this conversation.</p>
              </div>
            ) : null }
  
            {messages.length > 0 ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className="mb-4">
                    <div className={`inline-block p-3 rounded-lg max-w-[90%] ${
                      message.sender === 'user'
                        ? 'bg-blue-50 text-blue-800'
                        : 'bg-linear-120 from-blue-50 via-white to-pink-100 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-line">{message.text}</p>
                      { message.sender != 'user' && 
                        <button className="px-6 py-2 rounded-2xl w-full flex items-center justify-center bg-white text-gray-700 hover:text-gray-900 cursor-pointer mt-2"
                        onClick={handleAddComposer}>
                            <span className="text-center font-medium">Add composer</span>
                        </button>
                      }
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl rounded-bl-md p-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSuggestion && (
                  <div className="text-xs text-gray-500 mt-6">
                    <p>15 relevant sources found</p>
                    <div className="mt-2 space-y-1">
                      {suggestions.map((suggestion, i) => (
                        <p key={i} className="flex items-center">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          {suggestion}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-2">Suggested</div>
                {suggestions.map((text, i) => (
                  <div 
                    key={i} 
                    className="p-3 mb-2 flex items-center bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(text)}
                  >
                    <div className="w-5 h-5 flex items-center justify-center mr-2 bg-gray-200 rounded text-xs">
                      {i === 0 ? '❌' : '📝'}
                    </div>
                    <p className="text-sm text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            )}
    
            <div className={`mt-auto p-4 mx-2`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={messages.length > 0 ? "Ask a follow up question..." : "Ask a question..."}
                  className="w-full pl-3 pr-10 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleAiTexthandler}
                  value={value}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="absolute right-2 top-2 text-gray-400 hover:text-blue-500"
                  onClick={handleSendMessage}
                >
                  <SendHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
  
        {aiTab === 'details' && (
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-medium mb-2">Customer Details</h3>
            <div className="mb-4">
              <p className="text-sm"><strong>Name:</strong> Luis Easton</p>
              <p className="text-sm"><strong>Email:</strong> luis.easton@example.com</p>
              <p className="text-sm"><strong>Account:</strong> Since January 2023</p>
              <p className="text-sm"><strong>Total Orders:</strong> 5</p>
            </div>
            
            <h3 className="font-medium mb-2">Refund Policy</h3>
            <div className="p-3 bg-purple-50 rounded-lg mb-4">
              <p className="text-sm mb-3">Please note:</p>
              <p className="text-sm mb-3">We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding.</p>
              <p className="text-sm">Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back to us. Your refund will be automatically issued once you put it in the post.</p>
            </div>
          </div>
        )}
      </div>
    );
  };

export default RightSidebar;