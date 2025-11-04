import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";

import Link from "next/link";
import PostsGrid from "./PostsGrid";

export default async function SearchResults({query}: {query:string}){
    const profiles = await prisma.profile.findMany({
        where: {
            OR: [
                {username:{contains: query, mode: 'insensitive'},},
                {name:{contains: query, mode: 'insensitive'},},
            ]
        },
        take: 10,
    });
    const posts = await prisma.post.findMany({
        where: {
            description: {contains: query, mode: 'insensitive'},
        },
        take: 100,
    })
    return(
        <div>
            {profiles?.length > 0 ? (
                <div className="grid mt-4 sm:grid-cols-1 gap-2">
                    <h1 className="text-sm mt-4">
                        Profiles found: 
                    </h1>
                    {profiles.map(profile => (
                        <Link key={profile.id} href={`/users/${profile.username}`} className="flex items-center gap-2 hover:bg-gray-100 transition p-2 rounded-lg">
                            <div>
                                <Avatar size="5" radius="full" fallback="user avatar" src={profile.avatar ? `/api/image/${profile.avatar}` : '/default-avatar.png'}/>
                            </div>
                            <div>
                                <h3 className="font-bold">{profile.name}</h3>
                                <h4 className="text-gray-600 text-sm">@{profile.username}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <h1 className="text-sm mt-4">
                    No profiles found.
                </h1>
            )}
            {posts.length > 0 ? (
                <div className="mt-4">
                    <h1 className="text-sm mt-4">
                        Posts found: 
                    </h1>
                    <PostsGrid posts={posts}/>
                </div>
            ) : (
                <h1 className="text-sm mt-4">
                    No posts found.
                </h1>
            )}
        </div>
    );
}