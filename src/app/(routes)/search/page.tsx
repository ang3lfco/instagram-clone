import { auth } from "@/auth";
import Preloader from "@/components/Preloader";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import SuggestedPeople from "@/components/SuggestedPeople";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SearchPage({
    searchParams,
}:{
    searchParams: Promise<{ query?: string }>;
}){
    const session = await auth();
    if(!session?.user?.email){
        redirect('/');
    }
    const { query } = await searchParams;
    return(
        <div className="w-full h-full ">
            <div className="max-w-md mx-auto">
                <SearchForm/>
                {query?.trim() ? (
                    <Suspense fallback={<Preloader/>}>
                        <SearchResults query={query}/>
                    </Suspense>
                ) : (
                    <div className="mt-10 mx-auto max-w-md">
                        <SuggestedPeople/>
                    </div>
                )}
            </div>
        </div>
    );
}