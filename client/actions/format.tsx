import React from "react";

export function formatRelativeTimeOrSpecificDate(date: Date) {
    const announcementDate = date;
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return ''; // Handle the case where the input is not a valid Date object
      }
    const currentDate = new Date();
  
    const timeDifferenceInMilliseconds = currentDate.getTime() - announcementDate.getTime();
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  
    const intervals: Record<string, number> = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
  
    for (const intervalKey in intervals) {
      if (Object.prototype.hasOwnProperty.call(intervals, intervalKey)) {
        const interval = intervalKey as keyof typeof intervals;
        const value = Math.floor(timeDifferenceInSeconds / intervals[interval]);
        if (value >= 1) {
          return value === 1
            ? `1 ${interval} ago`
            : `${value} ${interval}s ago`;
        }
      }
    }
  
    const twoWeeksInMillis = 2 * 7 * 24 * 60 * 60 * 1000;
    if (timeDifferenceInMilliseconds > twoWeeksInMillis) {
      return announcementDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }) + ' ' + announcementDate.toLocaleDateString('en-US');
    }
  
    return announcementDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }) + ' ' + announcementDate.toLocaleDateString('en-US', {
      weekday: 'short',
    });
}

export function formatTextWithLineBreaks(text: string) {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}