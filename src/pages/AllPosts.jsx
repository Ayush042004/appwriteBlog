import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
useEffect(()=>{
    const fetchPosts = async () => {
        try {
            const res = await appwriteService.getPosts([]);
            if(res){
                setPosts(res.documents);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    fetchPosts();
},[]);

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex  flex-wrap'>
                {posts.map((post) => (
                      <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                       </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts