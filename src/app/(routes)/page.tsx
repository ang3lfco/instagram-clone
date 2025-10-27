import {auth, signIn} from "@/auth";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { Suspense } from "react";
import LoginPage from "./login/page";

export default async function Home(){
  const session = await auth();
  return (
    <div className="">
      {session && (
        <Suspense fallback={<Preloader/>}>
          <UserHome session={session}/>
        </Suspense>
      )}
      {!session && (
        <div className="flex flex-col items-center mt-16">
          <LoginPage/>
          <hr className="w-80 my-6 border-t border-gray-300"/>
          <form action={async () => {
            'use server';
            await signIn('google');
          }}>
            <button className="w-80 flex items-center justify-center gap-2 border px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100" type="submit">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"/>
              Login with google
            </button>
          </form>
          <p className="mt-8">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600">Sign up</a>
          </p>
        </div>
      )}
    </div>
  );
}
