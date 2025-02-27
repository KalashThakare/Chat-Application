import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {

  const [text,setText] = useState();
  const [imgPreview,setImgPreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessages} = useChatStore();

  const handleImageChange=(e)=>{
    const img = e.target.files[0];
    if(!img.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend=()=>{
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(img);
  }

  const removeImage =()=>{
    setImgPreview(null);
    if(fileInputRef.current) fileInputRef.current.value="";
  }

  const handleSendMessage=async(e)=>{
    e.preventDefault();
    if(!text && !imgPreview) return;

    try {
      await sendMessages({
        text:text,
        image:imgPreview,
      });

      setText("");
      setImgPreview(null);
      if(fileInputRef.current) return fileInputRef.current.value="";
    } catch (error) {
      console.error("Failed to send message:",error);
    }
  }

  return (
    <div className='p-4 w-full'>
      {imgPreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img src={imgPreview} alt="Preview" className='size-20 object-cover rounded-lg border border-zinc-700'/>
            <button onClick={removeImage} type='button' className='absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300'>
              <X className='size-3'/>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex flex-1 gap-2'>
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} className='w-full input input-bordered rounded-lg input-sm sm:input-md' placeholder='Type a message...' />
          <input type="file" accept='image/' ref={fileInputRef} onChange={handleImageChange} className='hidden'  />
          <button type='button' onClick={()=>fileInputRef.current?.click()} className={` hidden sm:flex btn btn-circle ${imgPreview?"text-emerald-500" : "text-zinc-400"} `}>
            <Image size={20}/>
          </button>
          <button type='submit' disabled={!text && !imgPreview}>
            <Send size={22}/>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput