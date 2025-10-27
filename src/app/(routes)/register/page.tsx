'use client';
import { useState } from "react";
import { registerUser } from "@/actions";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-6">Create new account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded p-2"/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded p-2"/>
        <button type="submit" className="bg-green-600 text-white rounded p-2 hover:bg-green-700">Create account</button>
      </form>
    </div>
  );
}