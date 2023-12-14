"use client"

import Logo from "./logo";
import UserDropDown from "./user-dropdown";


const NavBar = () => {
    return (
        <div className="flex items-center justify-between h-full border-b-2 border-indigo-700 md:px-10 px-4 bg-white">
            <Logo />
            <UserDropDown />
        </div>
    );
}
 
export default NavBar;