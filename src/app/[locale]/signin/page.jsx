"use client";
import { signIn } from "@/src/utils";
import { useEffect } from "react";
import FuseSplashScreen from "../auth/fuseSplashScreen";

const SignIn = () => {
    useEffect(() => {
        signIn(localStorage.getItem("redirectURL"))
    }, [])

    return (
        <div><FuseSplashScreen /></div>
    )
}
export default SignIn;
