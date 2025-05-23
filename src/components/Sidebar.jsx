import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { usersData } from '../data/usersData';

const Sidebar = ({ 
  isMobile, 
  isTablet,
  showSidebar, 
  toggleSidebar, 
  theme, 
  activeChatId,
  setActiveChatId 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = usersData.filter(convo =>
    convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!showSidebar && !isMobile) return null;

  return (
    <div className={`
        ${isMobile ? 'fixed inset-0 z-20 w-80' : 'relative'}
        ${isTablet ? 'w-64' : 'w-74'}
        h-full bg-white border-r ${theme.borderColor} flex flex-col
        transition-transform duration-300 ease-in-out shadow-lg
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className={`py-2 px-6 ${theme.headerGradient} text-white flex justify-between items-center h-13`}>
        <h2 className="text-lg font-medium">Your inbox</h2>
        <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-blue-600 transition-colors md:hidden"
        >
            <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex px-4 py-2 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">5 Open</span>
          <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
        </div>
        <div className="ml-4 flex items-center">
          <span className="text-sm font-medium text-gray-700">Waiting longest</span>
          <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
        </div>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-1">
        {filteredConversations.map(convo => (
          <div
            key={convo.id}
            onClick={() => setActiveChatId(convo.id)}
            className={`p-3 mb-1 rounded-3xl cursor-pointer transition-colors
              ${activeChatId === convo.id ? 'bg-blue-50' : 'hover:bg-gray-50'}
              ${convo.unread ? 'font-medium' : ''}
            `}
          >
            <div className="flex items-center mb-1">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs mr-2">
                {convo.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{convo.name}</span>
                    {convo.source && (
                      <span className="ml-1 text-xs text-gray-500">• {convo.source}</span>
                    )}
                  </div>
                  <span className={`text-gray-800 ${ convo.id==1 ? "bg-yellow-100" : ""} text-xs px-2 py-0.5 rounded`}>{convo.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{convo.preview}</p>
                {
                    convo.id == 3 &&
                    (
                        <div className='flex'>
                            <span className="text-xs text-gray-500">{convo.by}</span>
                            <span className="ml-1 text-xs text-gray-500">• {convo.vlaue}</span>
                        </div>
                    )
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;