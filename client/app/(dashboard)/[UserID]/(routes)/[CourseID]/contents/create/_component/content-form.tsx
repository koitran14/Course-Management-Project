"use client"

import AttachmentForm from '@/components/assignment/AttachmentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { generateUniqueContentID } from '@/actions/content-actions';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContentForm = () => {
  const params = useParams();
  const router = useRouter();
  const now  = new Date();
  const [validTitle, setValidTitle] = useState(false);
  const [validDesc, setValidDesc] = useState(false);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      console.log('Announcement created:', response.data);
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-8'>
      <label>
        Title:
        <Input type="text" name="ConTitle" value={content.ConTitle} onChange={handleChange} className='w-[50%]'/>
      </label>
      <label>
        Description:
        <textarea name="ConDesc" value={content.ConDesc} onChange={handleChange} className='w-full h-40 rounded-md border border-zinc-300'/>
      </label>
      <div className='flex flex-col gap-y-1'>
        <h1>Attachment:</h1>
        <AttachmentForm />
      </div>
      <div className='pt-5 flex flex-row items-center justify-end gap-x-2'>
        <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
        <Button type="submit" disabled={!validTitle || !validDesc}>Submit</Button>
      </div>
    </form>
  );
};

export default ContentForm;
