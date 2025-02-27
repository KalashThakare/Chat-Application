import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import SidebarSkeleton from './skeleton/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';


const Sidebar = () => {

    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    const {onLineUsers} = useAuthStore();

    useEffect(()=>{
        getUsers()
    },[getUsers]);

    if(isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className='h-full w-20 lg:w-72 flex flex-col transition-all duration-200 border-r border-base-300'>
      <div className='border-b border-base-300 w-full p-5'>
        <div className='flex items-center gap-2'>
          <Users className='size-6'/>
          <span className='font-medium hidden lg:block'>
            Contacts
          </span>
        </div>
      </div>

      <div className='overflow-y-auto w-full py-3'>
        {users.map((user)=>(
          <button key={user._id}
            onClick={()=>setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
          >

            <div className='relative mx-auto lg:mx-0'>
              <img src={user.profilePic || "/profile.jpg"} alt={user.name} className='size-12 object-cover rounded-full'/>
              {onLineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullname}</div>
              <div className="text-sm text-zinc-400">
                {onLineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>

          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar