"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import Navbar from "../components/navbar/navbar";
import { events } from "../data/data";

const page = () => {
  return (
    <div>
      <Navbar />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "dayGridMonth", // will normally be on the left. if RTL, will be on the right
          // start: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "today prev,next", 
        }}
        events={[...events]}
        height={"90vh"}
      />
    </div>
  );
};
export default page;
