"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker ({
  selectedDate
}:{
  selectedDate?: string | null
}) {
  const [date, setDate] = React.useState<Date>()
  const placeholder = selectedDate ? selectedDate : "Pick a date";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
            variant={"outline"}
            className={cn(
            "justify-start text-left font-normal h-12 w-full text-md",
            !date && "text-muted-foreground "
          )}
        >
          <CalendarIcon className="mr-4 h-5 w-5" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
