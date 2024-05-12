import { PaperClipIcon, ArrowDownTrayIcon, PlayCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helpers";
import { useState, useEffect } from "react";
import { useEventBus } from "@/EventBus";

const MessageAttachments = ({ attachments, attachmentClick, justify = "end", editing = false }) => {
  const [attachmentsList, setAttachmentsList] = useState(attachments);
  const { on } = useEventBus();


  useEffect(() => {
    on('attachments', (data) => {
   
        setAttachmentsList(data.attachments)
    });
}, [on]);

  const handleDeleteAttachment = (attachmentId) => {
 

  
      axios.delete(route("tarefa.attachment.delete", attachmentId))
      .then((res) => {
     
        const updatedAttachments = attachmentsList.filter(attachment => attachment.id !== attachmentId);
        setAttachmentsList(updatedAttachments);
       
         
      })
      .catch((err) => {
          console.error(err)
      })
  
};
    return (
       <>
        {attachmentsList.length > 0 && (
            <div className={`mt-2 flex flex-wrap justify-${justify} gap-1`}>
            {attachmentsList.map((attachment, ind) => (
            
              <div
              
              key={attachment.id}
              className={`group flex flex-col items-center justify-center text-gray-500 relative cursor-pointer `
              + (isAudio(attachment) ? "w-84" : "w-32 aspect-square bg-blue-100")
            }
              >
                  {editing && (
                <XCircleIcon   onClick={() => handleDeleteAttachment(attachment.id)}    className="z-10 opacity-100 group-hover:opacity-100 transition-all w-8 h-8 flex items-center justify-center text-gray-100  absolute right-[-10px] top-[-20px] cursor-pointer" />
            )}
            <div onClick={(ev) => attachmentClick(attachments, ind)}>
                {!editing && (

              <>
                 {!isAudio(attachment) && (
                    <a
                    onClick={(ev) => ev.stopPropagation()}
                    download
                    href={attachment.url}
                    className="z-20 opacity-100 group-hover:opacity-100 transition-all w-8 h-8 flex items-center justify-center text-gray-100 bg-gray-700 rounded absolute right-0 top-0 cursor-pointer hover:bg-gray-800"
                    >
                     <ArrowDownTrayIcon className="w-4 h-4" />
                    </a>
                 )}  
                 </>  
                )}
                {isImage(attachment) && (
                    <img 
                    src={attachment.url} 
                    className="object-contain aspect-square"
                    />
                )}
                {isVideo(attachment) && (
                 <div className="relative flex justify-center items-center">
                   <PlayCircleIcon className="z-20 absolute w-16 h-16 text-white opacity-70" /> 
                   <div className="absolute left-0 top-0 w-full h-full bg-black/50 z-10">
                   </div>  
                    <video src={attachment.url}></video>
                   
                </div>
                )}
                {isAudio(attachment) && (
                <div className="relative flex justify-center items-center">
                  <audio
                  src={attachment.url}
                  controls
                  >
                    </audio>        
                </div>
                )}
                {isPDF(attachment) && (
                <div className="relative flex justify-center items-center">
                  <div className="absolute left-0 top-0 right-0 bottom-0"></div>
                  <iframe src={attachment.url} className="w-full h-full"></iframe>
                </div>
                )}
                {!isPreviewable(attachment) && (
                <a
                onClick={(ev) => ev.stopPropagation()}
                download
                href={attachment.url}
                className="flex flex-col justify-center items-center"
                >
                  <PaperClipIcon className="w-10 h-10 mb-3" />

                  <small className="text-center truncate max-w-[100px]">{attachment.name}</small>
                </a>
                )}
              </div>
              </div>
              
             ))} 
            </div>
         )}
       </>
    )
}

export default MessageAttachments