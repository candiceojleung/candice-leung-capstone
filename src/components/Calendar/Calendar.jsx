import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Calendar(){
    return(
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={[
          { title: 'Event 1', date: '2025-03-17' },
          { title: 'Event 2', date: '2025-03-18' }
        ]}
        dateClick={handleDateClick}
      />
    );
};

export default Calendar;
