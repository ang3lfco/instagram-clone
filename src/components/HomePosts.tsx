import { prisma } from "@/db";
import { Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import LikesInfo from "./LikesInfo";
import { getSessionEmailOrThrow } from "@/actions";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import FastComment from "./FastComment";

export default async function HomePosts({profiles}:{profiles:Profile[]}){
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

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            author: await getSessionEmailOrThrow(),
            postId: {in: posts.map(p => p.id)},
        },
    });
    const allCommentsOnPosts = await prisma.comment.findMany({
        where: {
            postId: {in: posts.map(p => p.id)},
        }
    });
    return(
        <div className="max-w-md mx-auto flex flex-col gap-12">
            {posts.map(post => {
                const profile = profiles.find(p => p.email === post.author);
                const commentsOnPost = allCommentsOnPosts.filter(c => c.postId === post.id);
                return (
                    <div key={post.id} className="border border-gray-200 p-2 rounded-xl">
                        <div className="flex mt-2 items-center gap-2 justify-between mb-3">
                            <div className="flex gap-2 items-center">
                                <Link href={`/users/${profile?.username}`}>
                                    <Avatar radius="full" src={profile?.avatar || ''} size="4" fallback="avatar"/>
                                </Link>
                                <Link className="font-bold" href={`/users/${profile?.username}`}>{profile?.username}</Link>
                            </div>
                        </div>
                        <Link href={`/posts/${post.id}`}>
                            <img className="block rounded-md border border-gray-300" src={post.image} alt=""/>
                        </Link>
                        <div className="flex mt-4 mb-4 items-center gap-2 justify-between">
                            <div className="flex mt-2">
                                <Link className="font-bold mr-2" href={`/users/${profile?.username}`}>{profile?.username}</Link>
                                <p>{post.description}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <LikesInfo post={post} showText={false} sessionLike={likes.find(like => like.postId === post.id) || null}/>
                                <BookmarkButton post={post} sessionBookmark={bookmarks.find(b => b.postId === post.id) || null}/>
                            </div>
                        </div>
                        <div className="mb-2">
                            <Link href={`/posts/${post.id}`}>
                                {commentsOnPost.length > 0 ? (
                                    <div className="text-sm text-gray-500">
                                        View all {commentsOnPost.length} comments
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-500">
                                        No comments yet
                                    </div>
                                )}
                            </Link>
                        </div>
                        <FastComment postId={post.id}/>
                    </div>
                );
            })}
        </div>
    );
}