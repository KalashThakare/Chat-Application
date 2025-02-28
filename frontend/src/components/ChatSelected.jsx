import React, { useEffect } from 'react'
import {useChatStore} from "../store/useChatStore.js";
import MessagesLoading from './skeleton/MessagesLoading.jsx';
import ChatHeader from "../components/ChatHeader.jsx";
import MessageInput from "../components/MessageInput.jsx";
import { useAuthStore } from '../store/useAuthStore.js';
import { formatMessageTime } from '../lib/util.js';

const ChatSelected = () => {

  const {getMessages, isMessagesLoading, messages, selectedUser} = useChatStore();
  const {authUser} = useAuthStore();

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

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((messages)=>(
          <div
            key={messages._id}


            className={`chat ${messages.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={messages.senderId === authUser.profilePic || "/profile.jpg"} alt="profilePic" />
              </div>
            </div>
            <div className='chat-header mb-1 flex-col gap-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(messages.createdAt)}
              </time>
              <div className='felx chat-bubble'>
                {messages.image &&(
                  <img src={messages.image} alt="attachment" className='sm:max-w-[200px] rounded-md mb-2'/>
                )}
                {messages.text &&(
                  <p>{messages.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatSelected