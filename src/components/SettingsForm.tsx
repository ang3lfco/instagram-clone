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
            }).then(response => {
                response.json().then(url => {setAvatar(url)});
            });
        }
    }, [file]);
    return(
        <form action={async (data:FormData) => {
            await updateProfile(data);
            router.push('/profile');
            router.refresh();
        }}>
            <input type="hidden" name="avatar" value={avatar || ''}/>
            <div className="flex flex-col items-center">
                <div>
                    <div className="bg-gray-400 size-24 rounded-full aspect-square overflow-hidden shadow-md shadow-gray-400">
                        <img className="size-24" src={avatar || ''} alt=""/>
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
            <TextField.Root name="username" defaultValue={profile?.username || ''} placeholder="your_username"/>
            
            <p className="mt-2 font-bold">name</p>
            <TextField.Root name="name" defaultValue={profile?.name || ''} placeholder="John Doe"/>
            
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