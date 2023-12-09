import NavBar from "@/components/homepage/navbar/nav-bar";

const GeneralLayoutForPage = ({
    children
}:{
    children: React.ReactNode
}) => {
    return (
        <div className="h-full w-full relative bg-center bg-cover"
            style={{
                backgroundImage: `url(/bg.png)`,
            }}
        >
            <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 h-full w-full bg-white/20 backdrop-blur-sm" />
                <div className='w-full fixed top-0 h-28 z-50'>
                    <NavBar />
                </div>
                <div className="h-full w-full pt-28 absolute top-0 left-0 md:px-[240px] sm:px-12 px-5 z-10 overflow-y-scroll">
                    {children}
                </div>
            </div>  
        </div>
    );
}
 
export default GeneralLayoutForPage;