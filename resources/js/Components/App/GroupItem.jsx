import React from 'react'
import GroupAvatar from './GroupAvatar'
import { Link } from '@inertiajs/react';

const GroupItem = ({ group }) => {
    return (
        <div className="card w-[455px]  bg-base-100 shadow-xl">
            <figure class="m-4"><GroupAvatar size={32} iconSize={12} /></figure> {/* Define o tamanho do avatar aqui */}
            <div className="card-body">
                <h2 className="card-title">{group.name}</h2>
                <p>{group.description ? group.description : "No Description"}</p>
                <div className="card-actions justify-end">
                   <Link   href={
       route("chat.group", group)
       
      }><button className="btn btn-primary">Conversar</button></Link> 
                </div>
            </div>
        </div>
    );
}

export default GroupItem;