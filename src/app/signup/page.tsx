import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default function SignUp({
    searchParams,
  }: {
    searchParams: { message: string };
  }) {
   
  
    const signUp = async (formData: FormData) => {
      "use server";

      
      const origin = headers().get("origin");
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
    
      const supabase = createClient();
  
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });
  
      if (error) {
        return redirect("/login?message=Could not authenticate user");
      }
  
      return redirect("/login?message=Check email to continue sign in process");
    };
  
    return (
  
  <div className="relative flex h-full w-full bg-[url(../../public/assets/loginAndSignUp.jpg)] bg-cover">
    <div className="h-screen w-1/3 bg-black bg-opacity-60 backdrop-blur-md">
      <div className="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
        <div className="mt-10">
          <form>
           
            <div className="mt-4">
              <label className="mb-2.5 block font-extrabold" htmlFor="email">Email</label>
              <input type="name" name="email" className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30" placeholder="mail@user.com" required/>
            </div>
            <div className="mt-4">
              <label className="mb-2.5 block font-extrabold" htmlFor="password">Password</label>
              <input type="password" name="password" className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" required/>
            </div>
            
            <div className="my-10">
              <button formAction={signUp} className="w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800">Sign Up</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
    
    </div>
    );
  }
  