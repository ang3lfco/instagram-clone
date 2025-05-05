import { auth } from "@/auth";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export default async function ProfilePage(){
    const session = await auth();
    if(!session?.user?.email){
        return 'not logged in';
    }
    const profile = await prisma.profile.findFirst({where:{email:session?.user?.email as string}});
    if(!profile){
        return redirect('/settings');
    }
    return(
        <ProfilePageContent profile={profile} isOurProfile={true}/>
    );
}