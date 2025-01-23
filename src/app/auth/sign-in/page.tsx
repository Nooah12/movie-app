
import { signInAction} from "@/app/auth/sign-in/actions";
import { FormMessage, Message } from "@/components/form-message"
import { SubmitButton } from "@/components/buttons/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function SignIn(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex-grow">
      <form className="flex flex-col min-w-64 max-w-64 md:max-w-sm mx-auto mt-8 p-4 bg-[#0d1b35] rounded-lg">
        <h1 className="text-2xl font-medium mb-4">Sign in</h1>
        <p className="text-sm text text-white">
          Dont have an account?</p>
          <Link className="font-medium underline text-green-300" href="/auth/sign-up">
            Sign up
          </Link>

        {searchParams && "message" in searchParams && (
          <FormMessage message={searchParams} />
        )}
        
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" className="text-black" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            className="text-black"
          />
          <SubmitButton formAction={signInAction} pendingText="Signing up...">
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}