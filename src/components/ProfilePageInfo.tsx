import { Follower, Profile } from "@prisma/client";
import { Check, ChevronLeft, Settings} from "lucide-react";
import Link from "next/link"
import FollowButton from "./FollowButton";
import { prisma } from "@/db";


export default async function ProfilePageInfo({
    profile,
    isOurProfile,
    ourFollow
}:{
    profile:Profile;
    isOurProfile:boolean;
    ourFollow:Follower|null;
}){
    const following = await prisma.follower.count({
        where: {
            followingProfileId: {equals: profile.id},
        }
    });
    const followers = await prisma.follower.count({
        where: {
            followedProfileId: {equals: profile.id},
        }
    });
    return(
        <div>
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
                <div>
                    {isOurProfile && (
                        <Link href='/settings'>
                            <Settings/>
                        </Link>
                    )}
                </div>
            </section>
            <section className="mt-8 flex justify-center">
                <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
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
                <div className="flex justify-center items-center gap-4 p-2 border-b border-b-gray-200 pb-4">
                    <p><span className="font-bold">{following}</span> <span className="text-gray-500">following</span></p>
                    <p><span className="font-bold">{followers}</span> <span className="text-gray-500">followers</span></p>
                </div>
            </section>
            {!isOurProfile && (
                <section className="flex justify-center my-5">
                    <FollowButton ourFollow={ourFollow} profileIdToFollow={profile.id}/>
                </section>
            )}
        </div>
    );
}