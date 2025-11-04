import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config";
import { auth } from "@/auth";

export async function GET(
    request: NextRequest,
    context: {params: Promise<{cid: string}>}
)
{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        
        const {cid} = await context.params;
        const accessLink = await pinata.gateways.private.createAccessLink({
            cid,
            expires: 60,
        });
        const response = await fetch(accessLink);
        if(!response.ok) throw new Error("The file could not be downloaded");
        
        const buffer = await response.arrayBuffer();
        return new NextResponse(buffer, {
            headers: {
                "Content-Type": response.headers.get("content-type") || "image/jpeg",
                "Cache-Control": "public, max-age: 31536000, immutable",
            },
        });
    }
    catch(e){
        console.error("Error: /api/image/[cid]:", e);
        return NextResponse.json({error: "File not found"}, {status: 404});
    }
}