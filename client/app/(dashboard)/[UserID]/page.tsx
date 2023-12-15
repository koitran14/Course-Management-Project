import { getAnnouncements } from '@/actions/announcement-actions';
import { getCourses } from '@/actions/course-actions';
import { getRole } from '@/actions/role-actions';
import { getUser } from '@/actions/user-actions';
import { AnnouncementCards } from '@/components/homepage/announcement-card';
import { NewCards } from '@/components/homepage/news-card';
import { AssignmentCards } from '@/components/homepage/assignment-card';
import { getAssignments, getAlerts } from '@/actions/assignment-actions';
import { AlertCards } from '@/components/homepage/alert-card';

interface MainPageProps {
  params: {
    UserID: string;
  }
}

const MainPage: React.FC<MainPageProps> = async ({
  params
}) => {
  const user = await getUser(params.UserID);
  const role = await getRole(user.RoleID);
  const courses = await getCourses(params.UserID, role.RoleName);
  const announcements = await getAnnouncements(params.UserID);
  const assignments = await getAssignments(params.UserID);
  const alerts = await getAlerts(params.UserID);

  const col1 = [
    {
      title: 'My Announcements',
      href: `${params.UserID}/announcements`,
      data: announcements
    },
    {
      title: 'My Alerts ',
      href: `${params.UserID}/alerts`,
      data: alerts
    }
  ];

  const col2 = [
    {
      title: 'My courses',
      href: `${params.UserID}/courses`,
      data: courses
    },
    {
      title: 'My Tasks ',
      href: `${params.UserID}/tasks`,
      data: assignments
    }
  ];

  const renderCards = (cards) => (
    <div className='flex flex-col gap-y-0'>
      {cards.map((table) => (
        <div key={table.title}>
          {table.component}
        </div>
      ))}
    </div>
  );

  return (
    <div className='w-full grid md:grid-cols-2 grid-cols-1 auto-cols-fr pt-14 h-full gap-x-8 md:px-0 px-5'>
      {renderCards(col1.map((table) => {
        switch (table.title) {
          case 'My Announcements':
            return { ...table, component: <AnnouncementCards title={table.title} data={table.data} href={table.href} /> };
          case 'My Alerts ':
            return { ...table, component: <AlertCards title={table.title} data={table.data} href={table.href} /> };
          default:
            return null;
        }
      }))}
      {renderCards(col2.map((table) => {
        switch (table.title) {
          case 'My courses':
            return { ...table, component: <NewCards title={table.title} data={table.data} href={table.href} /> };
          case 'My Tasks ':
            return { ...table, component: <AssignmentCards title={table.title} data={table.data} href={table.href} /> };
          default:
            return null;
        }
      }))}
    </div>
  );
};

export default MainPage;
