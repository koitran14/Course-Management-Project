import { getContent } from "@/actions/get-content";

interface ContentPageProps {
  params: {
    ConID: string;
  }
}
const ContentPage: React.FC<ContentPageProps> = async({
  params
}) => {  
  const content = await getContent(params.ConID);

  
  return (
    <div className='flex h-full items-center justify-center'>
        <h1 className=''>{content.ConTitle}</h1>
    </div>
    
  );
}

export default ContentPage;
