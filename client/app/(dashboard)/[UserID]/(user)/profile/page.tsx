import { getRole } from "@/actions/role-actions";
import { getUser } from "@/actions/user-actions";
import logoIU from "@/public/logo-iu.svg"
import Image from "next/image";
import { format } from 'date-fns';


const ProfilePage =  async ({
    params
} : {
    params: {
        UserID: string
    }
}) => {
    
    const user = await getUser(params.UserID)
    const role = await getRole(user.RoleID);
    console.log(params);

    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className=" relative flex flex-col gap-y-3 px-6 pb-6 pt-20 h-fit w-[350px] bg-white rounded-xl shadow-lg shadow-slate-500 border-2 border-blue-800/90">
                <div className="-top-[85px] right-2 absolute">
                    <Image 
                        priority
                        alt="IULogo"
                        src={logoIU}
                        className="h-[160px]"
                    />
                </div>
                <div className="flex text-2xl pb-1 justify-center w-full font-semibold text-blue-800">
                    Profile
                </div>
                <div className="flex flex-row gap-x-1">
                    <h1 className="font-semibold text-indigo-800">
                        Student name:    
                    </h1> 
                    <h1>
                        {user.UserFirstName} {user.UserLastName}
                    </h1>
                </div>
                <div className="flex flex-row gap-x-1">
                    <h1 className="font-semibold text-indigo-800">
                        Date of birth: 
                    </h1>
                    <h1>
                        {user.UserDOB ? format(new Date(user.UserDOB), 'dd/MM/yyyy') : 'Invalid Date'} 
                    </h1>
                </div>
                <div className="flex flex-row gap-x-1">
                    <h1 className="font-semibold text-indigo-800">
                        Email: 
                    </h1>
                    <h1>
                        {user.UserEmail}
                    </h1>
                </div>
                <div className="flex flex-row gap-x-1">
                    <h1 className="font-semibold text-indigo-800">
                        {role.RoleName} ID:
                    </h1> 
                    <h1>
                        {user.UserUniID}
                    </h1>
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;