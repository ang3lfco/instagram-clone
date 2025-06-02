'use client';
import { TextArea } from "@radix-ui/themes";
import { postComment } from "@/actions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function FastComment({postId}:{postId:string}){
    const router = useRouter();
    const areaRef = useRef<HTMLTextAreaElement>(null);
    return(
        <form action={async data => {
            if(areaRef.current){
                areaRef.current.value = '';
            }
            await postComment(data);
            router.refresh();
        }}>
            <input type="hidden" name="postId" value={postId}/>
            <div className="">
                <TextArea className="!rounded-none *:!pl-0 !min-h-[2rem] !max-h-[2rem] !shadow-none !outline-none" ref={areaRef} name="text" placeholder="Add comment..."/>
            </div>
        </form>
    );
}