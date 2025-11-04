import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import ProfileNav from "@/components/ProfileNav";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export default async function BookmarkedPage(){
    const session = await auth();
    if(!session?.user?.email){
        return 'not logged in';
    }
    const profile = await prisma.profile.findFirst({where:{email:session?.user?.email as string}});
    if(!profile){
        return redirect('/settings');
    }
    const bookmarks = await prisma.bookmark.findMany({
        where: {
            author: session?.user?.email as string
        }
    });
    const posts = await prisma.post.findMany({
        where: {
            id: {in: bookmarks.map(b => b.postId)}
        }
    });
    return(
        <div>
            <ProfilePageInfo profile={profile} isOurProfile={true} ourFollow={null}/>
            <ProfileNav username={profile.username || ''} isOurProfile={true}/>
            <div className="mt-4">
                {posts.length > 0 ? (
                    <PostsGrid posts={posts} />
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        <p className="text-lg font-medium">No saved posts</p>
                        <p className="text-sm text-gray-400">Save posts to see them here later.</p>
                    </div>
                )}
                
            </div>
        </div>
    );
}