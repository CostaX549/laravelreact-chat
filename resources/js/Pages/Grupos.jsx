

import GroupItem from '@/Components/App/GroupItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


 function Grupos({ groups }) {
  
   

    return (
     
<div className="overflow-auto">
 
        {groups.data.length > 0 && (
         <>
           <div className="flex  flex-wrap gap-4 m-5 mr-2">
                {groups.data.map((group) => (
                   
                   <GroupItem group={group} />
                  
                   
                ))}
                 </div>
         </>
        )}

</div>



      
    );
}

Grupos.layout = (page) => {
    return (
        
        <AuthenticatedLayout
        user={page.props.auth.user}
    
        
        >
            {page}
        </AuthenticatedLayout>
        
    )
}

export default Grupos;