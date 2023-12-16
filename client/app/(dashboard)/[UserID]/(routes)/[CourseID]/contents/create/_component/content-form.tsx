"use client"

import AttachmentForm from '@/components/assignment/AttachmentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'

const ContentForm = () => {
  const params = useParams();
  const router = useRouter();

  const [assignment, setAssignment] = useState({
    A_Title: '',
    A_Desc: '',
    A_StartAt: '',
    A_DueDate: '',
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
      A_Title: '',
      A_Desc: '',
      A_StartAt: '',
      A_DueDate: '',
      CourseID: params.CourseID,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <Input type="text" name="A_Title" value={assignment.A_Title} onChange={handleChange} className='w-[50%]'/>
      </label>
      <br />
      <div className='grid grid-cols-2 gap-x-3'>
        <label>
          Start Date:
          <Input type="datetime-local" name="A_StartAt" value={assignment.A_StartAt} onChange={handleChange} />
        </label>
        <label>
          Due Date:
          <Input type="datetime-local" name="A_DueDate" value={assignment.A_DueDate} onChange={handleChange} />
        </label>
      </div>
      <br />
      <label>
        Description:
        <textarea name="A_Desc" value={assignment.A_Desc} onChange={handleChange} className='w-full h-20 rounded-md border border-zinc-300'/>
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

export default ContentForm;
