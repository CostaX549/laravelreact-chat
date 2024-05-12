
import ChatLayout from '@/Layouts/ChatLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect,  useState } from 'react';

import ConversationHeader from '@/Components/App/ConversationHeader';
import {  BookmarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import EnviarTarefa from '@/Components/App/EnviarTarefa';
import PrimaryButton from '@/Components/PrimaryButton';
import TarefaModal from '@/Components/App/TarefaModal';
import AttachmentPreviewModal from '@/Components/App/AttachmentPreviewModal';
import EditarTarefa from '@/Components/App/EditarTarefa';



 function GroupTarefas({ selectedConversation = null, tarefas, tarefa = null   }) {
  
    const [localTarefas, setLocalTarefas] = useState([])
   const [showTarefaModal, setShowNewTarefaModal] = useState(false)
   const [showAttachmentPreview, setShowAttachmentPreview] = useState(false)
   const [previewAttachment, setPreviewAttachment] = useState({})
   const  authUser = usePage().props.auth.user;


  



    useEffect(() => {
        setLocalTarefas(tarefas ? tarefas.data.reverse() : [])
    }, [tarefas])

    const onAttachmentClick = (attachments, ind) => {
        setPreviewAttachment({
         attachments,
         ind
        })
        setShowAttachmentPreview(true)
     }


    return (
        <>
        <ConversationHeader 
                        selectedConversation={selectedConversation}
                    />
                   
            {!tarefa && (
                <>
                    
                    <div className="flex-1 overflow-y-auto p-5">
                    <PrimaryButton className="mb-5" onClick={(ev) => setShowNewTarefaModal(true)}>
                    <BookmarkIcon className="h-5 w-5 mr-2" />
                     Adicionar Tarefa
                    </PrimaryButton>
                        {localTarefas.length > 0 && (
                            <>
                                <h1>Tarefas</h1>
                                <div className="flex flex-wrap gap-2 mt-2 items-center ml-5 mr-5">
                                    {localTarefas.map((tarefa) => (
                                    <Link key={tarefa.id} href={route("group.tarefa", {group: tarefa.group_id, tarefa: tarefa.id})} preserveState className="flex w-[500px] flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <BookmarkIcon className="object-cover w-32 rounded-t-lg h-40 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg" />
                                            <div className="flex flex-col justify-between p-4 leading-normal">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tarefa.title}</h5>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{tarefa.description}</p>
                                                <div className="flex items-center mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                    <CalendarIcon className="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400" />
                                                    Data de Ínicio: {tarefa.start_date}
                                                </div>
                                                <div className="flex items-center mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                    <CalendarIcon className="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400" />
                                                    Data de Entrega: {tarefa.end_date}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <TarefaModal show={showTarefaModal} onClose={(ev) => setShowNewTarefaModal(false)} group={selectedConversation} />
                </>
                
            )}
           {tarefa && (
             <div className="overflow-y-auto ">
            {authUser.id === tarefa.data.owner_id ? (
             <EditarTarefa tarefa={tarefa} attachmentClick={onAttachmentClick} />
        ) : (
            <EnviarTarefa tarefa={tarefa} attachmentClick={onAttachmentClick} envio={tarefa.data.enviosUser} />
        )}
            </div>
)}
 {previewAttachment.attachments && (
    <AttachmentPreviewModal 
      attachments={previewAttachment.attachments}
      index={previewAttachment.ind}
      show={showAttachmentPreview}
      onClose={() => setShowAttachmentPreview(false)}
    />
 )}
        </>
    );
}

GroupTarefas.layout = (page) => {
    return (
        
        <AuthenticatedLayout
        user={page.props.auth.user}
    
        
        >
             <ChatLayout children={page} />
        </AuthenticatedLayout>
        
    )
}

export default GroupTarefas;