import { Announcement,getAnnouncementsByCourse } from '@/actions/announcement-actions';
import { Assignment,getAssignmentsByCourse, getAlertsByCourse } from '@/actions/assignment-actions';
import { getContents } from '@/actions/content-actions';
import { AnnouncementCards } from '@/components/homepage/announcement-card';
import { AssignmentCards } from '@/components/homepage/assignment-card';
import { AlertCards } from '@/components/homepage/alert-card';
import { ContentCards } from '@/components/homepage/content-card';
import { Content } from '@/actions/content-actions';

type CardData = Content[] | Announcement[] | Assignment[];
interface CoursePageProps {
  params: {
    UserID: string;
    CourseID: string;
  };
}

const CoursePage: React.FC<CoursePageProps> = async ({ params }) => {
  const announcements = await getAnnouncementsByCourse(params.CourseID);
  const assignments = await getAssignmentsByCourse(params.CourseID);
  const alerts = await getAlertsByCourse(params.CourseID);
  const contents = await getContents(params.CourseID);

  const col1: { title: string; data: CardData; component: React.ReactNode | null }[] = [
    {
      title: 'My Tasks',
      data: assignments,
      component: <AssignmentCards title='My Tasks' data={assignments} href={`${params.CourseID}/assignments`} />,
    },
    {
      title: 'My Announcements',
      data: announcements,
      component: <AnnouncementCards title='My Announcements' data={announcements} href={`${params.CourseID}/announcements`} />,
    },
  ];

  const col2: { title: string; data: CardData; component: React.ReactNode | null }[] = [
    
    {
      title: 'My Contents',
      data: contents,
      component: <ContentCards title='My Contents' data={contents} href={`${params.CourseID}/contents`} />,
    },
    {
      title: 'My Alerts',
      data: alerts,
      component: <AlertCards title='My Alerts' data={alerts} href={`${params.CourseID}/alerts`} />,
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
    <div className='w-full grid md:grid-cols-2 grid-cols-1 auto-cols-fr pt-14 h-full gap-x-8 md:px-8 px-5'>
      {renderCards(
        col1.map((table) => ({
          title: table.title,
          component: table.component,
        }))
      )}
      {renderCards(
        col2.map((table) => ({
          title: table.title,
          component: table.component,
        }))
      )}
    </div>
  );
};

export default CoursePage;
