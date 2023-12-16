"use client"

import AttachmentForm from '@/components/assignment/AttachmentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'

const AnnouncementForm = () => {
  const params = useParams();
  const router = useRouter();
  const now = new Date();

  const [assignment, setAssignment] = useState({
    AnTitle: '',
    AnDesc: '',
    AnDate: now.getDate(),
    CourseID: params.CourseID,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleCancel = () => {
    router.back();
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle form submission here, for example, sending the data to an API
    console.log('Assignment Data:', assignment);
    setAssignment({
        AnTitle: '',
        AnDesc: '',
        AnDate: now.getDate(),
        CourseID: params.CourseID,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <Input type="text" name="A_Title" value={assignment.AnTitle} onChange={handleChange} className='w-[50%]'/>
      </label>
      <br />
      <label>
        Description:
        <textarea name="A_Desc" value={assignment.AnDesc} onChange={handleChange} className='w-full h-20 rounded-md border border-zinc-300'/>
      </label>
      <br />
      <div>
        <AttachmentForm />
      </div>
      <div className='pt-5 flex flex-row items-center justify-end gap-x-2'>
        <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
