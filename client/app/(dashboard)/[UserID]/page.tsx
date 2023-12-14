import { getCourses } from '@/actions/course-actions';
import { getRole } from '@/actions/role-actions';
import { getUser } from '@/actions/user-actions';
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
  const role = await getRole(user.RoleID)
  const courses = await getCourses(params.UserID, role.RoleName);
  
  const col1 = [
    {
      title: 'My Announcements',
      href: `${params.UserID}/announcements`,
      data: undefined
    }, 
    {
      title: 'My Alerts ',
      href: `${params.UserID}/alerts`,
      data: undefined
    }
]

const col2 = [
{
      title: 'My courses',
      href: `${params.UserID}/courses`,
      data: courses
    },
    {
      title: 'My Tasks ',
      href: `${params.UserID}/tasks`,
      data: undefined
    }
]

  return (
    <div className='w-full grid md:grid-cols-2 grid-cols-1 auto-cols-fr pt-14 h-full gap-x-8 md:px-0 px-5'>
      <div className='flex flex-col gap-y-0'>
        {col1.map(table => (
          <div key={table.title}>
            <NewCards title = {table.title} data={table.data} href={table.href}/>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-y-0'>
        {col2.map(table => (
          <div key={table.title}>
            <NewCards title = {table.title} data={table.data} href={table.href}/>
          </div>
        ))}
      </div>
    </div> 
  );
  
}

export default MainPage;


