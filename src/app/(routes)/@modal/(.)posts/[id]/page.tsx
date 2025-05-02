
import { getSinglePostData } from "@/actions";
import Modal from "@/components/Modal";
import SinglePostContent from "@/components/SinglePostContent";

export default async function PostInModal({params:{id}}:{params:{id:string}}){
    const {post, authorProfile, comments, commentsAuthors, myLike} = await getSinglePostData(id);
    return(
        <Modal>
            <SinglePostContent post={post} authorProfile={authorProfile} comments={comments} commentsAuthors={commentsAuthors} myLike={myLike}/>
        </Modal>
    );
}