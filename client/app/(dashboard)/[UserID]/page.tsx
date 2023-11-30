import { getUser } from '@/actions/get-user';

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
    <div className='h-full w-full flex items-center justify-center'>
      <h1>{mainContent}</h1>
    </div>
  );
}

export default MainPage;


