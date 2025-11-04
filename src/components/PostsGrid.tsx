'use client'
import { Post } from '@prisma/client';
import Link from 'next/link';

export default function PostsGrid({posts}:{posts:Post[]}){
    console.log(posts);
    return(
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-[2px]">
                {posts.map((post) => (
                    <Link href={`/posts/${post.id}`} key={post.id} className="block w-full">
                        <img src={`/api/image/${post.image}`} alt="" className="w-full aspect-square object-cover"/>
                    </Link>
                ))}
            </div>
        </div>
    );
}