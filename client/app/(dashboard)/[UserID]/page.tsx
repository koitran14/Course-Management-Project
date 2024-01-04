import { Announcement,getAnnouncements } from '@/actions/announcement-actions';
import { Course,getCourses } from '@/actions/course-actions';
import { getRole } from '@/actions/role-actions';
import { getUser } from '@/actions/user-actions';
import { AnnouncementCards } from '@/components/homepage/announcement-card';
import { NewCards } from '@/components/homepage/news-card';
import { AssignmentCards } from '@/components/homepage/assignment-card';
import { Assignment, getAlerts, getAssignmentsByStudentID } from '@/actions/assignment-actions';
import { AlertCards } from '@/components/homepage/alert-card';
import React from 'react';

type CardData = Announcement[] | Assignment[] | Course[] | Assignment[];

interface MainPageProps {
  params: {
    UserID: string;
  }
}

const MainPage: React.FC<MainPageProps> = async ({
  params
}) => {
  const user = await getUser(params?.UserID);
  const role = await getRole(user?.RoleID);
  const courses = await getCourses(params?.UserID, role?.RoleName);
  const announcements = await getAnnouncements(params?.UserID);
  const assignments = await getAssignmentsByStudentID(params?.UserID);
  const alerts = await getAlerts(params?.UserID);

  const col1: { title: string; href: string; data: CardData; component: React.ReactNode | null }[] = [
    {
      title: 'My Announcements',
      href: `${params?.UserID}/announcements`,
      data: announcements,
      component: <AnnouncementCards title='My Announcements' data={announcements} href={`${params.UserID}/announcements`} />,
    },
    {
      title: 'My Alerts ',
      href: `${params.UserID}/alerts`,
      data: alerts,
      component: <AlertCards title='My Alerts' data={alerts} href={`${params.UserID}/alerts`} />,
    },
  ];

  const col2: { title: string; href: string; data: CardData; component: React.ReactNode | null }[] = [
    {
      title: 'My courses',
      href: `${params.UserID}/courses`,
      data: courses,
      component: <NewCards title='My Courses' data={courses} href={`${params.UserID}/courses`} />,
    },
    {
      title: 'My Tasks ',
      href: `${params.UserID}/tasks`,
      data: assignments,
      component: <AssignmentCards title='My Tasks' data={assignments} href={`${params.UserID}/tasks`} />,
    },
  ];

  const renderCards = (cards: { title: string; component: React.ReactNode }[]) => (
    <div className='flex flex-col gap-y-0'>
      {cards.map((table) => (
        <div key={table.title}>
          {table.component && <>{table.component}</>}
        </div>
      ))}
    </div>
  );

  return (
    <div className='w-full grid md:grid-cols-2 grid-cols-1 auto-cols-fr pt-14 h-full gap-x-8 md:px-[200px] px-5'>
      {renderCards(col1.map((table) => ({
        title: table.title,
        component: table.component,
      })))}
      {renderCards(col2.map((table) => ({
        title: table.title,
        component: table.component,
      })))}
    </div>
  );
};
export default MainPage;

