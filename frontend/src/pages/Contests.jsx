import React from "react";
import {
 Card,
 CardContent,
 Typography,
 List,
 ListItem,
 ListItemText,
 ListItemIcon,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import Header from "../components/Header";

import { Add } from "@mui/icons-material";

// Sample event data
const events = [
 {
  id: 1,
  name: "Event 1",
  dateTime: "Aug 28, 2023, 2:00 PM",
  location: "Venue 1",
 },
];

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
      <ListItemText primary="Participants:" />
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
   <div className="bg-gray-100 min-h-screen py-8">
    <div className="container mx-auto">
     <div className="flex flex-wrap justify-center">
      <Card className="m-2 max-w-sm flex flex-col items-center justify-center text-center">
       <CardContent>
        <div className="h-8 w-8 rounded-full bg-gray-300 opacity-30">
         <Add className="text-pink-600 text-6xl" />
        </div>
        <Typography variant="h6">Add Contest</Typography>
       </CardContent>
      </Card>
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
