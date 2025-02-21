"use client";
import { useActionState } from "react";
import { googleAuth } from "../action/google-login";
import { Button } from "@/components/ui/button";
import { BsGoogle } from "react-icons/bs";

const GoogleLogin = () => {
  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    googleAuth,
    undefined
  );
  return (
    <form className="flex mt-4" action={dispatchGoogle}>
      <Button
        variant={"outline"}
        className="flex flex-row items-center gap-3 w-full"
      >
        <BsGoogle className="h-6 w-6" />
        <span>Sign in with Google</span>
      </Button>
      <p>{errorMsgGoogle}</p>
    </form>
  );
};

export default GoogleLogin;
