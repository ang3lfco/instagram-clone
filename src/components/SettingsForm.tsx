'use client';
import { CloudUpload } from "lucide-react";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { updateProfile } from "@/actions";
import { useRouter } from "next/navigation";
import { Profile } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({profile}:{profile?: Profile | null}){
    const router = useRouter();
    const fileInRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File|null>(null);
    const [avatar, setAvatar] = useState(profile?.avatar || null);
    useEffect(() => {
        if(file){
            const data = new FormData();
            data.set("file", file);
            fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then((response) => response.json()).then(({cid}) => {setAvatar(cid);}).catch((err) => console.error("Upload failed.", err));
        }
    }, [file]);
    return(
        <form
            onSubmit={(e) => {
                const form = e.currentTarget;
                const username = form.username.value;
                const regex = /^[a-zA-Z0-9]+$/;

                if(!regex.test(username)){
                    e.preventDefault();
                    alert("Invalid username format: Only letters and numbers are allowed");
                    return;
                }
            }}
            action={async (data:FormData) => {
                try{
                    await updateProfile(data);
                    router.push('/profile');
                    router.refresh();
                }
                catch(err: any){
                    alert(err.message);
                }
            }}
        >
            <input type="hidden" name="avatar" value={avatar || ''}/>
            <div className="flex flex-col items-center">
                <div>
                    <div className="bg-gray-400 size-24 rounded-full aspect-square overflow-hidden shadow-md shadow-gray-400">
                        <img className="size-24" src={avatar ? `/api/image/${avatar}` : '/default-avatar.png'} alt=""/>
                    </div>
                </div>
                <div className="mt-2">
                    <input type="file" ref={fileInRef} className="hidden" onChange={ev => setFile(ev.target.files?.[0] || null)}/>
                    <Button className="!cursor-pointer" type="button" variant="soft" onClick={() => fileInRef.current?.click()}>
                        <CloudUpload/>
                        change avatar
                    </Button>
                </div>
            </div>
            <p className="mt-2 font-bold">username</p>
            <TextField.Root 
                name="username" 
                defaultValue={profile?.username || ''} 
                placeholder="your_username"
                onKeyDown={(e) => {
                    const allowedFormat = /^[a-zA-Z0-9]$/;
                    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                    if (allowedKeys.includes(e.key)) return;
                    if(!allowedFormat.test(e.key)){
                        e.preventDefault();
                    }
                }}
                onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                }}
            />
            
            <p className="mt-2 font-bold">name</p>
            <TextField.Root 
                name="name" 
                defaultValue={profile?.name || ''} 
                placeholder="John Doe"
                onKeyDown={(e) => {
                    const allowedFormat = /^[a-zA-Z ]$/;
                    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                    if (allowedKeys.includes(e.key)) return;
                    if(!allowedFormat.test(e.key)){
                        e.preventDefault();
                    }
                }}
                onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
                }}
            />
            
            <p className="mt-2 font-bold">subtitle</p>
            <TextField.Root name="subtitle" defaultValue={profile?.subtitle || ''} placeholder="Graphic designer"/>
            
            <p className="mt-2 font-bold">bio</p>
            <TextArea name="bio" defaultValue={profile?.bio || ''}/>
            
            <div className="mt-4 flex justify-center">
                <Button variant="solid" className="!cursor-pointer">Save settings</Button>
            </div>
        </form>
    );
}