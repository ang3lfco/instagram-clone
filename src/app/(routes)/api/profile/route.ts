import { auth } from "@/auth";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await auth();
    if(!session?.user?.email){
        return NextResponse.json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    const profile = await prisma.profile.findFirst({
        where: {
            email: session.user.email
        }
    });
    if(!profile){
        return NextResponse.json({
            error: "Profile not found"
        }, {
            status: 401
        });
    }
    return NextResponse.json(profile);
}