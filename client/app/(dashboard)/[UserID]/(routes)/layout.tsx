const LayoutForRoutes = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="w-full h-full md:px-[200px] px-0">
            {children}
        </div>
    );
}
 
export default LayoutForRoutes;