import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import RightSidebar from './components/RightSideBar';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeChatId, setActiveChatId] = useState(0);
  const [aiTab, setAiTab] = useState('copilot');
  const [message, setMessage] = useState('');
  const [composerMessage, setComposerMessage] = useState('');
  
  const theme = {
    headerGradient: 'bg-blue-500',
    highlightColor: 'bg-blue-700',
    highlightHoverColor: 'hover:bg-blue-600',
    borderColor: 'border-gray-200'
  };

  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      if (width < 768) {
        setShowSidebar(false);
        setShowRightSidebar(false);
      } else if (width < 1024) {
        setShowSidebar(true);
        setShowRightSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  const toggleSidebar = () => setShowSidebar(prev => !prev);
  const toggleRightSidebar = () => setShowRightSidebar(prev => !prev);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isMobile={isMobile}
        isTablet={isTablet}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        theme={theme}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />
      
      <ChatArea 
        isMobile={isMobile}
        isTablet={isTablet}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        toggleRightSidebar={toggleRightSidebar}
        theme={theme}
        activeChatId={activeChatId}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        addComposerMessage={composerMessage}
        onAddComposer={(message) => setComposerMessage(message)}
      />
      
      <RightSidebar 
        isMobile={isMobile}
        isTablet={isTablet}
        showRightSidebar={showRightSidebar}
        toggleRightSidebar={toggleRightSidebar}
        theme={theme}
        aiTab={aiTab}
        setAiTab={setAiTab}
        onAddComposer={(message) => setComposerMessage(message)}
      />
    </div>
  );
};
export default App;