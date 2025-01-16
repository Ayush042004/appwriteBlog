import React from "react";
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

//$id appwrite ka code ha 
function PostCard({$id, title, featuredImage}) {
    const preview = featuredImage ? appwriteService.getFilePreview(featuredImage): "/default.jpg"
    //console.log("Featured Image:", featuredImage);
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shasow-2xl hover:bg-slate-500">
                <div className="w-full justify-center mb-4">
                   <img src={preview} alt={title}
                   className="rounded-lg object-cover w-full h-40  sm:h-48 md:h-56 lg:h-64"/>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate text-center">{title}</h2>
            </div>
        </Link>
    )
}
export default PostCard
