import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function BrowsePage(){
    const session = await auth();
    if(!session?.user?.email){
        redirect('/');
    }
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        take: 100,
    });
    return(
        <div className="">
            <div className="">
                <PostsGrid posts={posts}/>
            </div>
        </div>
    );
}