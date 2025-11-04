'use client';
import { postEntry } from "@/actions";
import { Button, TextArea } from "@radix-ui/themes";
import { CloudUpload, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreatePage(){
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState<File|null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(file){
            setIsUploading(true);
            const data = new FormData();
            data.set("file", file);
            fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then((response) => response.json()).then(({cid}) => {setImageUrl(cid), setIsUploading(false);}).catch((err) => console.error("Upload failed.", err));
            
            // .then(response => {
            //     response.json().then(url => {
            //         setImageUrl(url);
            //         setIsUploading(false);
            //     });
            // });
        }
    }, [file]);
    useEffect(() => {
        fetch("/api/profile")
        .then(res => res.json())
        .then(data => {
            if(!data.error){
                // console.log("username: " + data.username);
                setUsername(data.username);
                setProfilePic(data.avatar);
                setIsLoggedIn(true);
            }
        })
    }, []);
    return(
        <div className="flex items-center justify-center min-h-screen">
            <form className="w-full max-w-md p-3" action={async data => {
                const id = await postEntry(data);
                router.replace(`/posts/${id}`);
                router.refresh();
            }}>
                <input type="hidden" name="image" value={imageUrl}/>
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="min-h-64 p-2 bg-gray-200 rounded-md relative">
                            {imageUrl && (
                                <img src={`/api/image/${imageUrl}`} className="rounded-md" alt=""/>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <input onChange={ev => setFile(ev.target.files?.[0] || null)} className="hidden" type="file" ref={fileInRef} disabled={!isLoggedIn}/>
                                <Button className="!cursor-pointer" disabled={isUploading || !isLoggedIn} onClick={() => fileInRef?.current?.click()} type="button" variant="surface">
                                    {!isUploading && (
                                        <CloudUpload size={16}/>
                                    )}
                                    {isUploading ? 'Uploading...' : 'Choose image'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 justify-center border border-gray-100 p-4">
                    <div className="flex items-center mb-4">
                        {profilePic && (
                            <img src={profilePic ? `/api/image/${profilePic}` : '/default-avatar.png'} alt="" className="w-10 rounded-full mr-2" />
                        )}
                        <div className="">{username}</div>
                        
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <TextArea name="description" className="h-16" placeholder="Add post description..."/>
                    </div>
                    <Button className="!cursor-pointer">
                        <Send size={16}/>
                        Publish
                    </Button>
                </div>
            </form>
        </div>
    );
}