import React from "react";
import { useState } from "react";
import {
 Card,
 CardContent,
 List,
 ListItem,
 ListItemText,
 ListItemIcon,
 TextField,
 Button,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import Header from "../components/Header";
import DateTimePicker from "../components/Contest/DateTimePicker";

import { Add, Close } from "@mui/icons-material";

// Sample event data
const events = [
 {
  id: 1,
  name: "Event 1",
  dateTime: "Aug 28, 2023, 2:00 PM",
  location: "Venue 1",
 },
];

const AddEventCard = ({ onSave }) => {
 const [name, setName] = useState("");
 const [dateTime, setDateTime] = useState(new Date());
 const [location, setLocation] = useState("");
 const [participants, setParticipants] = useState("");

 const handleSave = () => {
  onSave({ name, dateTime, location, participants });
  setName("");
  setDateTime(new Date()); // Reset to the current date and time
  setLocation("");
  setParticipants("");
 };

 return (
  <div className="pt-5 bg-white rounded-lg shadow-lg">
   <button className="p-2 rounded-full bg-gray-200 h-8 w-8 text-md text-gray-500 flex items-center justify-center">
    <Close />
   </button>
   <CardContent>
    <List>
     <ListItem>
      <ListItemIcon>
       <EventIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
       <TextField
        label="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
       />
      </ListItemText>
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <LocationOnIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
       <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
       />
      </ListItemText>
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <AccessTimeIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
       <DateTimePicker
        selected={dateTime}
        onChange={(date) => setDateTime(date)}
       />
      </ListItemText>
     </ListItem>
    </List>
    <button
     className="ml-5 bg-pink-600 p-3 text-white rounded-lg shadow-full"
     onClick={handleSave}>
     Add Event
    </button>
   </CardContent>
  </div>
 );
};

function EventCard({ event }) {
 return (
  <Card className="m-2 max-w-sm">
   <CardContent>
    <List>
     <ListItem>
      <ListItemIcon>
       <EventIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={event.name} />
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <AccessTimeIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={event.dateTime} />
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <LocationOnIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={event.location} />
     </ListItem>
     <ListItem>
      <ListItemIcon>
       <GroupIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={`32 people joined`} />
     </ListItem>
    </List>
   </CardContent>
  </Card>
 );
}

function Contests() {
 return (
  <>
   <Header />
   <div className="fixed right-10 bottom-10">
    <button className="w-8 h-8 rounded-full bg-pink-600 text-white">
     <Add />
    </button>
   </div>
   <div className="bg-gray-100 min-h-screen py-8">
    <div className="container mx-auto">
     <div className="flex flex-wrap justify-center">
      <AddEventCard />
      {events.map((event) => (
       <EventCard key={event.id} event={event} />
      ))}
     </div>
    </div>
   </div>
  </>
 );
}

export default Contests;
