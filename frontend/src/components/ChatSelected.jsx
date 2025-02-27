import React, { useEffect } from 'react'
import {useChatStore} from "../store/useChatStore.js";
import MessagesLoading from './skeleton/MessagesLoading.jsx';
import ChatHeader from "../components/ChatHeader.jsx";
import MessageInput from "../components/MessageInput.jsx";

const ChatSelected = () => {

  const {getMessages, isMessagesLoading, messages, selectedUser} = useChatStore();

  useEffect(()=>{
    getMessages(selectedUser._id);
  },[selectedUser._id,getMessages]);

  if(isMessagesLoading) return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />
      <MessagesLoading />
      <MessageInput />
    </div>
    
  );


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <p>Messages...</p>

      <MessageInput />
    </div>
  )
}

export default ChatSelected