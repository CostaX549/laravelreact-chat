

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


 function Grupos({ groups }) {
  
   

    return (
     
<>
 
        {groups.length > 0 && (
            <div className="flex-1 flex flex-col">
                <div ref={loadMoreIntersect}></div>
                {groups.map((message) => (
                   <MessageItem
                    key={message.id}
                    message={message}
                    attachmentClick={onAttachmentClick}
                   />
                ))}
            </div>
        )}

    </>



      
    );
}

Groups.layout = (page) => {
    return (
        
        <AuthenticatedLayout
        user={page.props.auth.user}
    
        
        >
            {children}
        </AuthenticatedLayout>
        
    )
}

export default Home;