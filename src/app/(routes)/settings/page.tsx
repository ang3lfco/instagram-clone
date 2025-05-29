import { auth, signOut } from "@/auth";
import SettingsForm from "@/components/SettingsForm";
import { prisma } from "@/db";
import { Button } from "@radix-ui/themes";

export default async function SettingsPage(){
    const session = await auth();
    if(!session?.user?.email){
        return 'not logged in';
    }
    const profile = await prisma.profile.findFirst({
        where: {email: session.user.email},
    });
    return(
        <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Profile settings
            </h1>
            {/* <p className="text-gray-500 text-xs text-center -mt-4">
                {session.user.email}
            </p> */}
            <SettingsForm profile={profile} />
            <div className="flex justify-center mt-2 pt-2 border-t border-gray-200">
                <form action={async () => {
                    'use server';
                    await signOut();
                }}>
                    <Button type="submit" variant="outline">Log out</Button>
                </form>
            </div>
        </div>
    );
}