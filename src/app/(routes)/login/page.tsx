'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if(!res?.error){
      router.push("/");
    }
    else{
      alert("Invalid credentials")
    }
  };

  return(
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded p-2"/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded p-2"/>
        <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}