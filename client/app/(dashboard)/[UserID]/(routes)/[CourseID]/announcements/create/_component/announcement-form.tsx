"use client"

import AttachmentForm from '@/components/assignment/AttachmentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { generateUniqueAnnouncementID } from '@/actions/announcement-actions';
import axios from 'axios';
import toast from 'react-hot-toast'


const AnnouncementForm = () => {
  const params = useParams();
  const router = useRouter();
  const now = new Date();

  const [validTitle, setValidTitle] = useState(false);
  const [validDesc, setValidDesc] = useState(false);
 
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

  const handleCancel = () => {
    router.back();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validTitle || !validDesc) {
      return;
    }

    const uniqueID = await generateUniqueAnnouncementID();
    const announcementWithID = {
      AnID: uniqueID,
      ...announcement,
    };
    console.log(announcementWithID);
    try {
      const response = await axios.post('http://localhost:8080/api/announcement', announcementWithID);
      console.log('Content created:', response.data);
      if (response.status === 200) {
        toast.success('Created successfully.');
        router.back();
      } else {
        toast.error("There's something wrong.");
      }
    } catch (error) {
      toast.error('Error: ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
      <label className='flex flex-col gap-y-1'>
        Title:
        <Input type="text" name="AnTitle" value={announcement.AnTitle} onChange={handleChange} className='w-[50%]'/>
      </label>
      <br />
      <label className='flex flex-col gap-y-1'>
        Description:
        <textarea name="AnDesc" value={announcement.AnDesc} onChange={handleChange} className='w-full h-40 rounded-md border border-zinc-300'/>
      </label>
      <br />
      <div className='flex flex-col gap-y-1'>
        Attachment:
        <AttachmentForm />
      </div>
      <div className='pt-5 flex flex-row items-center justify-end gap-x-2'>
        <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
        <Button type="submit" disabled={!validTitle || !validDesc} className='bg-indigo-800'>Submit</Button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
