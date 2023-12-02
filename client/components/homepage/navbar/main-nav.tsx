import Link from "next/link";
import MobileNavForCourse from "../course/mobile-c-nav-bar";

const Navigator = [
    {
        title: "Home",
        href: '/'
    },
    {
        title: "Announcement",
        href: '/'
    },
    {
        title: "Content",
        href: '/'
    },
    {
        title: "Assignment",
        href: '/'
    }
]

const MainNav = () => {
    return (
        <>
            <div className="items-center hidden md:flex md:gap-x-5 md:px-2 px-0">
                {Navigator.map((nav) => (
                    <Link 
                        key = {nav.title}
                        href= {nav.href}
                    >
                        <div className="text-md hover:border-b-2 hover:text-blue-700 hover:font-semibold hover:border-indigo-600 transition-all ease-in-out duration-400">
                            {nav.title}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="md:hidden block">
                <MobileNavForCourse/>
            </div>
        </>
    );
}
 
export default MainNav;