import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Image from "next/image";


export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

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
  <div className="mb-32">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={200}
          height={200}
        />
     
      </div>
    
    
    <div className="mx-auto flex-grow w-full flex-col justify-center text-white xl:w-1/2">
      
    
      <div>
        <p className="text-2xl">Login</p>
        <p>please login to continue </p>
      </div>
      <div className="my-6">
        <button className="flex w-full justify-center rounded-3xl border-none bg-white p-1 text-black hover:bg-gray-200 sm:p-2"><img src="https://freesvg.org/img/1534129544.png" className="mr-2 w-6 object-fill" />Sign in with Google</button>
      </div>
      <div>
        <fieldset className="border-t border-solid border-gray-600">
          <legend className="mx-auto px-2 text-center text-sm">Or login via our secure system</legend>
        </fieldset>
      </div>
      <div className="mt-10">
        <form>
          <div>
            <label className="mb-2.5 block font-extrabold" htmlFor="email">Email</label>
            <input type="email" id="email" className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30" placeholder="mail@user.com" />
          </div>
          <div className="mt-4">
            <label className="mb-2.5 block font-extrabold" htmlFor="email">Password</label>
            <input type="password" id="email" className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
          </div>
          <div className="mt-4 flex w-full flex-col justify-between sm:flex-row">
           
            <div><input type="checkbox" id="remember" /><label htmlFor="remember" className="mx-2 text-sm">Remember me</label></div>
           
            <div>
              <a href="#" className="text-sm hover:text-gray-200">Forgot password</a>
            </div>
          </div>
          <div className="my-10">
            <button formAction={signIn} className="w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800">Login</button>
          </div>
          <div className="sign-up">
            <p className="text-center">Don&apos;t have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up
              
            </a>
            
            </p>
            </div>
        </form>
      </div>
    </div>
  </div>
  
  </div>
  );
}
