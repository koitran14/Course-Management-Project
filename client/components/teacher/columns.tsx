"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubmissionColumn = {
  StudentID: string | '',
  StudentName: string | '' ,
  SubmitAt: string | '',
  status: string | '',
  grade: Number | ''
}

export const columns: ColumnDef<SubmissionColumn>[] = [
  {
    accessorKey: "StudentID",
    header: "Student ID",
  },
  {
    accessorKey: "StudentName",
    header: "Name",
  },
  {
    accessorKey: "SubmitAt",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  }
]
