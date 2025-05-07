import Link from "next/link";
import { Camera, Home, LayoutGrid, Search, User } from "lucide-react";

export default function DesktopNav(){
    return(
        <div className="hidden lg:block p-4  w-48 shadow-md shadow-gray-400">
            <div className="top-0 sticky">
            <img className="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" alt=""/>
            <div className="ml-1 flex flex-col gap-6 mt-8 *:flex *:gap-2">
                <Link href={'/'}>
                <Home/>
                Home
                </Link>
                <Link href={'/search'}>
                <Search/>
                Search
                </Link>
                <Link href={'/browser'}>
                <LayoutGrid/>
                Browser
                </Link>
                <Link href={'/profile'}>
                <User/>
                Profile
                </Link>
                <Link href={'/create'}>
                <Camera/>
                Create
                </Link>
            </div>
            </div>
        </div>
    );
}