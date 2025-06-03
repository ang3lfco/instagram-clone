import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";

export default async function BrowsePage(){
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        take: 100,
    });
    console.log(posts);
    return(
        <div className="">
            <div className="p-8">
                <PostsGrid posts={posts}/>
            </div>
        </div>
    );
}