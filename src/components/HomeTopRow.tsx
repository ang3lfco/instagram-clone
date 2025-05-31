import { Follower, Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function HomeTopRow({follows, profiles}:{follows:Follower[], profiles:Profile[]}){
    return(
        <div className="flex gap-3 max-w-full overflow-auto">
            <div>
                <button className="size-24 bg-gradient-to-tr from-ig-orange to-ig-red text-white rounded-full flex items-center justify-center">
                    <PlusIcon size="42"/>
                </button>
                <p className="text-center text-gray-500 text-sm">Add story</p>
            </div>
            {profiles.map(profile => (
                <div key={profile.id} className="w-24 flex flex-col justify-center items-center">
                    <div>
                        <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
                            <div className="p-0.5 bg-white rounded-full">
                                <Link href={`/users/${profile?.username}`} >
                                    <Avatar size="6" radius="full" fallback={'avatar'} src={profile.avatar || ''}/>
                                </Link>
                            </div>
                        </div>
                        <p className="text-center text-gray-500 text-sm">
                            <Link href={`/users/${profile?.username}`}>
                                {profile.username}
                            </Link>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}