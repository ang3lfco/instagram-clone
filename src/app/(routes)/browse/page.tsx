import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";

export default async function BrowsePage(){
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        take: 100,
    });
    return(
        <div className="">
            <div className="p-8">
                <h1 className="text-4xl font-bold ">Browse</h1>
                <p className="text-gray-500 mb-10">Check trending posts and find inspiration</p>
                <PostsGrid posts={posts}/>
            </div>
        </div>
    );
}