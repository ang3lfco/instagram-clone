import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";

export const dynamic = 'force-dynamic';

export default async function BrowsePage(){
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        take: 100,
    });
    return(
        <div className="">
            <div className="p-8">
                <PostsGrid posts={posts}/>
            </div>
        </div>
    );
}