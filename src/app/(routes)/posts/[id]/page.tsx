import Avatar from "@/components/Avatar";
import Comment from "@/components/Comment";
import SessionComentForm from "@/components/SessionCommentForm";
import { prisma } from "@/db";
import { Suspense } from "react";
import {uniq} from 'lodash';

export default async function SinglePostPage({params}:{params:{id:string}}){
    const post = await prisma.post.findFirstOrThrow({where:{id:params.id}});
    const authorProfile = await prisma.profile.findFirstOrThrow({where:{email:post.author}});
    const comments = await prisma.comment.findMany({where:{postId:post.id}});
    const commentsAuthors = await prisma.profile.findMany({where:{email:{in: uniq(comments.map(c => c.author))}}})
    return(
        <div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <img className="rounded-md" src={post.image} alt={post.description}/>
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
                    <div className="pt-8 border-t mt-8">
                        <Suspense>
                            <SessionComentForm postId={post.id}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}