"use client"

import AttachmentForm from '@/components/attachments/AttachmentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { generateUniqueContentID } from '@/actions/content-actions';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Attachment } from '@/actions/attachment-actions';
import { Textarea } from '@/components/ui/textarea';

const ContentForm = () => {
  const params = useParams();
  const router = useRouter();
  const now  = new Date();
  const [validTitle, setValidTitle] = useState(false);
  const [validDesc, setValidDesc] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>();

  const [content, setAssignment] = useState({
    ConTitle: '',
    ConDesc: '',
    ConDate: now,
    CourseID: params.CourseID,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    
    const { name, value } = e.target;
    setAssignment({ ...content, [name]: value });
  };

  useEffect(() => {
    setValidTitle(content.ConTitle.length > 1)
  },[content.ConTitle])

  useEffect(() => {
    setValidDesc(content.ConDesc.length > 1)
  },[content.ConDesc])
  
  const handleCancel = () => {
    router.back();
  }

  const handleSubmit = async () => {
    if (!validTitle || !validDesc) {
      return;
    }

    const uniqueID = await generateUniqueContentID();
    const contentWithID = {
      ConID: uniqueID,
      ...content,
    };
    console.log(contentWithID);
    try {
      const response = await axios.post('http://localhost:8080/api/content', contentWithID);
      console.log('Content created:', response.data);
      if (response.status === 200) {
        toast.success('Created successfully.');
        router.back();
        router.refresh();
      } else {
        toast.error("There's something wrong.");
      }

      if (attachments && attachments.length > 0) {
        for (const attachment of attachments) {
          try {
            const attachmentResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attachment`, attachment);
            console.log('Attachment created:', attachmentResponse);
          } catch (error) {
            console.error("Error creating attachment:", error)
          }

          try {
            const data = {
              ConID: contentWithID.ConID,
              AttachID: attachment.AttachID
            }
            const announcementAttachment = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attachment/content`, data);
            console.log('Attachment for content created:', announcementAttachment);
          } catch (error) {
            console.error("Error creating attachment for content:", error)
          }
        }
      }
    } catch(error) {
      console.error("Error in creating new content: ", error);
    }
  };

  return (
    <div className='flex flex-col gap-y-8'>
      <label>
        Title:
        <Input type="text" name="ConTitle" value={content.ConTitle} onChange={handleChange} className='w-[50%]'/>
      </label>
      <label>
        Description:
        <Textarea maxLength={1000} name="ConDesc" value={content.ConDesc} onChange={handleChange} className='w-full h-40 rounded-md border border-zinc-300'/>
      </label>
      <div className='flex flex-col gap-y-1'>
        <h1>Attachment:</h1>
        <AttachmentForm initialData={attachments} setAttachments={setAttachments}/>
      </div>
      <div className='pt-5 flex flex-row items-center justify-end gap-x-2'>
        <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit} disabled={!validTitle || !validDesc}>Submit</Button>
      </div>
    </div>
  );
}
export default ContentForm;
