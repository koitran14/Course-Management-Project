"use client"

import { useRef, useState, useEffect } from "react";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/

import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, XOctagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'react-hot-toast';

const RegisterForm = () => {
    const userRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    },[])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user])

    useEffect(() => {
        setValidPwd(pwd.length > 5);
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const router = useRouter();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validName || !validPwd) {
            return;
        }
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user, password: pwd }),
            });

            if (response.status === 200) {
                router.refresh();
                router.push('/login');
                toast.success("Register successfully.")
            } else if (response.status === 409){
                toast.error("Username taken");
                return
            } else {
                toast.error("Fail register.")
                return
            }
        } catch (error) {
            // Handle network errors or other exceptions
            toast.error("There's something wrong");
        } 
    };
    

    return (  
            <section className="flex w-[400px] h-fit flex-col gap-y-3 pt-5 pb-10 px-9 items-center justify-center border-2 border-slate-500/80 rounded-xl">
                <h1 className="text-2xl font-semibold">Register</h1>
                <form className="flex flex-col gap-y-3 w-full h-full"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="username" className="flex flex-row gap-x-2">
                        Username:
                        <span className={`${validName? "block pl-2" : 'hidden'}`}>
                            <Check />
                        </span>
                        <span className={`${validName || !user ? 'hidden' : "block pl-2"}`}>
                            <XOctagon />
                        </span>
                    </label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "block bg-slate-300/50 pr-3 rounded-md pl-1 " : "hidden"}>
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed. <br />
                    </p>
                    
                    <label htmlFor="password" className="flex flex-row gap-x-2">
                        Password:
                        <span className={validPwd ? "block" : 'hidden'}>
                            <Check />
                        </span>
                        <span className={`${validPwd || !pwd ? 'hidden' : "block"}`}>
                            <XOctagon />
                        </span>
                    </label>

                    <Input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "block bg-slate-300/50 pr-3 rounded-md pl-1 " : "hidden"}>
                        Too short. <br />
                    </p>

                    <label htmlFor="password" className="flex flex-row gap-x-2">
                        Confirm password:
                        <span className={validMatch && matchPwd ? "block" : 'hidden'}>
                            <Check />
                        </span>
                        <span className={validMatch || !matchPwd ? 'hidden' : "block"}>
                            <XOctagon />
                        </span>
                    </label>

                    <Input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="pwdnote" className={matchFocus && !validMatch ? "block bg-slate-300/50 pr-3 rounded-md pl-1 " : "hidden"}>
                        Must match the first password input field. <br />
                    </p>

                    <Button 
                        disabled={!validName || !validPwd || !validMatch ? true : false}
                    >
                        Sign Up
                    </Button>
                </form>
                <p className="flex flex-col gap-y-2 w-full h-full">
                    Already registered? <br/>
                    <span className="">
                        <a href="/login" className="hover:underline hover:underline-offset-2 ">Sign In</a>
                    </span>
                </p>
            </section>
    );
}
 
export default RegisterForm;