import Link from "next/link";
import { Home, LayoutGrid, Search, SquarePlus, User } from "lucide-react";

export default function DesktopNav(){
    return(
        <div className="hidden lg:block w-60 sticky top-0 h-screen border-r border-r-gray-300 p-4">
            <div className="">
            <img className="" src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Instagram-500x281.png" alt=""/>
            <div className="ml-1 flex flex-col gap-3 mt-12 *:flex *:gap-3">
                <Link href={'/'} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                <Home/>
                Home
                </Link>
                <Link href={'/search'} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                <Search/>
                Search
                </Link>
                <Link href={'/browse'} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                <LayoutGrid/>
                Explore
                </Link>
                <Link href={'/profile'} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                <User/>
                Profile
                </Link>
                <Link href={'/create'} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                <SquarePlus/>
                Create
                </Link>
            </div>
            </div>
        </div>
    );
}