'use client'
import Image from "next/image";
import navlogo from "@/public/nav-logo.svg"
import Link from "next/link";
import { useParams } from "next/navigation";

const Logo = () => {
    const params = useParams();

    return (
        <Link href={`/${params.UserID}`}>
            <Image 
                priority
                src= {navlogo}
                alt="Blackboard for IU"
                className="w-[300px]"
            />
        </Link>
    );
}
 
export default Logo;