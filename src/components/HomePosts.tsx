import { prisma } from "@/db";
import { Follower, Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import LikesInfo from "./LikesInfo";
import { getSessionEmailOrThrow } from "@/actions";
import { Bookmark, BookMarked } from "lucide-react";
import Link from "next/link";

export default async function HomePosts({follows, profiles}:{follows:Follower[], profiles:Profile[]}){
    const posts = await prisma.post.findMany({
        where:{
            author: {in: profiles.map(p => p.email)},
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 100,
    });
    const likes = await prisma.like.findMany({
        where: {
            author: await getSessionEmailOrThrow(),
            postId: {in: posts.map(p => p.id)},
        },
    });
    return(
        <div className="max-w-md mx-auto flex flex-col gap-12">
            {posts.map(post => {
                const profile = profiles.find(p => p.email === post.author);
                return (
                    <div key={post.id} className="">
                        <Link href={`/posts/${post.id}`}>
                            <img className="block rounded-lg shadow-md shadow-black/50" src={post.image} alt=""/>
                        </Link>
                        <div className="flex mt-4 items-center gap-2 justify-between">
                            <div className="flex gap-2 items-center">
                                <Avatar radius="full" src={profile?.avatar || ''} size="4" fallback="avatar"/>
                                <Link className="font-bold" href={`/users/${profile?.username}`}>{profile?.name}</Link>
                            </div>
                            <div className="flex gap-2 items-center">
                                <LikesInfo post={post} showText={false} sessionLike={likes.find(like => like.postId === post.id) || null}/>
                                <button>
                                    <Bookmark/>
                                </button>
                            </div>
                        </div>
                        <p className="mt-2 text-slate-600">
                            {post.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}