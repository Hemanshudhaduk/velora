"use client";
import { CustomerLogin } from "@/src/api/user";
import SignInTemplate from "@/src/components/templates/SignInTemplate";

const SignIn = () => {
  const apiCalling = async formData => {
    return await CustomerLogin(formData);
  };
  return <SignInTemplate apiCalling={apiCalling} />;
};

export default SignIn;
