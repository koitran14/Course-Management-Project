import { getAnnouncementsByCourse } from '@/actions/announcement-actions';
import { AnnouncementCards } from '@/components/homepage/announcement-card';
import { NewCards } from '@/components/homepage/news-card';
import { AssignmentCards } from '@/components/homepage/assignment-card';
import { getAssignmentsByCourse } from '@/actions/assignment-actions';
import { getAlertsByCourse } from '@/actions/assignment-actions';
import { AlertCards } from '@/components/homepage/alert-card';
import { ContentCards } from '@/components/homepage/content-card';
import { getContents } from '@/actions/content-actions';
interface CoursePageProps {
  params: {
    UserID: string;
    CourseID:string;
  }
}


const CoursePage: React.FC<CoursePageProps> = async({
  params
}) => { 
  const announcements = await getAnnouncementsByCourse(params.CourseID);
  const assignments = await getAssignmentsByCourse(params.CourseID);
  const alerts = await getAlertsByCourse(params.CourseID);
  const contents= await getContents(params.CourseID);
  const col1 = [
    {
          title: 'My Contents',
          href: `${params.CourseID}/courses`,
          data: contents
        },

  {
    title: 'My Announcements',
    href: `${params.CourseID}/announcements`,
    data: announcements}
]
const col2=[  {
  title: 'My Tasks',
  href: `${params.CourseID}/tasks`,
  data: assignments
},
  {
    title: 'My Alerts',
    href: `${params.CourseID}/alerts`,
    data: alerts
  }
]

const renderCards = (cards) => (
  <div className='flex flex-col gap-y-0'>
    {cards.map((table) => (
      <div key={table && table.title}>
        {table && table.component !== undefined ? table.component : null}
      </div>
    ))}
  </div>
);


return (
  <div className='w-full grid md:grid-cols-2 grid-cols-1 auto-cols-fr pt-14 h-full gap-x-8 px-12'>
    {renderCards(col1.map((table) => {
      switch (table.title) {
        case 'My Contents':
          return { ...table, component: <ContentCards title={table.title} data={table.data} href={table.href} /> };
        case 'My Announcements':
          return { ...table, component: <AnnouncementCards title={table.title} data={table.data} href={table.href} /> };
        default:
          return null;
      }
    }))}
    {renderCards(col2.map((table) => {
      switch (table.title) {
        case 'My Tasks':
          return { ...table, component: <AssignmentCards title={table.title} data={table.data} href={table.href} /> };
        case 'My Alerts':
          return { ...table, component: <AlertCards title={table.title} data={table.data} href={table.href} /> };
        default:
          return null;
      }
    }))}
  </div>
);
};

export default CoursePage;


