'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage(){
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
    });
  };

  return(
    <div className=" flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center p-4 ">
        {/* <h1 className="text-2xl font-semibold mb-6">Login</h1> */}
        <img className="" src="https://1000marcas.net/wp-content/uploads/2019/11/Logo-Instagram-500x281.png" width={200} alt=""/>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded p-2"/>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded p-2"/>
          <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  );
}