"use client"

import { useRef, useState, useEffect } from "react";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, LockKeyholeIcon, MoveRight, XOctagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import { DatePicker } from "../homepage/profile-update/date-picker";
import RoleSelect from "./role-select";
import { Role } from "@/actions/role-actions";
import { Department } from "@/actions/department-actions";
import DeptSelect from "./department-select";

const RegisterForm = () => {

    const userRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState('account');
    const [validAccount, setValidAccount ] = useState(false);
    const [validInfo, setValidInfo ] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [ID, setID] = useState('');
    const [validID, setValidID] = useState(false);

    const [DOB, setDOB] = useState<Date | undefined>();
    const [validDOB, setValidDOB] = useState(false);

    const [role, setRole] = useState<Role>();
    const [validRole, setValidRole] = useState(false);

    const [dept, setDept] = useState<Department>();
    const [validDept, setValidDept] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    },[])

    useEffect(() => {
        setValidRole(role !== undefined && Object.keys(role).length > 0)
    }, [role])

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

    useEffect(() => {
        setValidFirstName(firstName.length > 1);
    }, [firstName])

    useEffect(() => {
        setValidLastName(lastName.length > 1);
    }, [lastName])

    useEffect(() => {
        const check = EMAIL_REGEX.test(email);
        setValidEmail(check && email.length > 1);
    }, [email])

    useEffect(() => {
        setValidID(ID.length > 0);
    }, [ID])

    useEffect(() => {
        setValidDOB(DOB !== undefined);
    }, [DOB])

    useEffect(() => {
        setValidAccount(validName && validPwd && validMatch && validRole)
    },[validName, validPwd, validMatch, validRole])


    useEffect(() => {
        setValidInfo(validFirstName && validLastName && validID && validDOB && validDept)
    },[validFirstName, validLastName, validID, validDOB, validDept])

    useEffect(() => {
        setValidDept(dept !== undefined && Object.keys(dept).length > 0)
    },[dept]);

    const router = useRouter();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validAccount || !validInfo) {
            return;
        }
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: user, 
                    password: pwd, 
                    firstName: firstName, 
                    lastName: lastName, 
                    email: email, 
                    id: ID, 
                    roleId: role?.RoleID, 
                    dob: DOB,
                    deptID: dept?.DeptID 
                }),
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
        <Tabs value={activeTab} className="w-fit h-fit" defaultValue="account">
            <TabsList className="grid w-full grid-cols-2 bg-indigo-800 text-white">
                <TabsTrigger value="account" onClick={() => setActiveTab('account')}>Account</TabsTrigger>
                <TabsTrigger disabled={!validName || !validPwd || !validMatch} value="info" onClick={() => setActiveTab('info')}>
                    Information
                    <LockKeyholeIcon className={!validName || !validPwd || !validMatch ? "block pl-2" : "hidden"}/>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="w-[400px] h-fit py-5 px-9 border-2 rounded-lg bg-white">
                <h1 className="text-3xl flex w-full items-center justify-center font-semibold">Register</h1>
                <form className="flex flex-col gap-y-2 w-full h-full pt-3">
                    <label htmlFor="role" className="flex flex-row gap-x-2">
                        Role:
                        <span className={`${validRole ? "block pl-2" : 'hidden'}`}>
                            <Check />
                        </span>
                    </label>

                    <RoleSelect onChange={setRole} roleFromUser={role}/>

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
                        value={user}
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
                        value={pwd}
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
                        value={matchPwd}
                    />
                    <p id="pwdnote" className={matchFocus && !validMatch ? "block bg-slate-300/50 pr-3 rounded-md pl-1 " : "hidden"}>
                        Must match the first password input field. <br />
                    </p>
                    <Button 
                        disabled={!validAccount ? true : false}
                        className="bg-indigo-800 text-white disabled:bg-zinc-800"
                        onClick={() => setActiveTab('info')}
                    >
                        <p className="pr-3 text-[16px]">Next</p>
                        <MoveRight/>
                    </Button>               
                </form>
                <p className="flex flex-row gap-x-2 w-full h-full pt-2">
                    Already registered? <br/>
                    <span className="">
                        <a href="/login" className="hover:underline hover:underline-offset-2 text-indigo-800 font-semibold">Sign In</a>
                    </span>
                </p>
            </TabsContent>

            {/* Create information */}
            <TabsContent value="info" className="w-[520px] h-fit py-5 px-9 border-2 rounded-lg bg-white">
                <h1 className="text-3xl font-semibold">Create Information</h1>
                <form className="flex flex-col gap-y-3 w-full h-full"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-2 gap-x-3 pt-3">
                        <div className="w-full flex flex-col gap-y-2">
                            <label htmlFor="firstName" className="flex flex-row gap-x-2">
                                First Name:
                                <span className={`${validFirstName? "block pl-2" : 'hidden'}`}>
                                    <Check />
                                </span>
                            </label>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                autoComplete="off"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                aria-invalid={validFirstName ? "false" : "true"}
                                aria-describedby="uidnote"
                                value={firstName}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="lastName" className="flex flex-row gap-x-2">
                                Last Name:
                                <span className={validLastName ? "block" : 'hidden'}>
                                    <Check />
                                </span>
                            </label>

                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                aria-invalid={validLastName ? "false" : "true"}
                                value={lastName}
                            />
                        </div>
                    </div>
                    

                    <label htmlFor="email" className="flex flex-row gap-x-2">
                        Email:
                        <span className={validEmail ? "block" : 'hidden'}>
                            <Check />
                        </span>
                        <span className={!validEmail && email.length > 0 ? "block" : 'hidden'}>
                            <XOctagon />
                        </span>
                    </label>

                    <Input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="pwdnote" className={emailFocus && !validEmail ? "block bg-slate-300/50 pr-3 rounded-md pl-1 " : "hidden"}>
                        Must contain @ in your email. <br />
                    </p>
                    <div className="grid grid-cols-2 gap-x-3">
                        <div>
                            <label htmlFor="ID" className="flex flex-row gap-x-2">
                                University ID:
                                <span className={validID ? "block" : 'hidden'}>
                                    <Check />
                                </span>
                            </label>

                            <Input
                                type="text"
                                id="ID"
                                onChange={(e) => setID(e.target.value)}
                                required
                                aria-invalid={validID ? "false" : "true"}
                            />
                        </div>

                        <div>
                            <label htmlFor="dept" className="flex flex-row gap-x-2">
                                Department:
                                <span className={`${validDept ? "block pl-2" : 'hidden'}`}>
                                    <Check />
                                </span>
                            </label>

                            <DeptSelect onChange={setDept} deptFromUser={dept}/>
                        </div>
                    </div>
                    

                    
                    <label htmlFor="ID" className="flex flex-row gap-x-2">
                        Date Of Birth:
                        <span className={DOB ? "block" : 'hidden'}>
                            <Check />
                        </span>
                    </label>

                    <DatePicker onChange={setDOB}/> 
                
                    <Button 
                        disabled={!validAccount || !validInfo ? true : false}
                    >
                        Sign Up
                    </Button>
                </form>
                <p className="flex flex-row gap-x-2 w-full h-full pt-2">
                    Already registered? <br/>
                    <span className="">
                        <a href="/login" className="hover:underline hover:underline-offset-2 text-indigo-800 font-semibold">Sign In</a>
                    </span>
                </p>
            </TabsContent>
        </Tabs>
    );
}
 
export default RegisterForm;