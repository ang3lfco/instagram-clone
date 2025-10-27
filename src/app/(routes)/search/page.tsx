import { auth } from "@/auth";
import Preloader from "@/components/Preloader";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default async function SearchPage({
    searchParams,
}:{
    searchParams: Promise<{ query?: string }>;
}){
    const session = await auth();
    if(!session?.user?.email){
        return 'not logged in';
    }
    const { query } = await searchParams;
    return(
        <div className="w-full">
            <div className="max-w-md mx-auto">
                <SearchForm/>
                {query?.trim() && (
                    <Suspense fallback={<Preloader/>}>
                        <SearchResults query={query}/>
                    </Suspense>
                )}
            </div>
        </div>
    );
}