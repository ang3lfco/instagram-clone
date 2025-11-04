import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const groupId = process.env.PINATA_GROUP_ID;
    const { cid } = await pinata.upload.private.file(file, {groupId});
    // const url = await pinata.gateways.private.createAccessLink({
    //   cid: cid,
    //   expires: 30
    // });
    
    return NextResponse.json({cid}, {status: 200});
  } 
  catch(e){
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );  
  }
}