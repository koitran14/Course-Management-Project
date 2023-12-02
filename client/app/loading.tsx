"use client "
import { Loader } from "@/components/ui/loader";

const Loading = () => {
  return ( 
      <div className="z-[9999px] flex h-full w-full items-center justify-center bg-white">
        <Loader />
      </div>
   );
}
 
export default Loading;