'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';


interface Event {
  title: string;
  start: Date | string;
  allday: boolean;
  id: number;
}

const Home = () => {
  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-green-200 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin
            ]}
            headerToolbar={{
              left: 'prev, next today',
              center: 'title',
              right: 'resourceTimeLineWook, dayGridMonth, timeGridWeek'
            }}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home