import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import { Check } from "lucide-react";
import Link from "next/link";

export default async function SuggestedPeople(){
    const users = await prisma.profile.findMany({
        orderBy: {id: "desc"},
        take: 5,
    });

    return(
        <div>
            <h1 className="text-sm text-gray-400 mb-4">Suggested people...</h1>
            {users.map((user) => (
                <Link key={user.email} href={`/users/${user.username}`} className="flex items-center gap-2 hover:bg-gray-100 transition p-2 rounded-lg">
                    <div>
                        <Avatar size="5" radius="full" fallback="user avatar" src={user.avatar ? `/api/image/${user.avatar}` : '/default-avatar.png'}/>
                    </div>
                    <div className="flex flex-col ml-2 w-full">
                        <h3 className="font-bold">{user.name || "Unknown name"}</h3>
                        <h4 className="text-gray-600 text-sm">@{user.username}</h4>
                    </div>
                </Link>
            ))}
        </div>
    );
}