import Comment from "@/components/Comment";
import SessionComentForm from "@/components/SessionCommentForm";
import { Suspense } from "react";
import LikesInfo from "@/components/LikesInfo";
import { Bookmark, Comment as CommentModel, Like, Post, Profile } from "@prisma/client";
import Preloader from "./Preloader";
import BookmarkButton from "./BookmarkButton";

export default async function SinglePostContent({
    post,
    authorProfile,
    comments,
    commentsAuthors,
    myLike,
    myBookmark
}:{
    post: Post;
    authorProfile: Profile;
    comments: CommentModel[];
    commentsAuthors: Profile[];
    myLike: Like|null;
    myBookmark: Bookmark|null;
}){
    return(
        <div>
            <div className="grid md:grid-cols-2 gap-4 lg:p-12">
                <div>
                    <img className="rounded-md" src={`/api/image/${post.image}`} alt={post.description}/>
                </div>
                <div>
                    <Comment createdAt={post.createdAt} text={post.description} authorProfile={authorProfile}/>
                    <div className="pt-4 flex flex-col gap-4">
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <Comment createdAt={comment.createdAt} text={comment.text} authorProfile={commentsAuthors.find(a => a.email === comment.author)}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex text-gray-700 items-center justify-between gap-2 py-4 border-t mt-4 border-t-gray-300">
                        <LikesInfo post={post} sessionLike={myLike}/>
                        <div>
                            <BookmarkButton post={post} sessionBookmark={myBookmark}/>
                        </div>
                    </div>
                    <div className="pt-8 border-t">
                        <Suspense fallback={<Preloader/>}>
                            <SessionComentForm postId={post.id}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}