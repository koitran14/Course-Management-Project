"use client"
import { User, getUser } from "@/actions/user-actions";
import { DatePicker } from "@/components/homepage/profile-update/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useState } from "react";

const SettingPage = () => {
    const params = useParams();
    const getUserServer = async() => {
        const result = await getUser(params.UserID as string);
        setUser(result);
    }

    const [user, setUser] = useState<User | undefined>();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();


    return (
        <div className="w-full h-full flex justify-center ">
            <div className="w-full md:w-[70%] bg-white/90 h-full flex flex-col px-10 md:px-16 overflow-y-auto">
                <div className="pt-10 md:pt-14">
                    <h1 className="font-semibold md:text-4xl text-3xl text-blue-800">Edit profile</h1>
                </div>
                <div className="flex flex-col gap-y-3 w-full md:grid md:grid-cols-2 pt-5">
                    <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
                        <h1 className="text-lg pl-2 font-semibold text-slate-600">First Name:</h1>
                        <Input 
                            className="md:w-[400px] w-full h-12 border-2 text-md"
                            placeholder={user?.UserFirstName}
                        />
                    </div>

                    <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
                        <h1 className="text-lg pl-2 font-semibold text-slate-600">Last Name:</h1>
                        <Input 
                            className="md:w-[400px] w-full h-12 border-2 text-md"
                            placeholder={user?.UserLastName}
                        />
                    </div>

                    <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
                        <h1 className="text-lg pl-2 font-semibold text-slate-600">Date of birth:</h1>
                        <div className="w-full md:w-[400px]">
                            <DatePicker selectedDate={user?.UserDOB} onChange={setSelectedDate}/>    
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-3 md:pt-4 pt-1 md:col-span-2">
                        <h1 className="text-lg pl-2 font-semibold text-slate-600">New email:</h1>
                        <Input 
                            className="md:w-[400px] w-full h-12 border-2 text-md"
                            placeholder={user?.UserEmail}
                            type="email"
                        />
                    </div>

                    <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
                        <h1 className="text-lg pl-2 font-semibold text-slate-600">New password:</h1>
                        <Input 
                            className="md:w-[400px] w-full h-12 border-2 text-md"
                            placeholder="Type your new password..."
                            type="password"
                        />
                    </div>

                    <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
                        <h1 className="text-lg pl-2 font-semibold text-slate-600">Confirm your new password:</h1>
                        <Input 
                            className="md:w-[400px] w-full h-12 border-2 text-md"
                            placeholder="Retype your new password..."
                            type="password"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-x-2 justify-end py-6">
                    <Button variant={"outline"}>
                        Cancel
                    </Button>
                    <Button className="bg-blue-800" >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default SettingPage;