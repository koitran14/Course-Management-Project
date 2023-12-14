import { NewCards } from '@/components/homepage/news-card';

const CoursePage = async({
  params
}:{
  params: {
    UserID: string;
    CourseID: string;
  }
}) => { 

  const col1 = [
    {
      title: 'My Announcements',
      href: `${params.CourseID}/announcements`,
      data: undefined
    }, 
    {
      title: 'My contents',
      href: `${params.CourseID}/contents`
    },
]

const col2 = [
    {
      title: 'My Tasks ',
      href: `${params.CourseID}/assignments`,
      data: undefined
    },
    {
      title: 'My Alerts ',
      href: `${params.CourseID}/alerts`,
      data: undefined
    }
]
  return (
    <div className='w-full grid md:grid-cols-2 grid-cols-1 auto-cols-fr pt-14 h-full gap-x-8 md:px-12 px-5'>
      <div className='flex flex-col gap-y-0'>
        {col1.map(table => (
          <div key={table.title}>
            <NewCards title={table.title} data={table.data} href={table.href}/>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-y-0'>
        {col2.map(table => (
          <div key={table.title}>
            <NewCards title={table.title} data={table.data} href={table.href}/>
          </div>
        ))}
      </div>
    </div> 
  );
  
}

export default CoursePage;


