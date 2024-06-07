'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js';


interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

const Home = () => {
  const [events, setEvents] = useState([
    {title: 'event1', id: 1},
    {title: 'event2', id: 2},
    {title: 'event3', id: 3},
    {title: 'event4', id: 4},
    {title: 'event5', id: 5},
    {title: 'event6', id: 6},
  ]);

const [allEvents, setAllEvents] = useState<Event[]>([]);
const [showModal, setShowModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [idToDelete, setIdToDelete] = useState<number | null>(null);
const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    allday: false,
    id: 0
  })


useEffect(() => {
  let draggableEl = document.getElementById('draggable-el');
  if (draggableEl) {
    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        let title = eventEl.getAttribute('title');
        let id = eventEl.getAttribute('data');
        let start = eventEl.getAttribute('start');
        return { title, id, start }
      }
    })
  }

},[]);

function handleDateClick(arg: {date: Date, allDay: boolean}) {
  setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() });
  setShowModal(true);
}

function addEvent(data: DropArg) {
  const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime() }
  setAllEvents([...allEvents, event])
}

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

            events={allEvents as EventSourceInput}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            drop={(data) => addEvent(data)}
            />
          </div>
          <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-1 lg:h-3/4 bg-green-100">
            <h2 className="font-boled text-lg text-center">Drag Event</h2>
            {events.map(event => (
              <div
                className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white hover:bg-blue-400'
                title={event.title}
                key={event.id}
              >{event.title}</div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;
