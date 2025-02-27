import React from 'react'
import { useChatStore } from '../store/useChatStore.js';
import Sidebar from '../components/Sidebar.jsx';
import NoChatSelected from '../components/NoChatSelected';
import ChatSelected from '../components/ChatSelected';


const HomePage = () => {

  const {selectedUser} = useChatStore();

  return (
    <div className='h-screen bg-base-200'>
      <div className='flex justify-center items-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='h-full rounded-lg overflow-hidden'>
            <Sidebar />
            
            {!selectedUser ? <NoChatSelected /> : <ChatSelected />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage