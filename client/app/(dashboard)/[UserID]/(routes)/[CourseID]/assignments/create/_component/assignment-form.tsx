"use client"

import AttachmentForm from '@/components/assignment/AttachmentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from 'react-hot-toast'
import { generateUniqueAssignment } from '@/actions/assignment-actions';

const AssignmentForm = () => {
  const params = useParams();
  const router = useRouter();
  const [validTitle, setValidTitle] = useState(false);
  const [validDesc, setValidDesc] = useState(false);
  const [validStartAt, setValidStartAt] = useState(false);
  const [validEndAt, setValidEndAt] = useState(false);
  const [assignment, setAssignment] = useState({
    A_ID: '',
    A_Title: '',
    A_Desc: '',
    A_StartAt: '',
    A_DueDate: '',
    CourseID: params.CourseID,
  });

  useEffect(() => {
    setValidTitle(assignment.A_Title.length > 1)
  },[assignment.A_Title])

  useEffect(() => {
    setValidDesc(assignment.A_Desc.length > 1)
  },[assignment.A_Desc])
  
  useEffect(() => {
    setValidStartAt(assignment.A_StartAt !== '')
  },[assignment.A_StartAt])

  useEffect(() => {
    setValidEndAt(assignment.A_DueDate !== '')
  },[assignment.A_DueDate])

  const handleCancel = () => {
    router.back();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validTitle || !validDesc || !validStartAt || !validEndAt) {
      return;
    }
  
    // Generate a unique ID for A_ID
    const uniqueID = await generateUniqueAssignment();
  
    // Create the assignment object with the generated unique ID
    const assignmentWithID = {
      ...assignment,
      A_ID: uniqueID,
    };
  
    console.log(assignmentWithID);
    try {
      const response = await axios.post('http://localhost:8080/api/assignment', assignmentWithID);
      console.log('Assignment created:', response.data);
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
        <Input type="text" name="A_Title" value={assignment.A_Title} onChange={handleChange} className='w-[50%]'/>
      </label>
      <br />
      <div className='grid grid-cols-2 gap-x-3'>
        <label className='flex flex-col gap-y-1'>
          Start Date:
          <Input type="datetime-local" name="A_StartAt" value={assignment.A_StartAt} onChange={handleChange} />
        </label>
        <label className='flex flex-col gap-y-1'>
          Due Date:
          <Input type="datetime-local" name="A_DueDate" value={assignment.A_DueDate} onChange={handleChange} />
        </label>
      </div>
      <br />
      <label className='flex flex-col gap-y-1'>
        Description:
        <textarea name="A_Desc" value={assignment.A_Desc} onChange={handleChange} className='w-full h-40 rounded-md border border-zinc-300'/>
      </label>
      <br />
      <div className='flex flex-col gap-y-1'>
        <h1>Attachment:</h1>
        <AttachmentForm />
      </div>
      <div className='pt-5 flex flex-row items-center justify-end gap-x-2'>
        <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
        <Button type="submit" className='bg-indigo-800' disabled={!validTitle || !validDesc || !validStartAt || !validEndAt}>Submit</Button>
      </div>
    </form>
  );
};

export default AssignmentForm;
