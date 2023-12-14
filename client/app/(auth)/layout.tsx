import bgLogin from "@/public/bg-login.svg";
import Image from "next/image";


const AuthLayout = ({
    children
}:{
    children: React.ReactNode
}) => {

    return(
        <div className="h-full w-full md:px-0 relative px-5 overflow-hidden">
            <Image 
                priority
                src= {bgLogin}
                alt="Blackboard for IU"
                className="w-full h-full md:top-[220px] top-0 absolute left-0 -z-10"
            />
            {children}
        </div>
    )
}

export default AuthLayout;