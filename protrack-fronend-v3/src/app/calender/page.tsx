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
          start: "dayGridMonth", 
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
