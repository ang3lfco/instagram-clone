import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import ProfilePosts from "@/components/ProfilePosts";
import { prisma } from "@/db";

import { Check, ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage(){
    const session = await auth();
    if(!session?.user?.email){
        return 'not logged in';
    }
    const profile = await prisma.profile.findFirstOrThrow({where:{email:session?.user?.email as string}});
    return(
        <main>
            <section className="flex justify-between items-center">
                <button>
                    <ChevronLeft/>
                </button>
                <button className="font-bold flex items-center gap-2">
                    {profile.username}
                    <div className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
                        <Check size={16}/>
                    </div>
                </button>
                <Link href='/settings'>
                    <Settings/>
                </Link>
            </section>
            <section className="mt-8 flex justify-center">
                <div className="size-48 p-2 rounded-full bg-gradient-to-tr">
                    <div className="size-44 p-2 bg-white rounded-full">
                        <div className="size-40 aspect-square overflow-hidden rounded-full ">
                            <img className="" src={profile.avatar || ''} alt=""/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-center mt-4">
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <p className="text-gray-500 mt-1 mb-1">{profile.subtitle}</p>
                <p>
                    {profile.bio}
                </p>
            </section>
            <section className="mt-4">
                <ProfilePosts email={profile.email}/>
            </section>
        </main>
    );
}