const LayoutForGeneralPage = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full w-full bg-white/80">
            {children}
        </div>
    );
}
 
export default LayoutForGeneralPage;