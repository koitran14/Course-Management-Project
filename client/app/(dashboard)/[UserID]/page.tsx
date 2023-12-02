import { getUser } from '@/actions/get-user';
import { useEffect, useState } from 'react';

interface MainPageProps {
  params: {
    UserID: string;
  }
}

const MainPage: React.FC<MainPageProps> = async({
  params
}) => {  
  const user = await getUser(params.UserID);
  const mainContent = user ? `Welcome ${user.UserFirstName} ${user.UserLastName} to our BlackBoard`: 'No profile data';
  
  return (
    <div className='flex h-full items-center justify-center'>
        <h1 className=''>{mainContent}</h1>
    </div>
    
  );
}

export default MainPage;


