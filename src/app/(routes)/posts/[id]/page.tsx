import { getSinglePostData } from "@/actions";
import SinglePostContent from "@/components/SinglePostContent";

export default async function SinglePostPage({params}:{params: Promise<{id:string}>}){
    const { id } = await params;
    const {post, authorProfile, comments, commentsAuthors, myLike, myBookmark} = await getSinglePostData(id);
    return <SinglePostContent post={post} authorProfile={authorProfile} comments={comments} commentsAuthors={commentsAuthors} myLike={myLike} myBookmark={myBookmark}/>
}