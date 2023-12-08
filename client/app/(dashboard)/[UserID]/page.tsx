import { getCourses } from '@/actions/get-courses';
import { getUser } from '@/actions/get-user';
import { NewCards } from '@/components/homepage/news-card';

interface MainPageProps {
  params: {
    UserID: string;
  }
}

const MainPage: React.FC<MainPageProps> = async({
  params
}) => {  
  const user = await getUser(params.UserID);
  const courses = await getCourses(params.UserID);
  
  const tables = [
    {
      title: 'My Announcements',
      href: `${params.UserID}/announcements`,
    }, 
    {
      title: 'My courses',
      href: `${params.UserID}/courses`,
      data: courses
    },
    {
      title: 'My Tasks ',
      href: `${params.UserID}/tasks`,
    },
    {
      title: 'My Alerts ',
      href: `${params.UserID}/alerts`,
    }
  ]
  const mainContent = user ? `Welcome ${user.UserFirstName} ${user.UserLastName} to our BlackBoard`: 'No profile data';

  return (
    <div className='w-full grid md:grid-cols-2 grid-cols-1 py-20 gap-[100px]'>
      {tables.map((table) => (
        <div key={table.title}>
          <NewCards title={table.title} data={table.data}/>  
        </div>
      ))}
    </div> 
  );
  
}

export default MainPage;


