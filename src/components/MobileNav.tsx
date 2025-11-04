import Link from "next/link";
import { Camera, Home, LayoutGrid, Search, User } from "lucide-react";

export default function MobileNav(){
    return(
        <div className="block lg:hidden fixed bottom-0 left-0 right-0">
            <div className="flex *:flex *:items-center">
              <div className="pl-2 bg-white rounded-t-xl w-full relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
                <Link href="/" className="">
                  <Home/>
                </Link>
                <Link href="/search" className="">
                  <Search/>
                </Link>
              </div>
              <div className="size-14 relative -top-4 justify-center w-[125px]">
                <div className="absolute bg-blue-500 bg-clip-text border-white border-t-transparent border-l-transparent border-[50px] rounded-full rotate-45">
                  <div className="border-4 size-15 border-transparent">
                    <Link href="/create" className="-rotate-45 bg-gradient-to-tr from-ig-lightblue to-ig-blue size-12 flex items-center justify-center text-white rounded-full ">
                      <Camera/>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pr-2 bg-white rounded-t-xl w-full relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
                <Link href="/browse" className="">
                  <LayoutGrid/>
                </Link>
                <Link href="/profile" className="text-ig-blue ">
                  <User/>
                </Link>
              </div>
            </div>
          </div>
    );
}