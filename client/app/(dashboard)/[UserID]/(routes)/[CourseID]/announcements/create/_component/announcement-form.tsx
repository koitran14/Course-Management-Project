"use client"

import AttachmentForm from '@/components/attachments/AttachmentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { generateUniqueAnnouncementID } from '@/actions/announcement-actions';
import axios from 'axios';
import toast from 'react-hot-toast'
import { Attachment, getAttachmentsByAnID } from '@/actions/attachment-actions';
import { Textarea } from '@/components/ui/textarea';


const AnnouncementForm = () => {
  const params = useParams();
  const router = useRouter();
  const now = new Date();

  const [validTitle, setValidTitle] = useState(false);
  const [validDesc, setValidDesc] = useState(false);
  const [validID, setValidID] = useState('');
  const [initialAttachment, setInitialAttachment] = useState<Attachment[]>();
 
  const [announcement, setAnnouncement] = useState({
    AnTitle: '',
    AnDesc: '',
    AnDate: now,
    CourseID: params.CourseID,
  });

  useEffect(() => {
    setValidTitle(announcement.AnTitle.length > 1)
  },[announcement.AnTitle])

  useEffect(() => {
    setValidDesc(announcement.AnDesc.length > 1)
  },[announcement.AnDesc])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  useEffect(() => {
    const getInitialAttachment  = async () => {
      const data = await getAttachmentsByAnID(validID);
      setInitialAttachment(data);
      return null;
    }

    getInitialAttachment();
  },[validID])

  const handleCancel = () => {
    router.back();
  }

  useEffect(() => {
    const setUniqueID = async () => {
      const uniqueID = await generateUniqueAnnouncementID();
      setValidID(uniqueID);
    };
  
    setUniqueID();
  }, []); // Empty dependency array triggers this effect only once on mount/refresh
  

  const getAttachmentfromAnID = async(id:string) => {
    const result = await getAttachmentsByAnID(id);
    setInitialAttachment(result);
  }

  useEffect(() => {
    getAttachmentfromAnID(validID);
  }, [validID]);
  

  const handleSubmit = async () => {
    if (!validTitle || !validDesc) {
      return;
    }

    const announcementWithID = {
      AnID: validID,
      ...announcement,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/announcement', announcementWithID);
      console.log('Content created:', response.data);
      if (response.status === 200) {
        toast.success('Created successfully.');
        router.back();
        router.refresh();
      } else {
        toast.error("There's something wrong.");
      }

      if (initialAttachment && initialAttachment.length > 0) {
        for (const attachment of initialAttachment) {
          try {
            const attachmentResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attachment`, attachment);
            console.log('Attachment created:', attachmentResponse);
          } catch (error) {
            console.error("Error creating attachment:", error)
          }

          try {
            const AnAttach = {
              AnID: validID,
              AttachID: attachment.AttachID
            }
            const announcementAttachment = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attachment/announcement`, AnAttach);
            console.log('Attachment for announcement created:', announcementAttachment);
          } catch (error) {
            console.error("Error creating attachment:", error)
          }
        }
      }
    } catch (error) {
      toast.error('Error: ' + error);
    }
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <label className='flex flex-col gap-y-1'>
        Title:
        <Input type="text" name="AnTitle" value={announcement.AnTitle} onChange={handleChange} className='w-[50%]'/>
      </label>
      <br />
      <label className='flex flex-col gap-y-1'>
        Description:
        <Textarea maxLength={1000} name="AnDesc" value={announcement.AnDesc} onChange={handleChange} className='w-full h-40 rounded-md border border-zinc-300'/>
      </label>
      <br />
      <div className='flex flex-col gap-y-1'>
        Attachment:
        <AttachmentForm initialData={initialAttachment} setAttachments={setInitialAttachment} />
      </div>
      <div className='pt-5 flex flex-row items-center justify-end gap-x-2'>
        <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit} disabled={!validTitle || !validDesc} className='bg-indigo-800'>Submit</Button>
      </div>
    </div>
  );
};

export default AnnouncementForm;
