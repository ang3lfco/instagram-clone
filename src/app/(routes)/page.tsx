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
        <div className=" w-full h-[600px] lg:px-40 flex lg:justify-between justify-center items-center ">
          <div className="hidden lg:block">
            <img className="w-[500px] h-[500px]" src="https://peach-gentle-xerinae-369.mypinata.cloud/ipfs/bafybeid6gqyracaitdzuwfeo3tgajnf2yabwkptnpz47jorvnj5y663uti" alt="" />
          </div>
          <div className=" flex flex-col items-center">
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
              Dont have an account?{" "}
              <a href="/register" className="text-blue-600">Sign up</a>
            </p>
            <p className="text-sm w-80 mt-10 text-justify">
              ⚠ Test app for educational purposes. The information you provide is your own responsibility.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
