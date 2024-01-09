"use client"

import AttachmentForm from '@/components/attachments/AttachmentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import toast from 'react-hot-toast'
import { generateUniqueAssignment } from '@/actions/assignment-actions';
import { Attachment } from '@/actions/attachment-actions';
import { Textarea } from '@/components/ui/textarea';

const AssignmentForm = () => {
  const params = useParams();
  const router = useRouter();
  const [validTitle, setValidTitle] = useState(false);
  const [validDesc, setValidDesc] = useState(false);
  const [validEndAt, setValidEndAt] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>();
  const [assignment, setAssignment] = useState({
    A_ID: '',
    A_Title: '',
    A_Desc: '',
    A_StartAt: new Date(),
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

  const handleSubmit = async () => {
    if (!validTitle || !validDesc || !validEndAt) {
      return;
    }
    const uniqueID = await generateUniqueAssignment();
    const assignmentWithID = {
      ...assignment,
      A_ID: uniqueID,
    };  
    try {
      const response = await axios.post('http://localhost:8080/api/assignment', assignmentWithID);
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
              A_ID: assignmentWithID.A_ID,
              AttachID: attachment.AttachID
            }
            const announcementAttachment = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attachment/assignment`, data);
            console.log('Attachment for announcement created:', announcementAttachment);
          } catch (error) {
            console.error("Error creating attachment for assignment:", error)
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
        <Input type="text" name="A_Title" value={assignment.A_Title} onChange={handleChange} className='w-[50%]'/>
      </label>
      <br />
      <div className='grid grid-cols-2 gap-x-3'>
        <label className='flex flex-col gap-y-1'>
          Due Date:
          <Input type="datetime-local" name="A_DueDate" value={assignment.A_DueDate} onChange={handleChange} />
        </label>
      </div>
      <br />
      <label className='flex flex-col gap-y-1'>
        Description: 
        <Textarea maxLength={1000} name="A_Desc" value={assignment.A_Desc} onChange={handleChange} className='w-full h-40 rounded-md border border-zinc-300'/>
      </label>
      <br />
      <div className='flex flex-col gap-y-1'>
        <h1>Attachment:</h1>
        <AttachmentForm initialData={attachments} setAttachments={setAttachments}/>
      </div>
      <div className='pt-5 flex flex-row items-center justify-end gap-x-2'>
        <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit} className='bg-indigo-800' disabled={!validTitle || !validDesc || !validEndAt}>Submit</Button>
      </div>
    </div>
  );
};

export default AssignmentForm;
