'use client';
import { useState } from "react";
import { registerUser } from "@/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage(){
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try{
      await registerUser(email, password);
      setPassword("");
      alert("user successfully registered");
      router.push("/");
    }
    catch(err: any){
      alert(err.message);
      setPassword("");
    }
  };

  return(
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col items-center justify-center p-4 w-[350px]">
        <img className="" src="https://peach-gentle-xerinae-369.mypinata.cloud/ipfs/bafybeidfokam2ropi4ct34ryclrqrq277qeovj7zt24pwrllzun3xjfsmi" width={200} alt=""/>
        <h1 className="text-md text-justify text-gray-500 font-semibold mb-6">Sign up to see photos from your friends.</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded p-2"/>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded p-2"/>
          <button type="submit" className="bg-ig-blue text-white rounded p-2 hover:bg-blue-500">Create account</button>
        </form>
        <Link href={"/"}>
          <p className="mt-5 cursor-pointer underline ">Go back</p>
        </Link>
      </div>
    </div>
  );
}