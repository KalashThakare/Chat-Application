import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChat.store.js'


const Sidebar = () => {

    const {getUsers, users, selectedUsers, setSelectedUsers, isUsersLoading } = useChatStore();

    useEffect(()=>{
        getUsers()
    },[getUsers]);

    if(isUsersLoading)
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar