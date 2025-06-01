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
        <div className="max-w-sm mx-auto mt-3">
            <h1 className="text-xl font-bold mb-4 ">
                Profile settings
            </h1>
            <SettingsForm profile={profile} />
            <div className="flex justify-center mt-2 pt-2 border-t border-gray-200">
                <form action={async () => {
                    'use server';
                    await signOut();
                }}>
                    <Button className="!cursor-pointer" type="submit" variant="outline">Log out</Button>
                </form>
            </div>
        </div>
    );
}