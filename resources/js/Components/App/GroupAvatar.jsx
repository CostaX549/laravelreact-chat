import React from 'react';
import { UsersIcon } from "@heroicons/react/24/solid";

const GroupAvatar = ({ size = 8, iconSize = 4 }) => {
    return (
        <div className={`avatar placeholder`}>
            <div className={`bg-gray-400 text-gray-800 rounded-full w-${size} flex items-center justify-center`}>
                <span className="text-xl">
                    <UsersIcon className={`w-${iconSize}`} />
                </span>
            </div>
        </div>
    );
}

export default GroupAvatar;
