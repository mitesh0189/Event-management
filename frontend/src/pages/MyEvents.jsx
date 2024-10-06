import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons from react-icons
import api from "../api/api"; // Assuming your Axios instance is in utils/api.js

// Base URL for the backend (adjust if necessary)
const BASE_URL = "https://event-management-aq3j.onrender.com"; // Ensure this matches your backend's URL

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch the user's events
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get("/events/my-events");
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.response?.data || error.message); // For debugging
        setError("Error fetching events");
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, []);

  // Handle delete event
  const handleDelete = async (eventId) => {
    try {
      if (window.confirm("Are you sure you want to delete this event?")) {
        await api.delete(`/events/${eventId}`);
        setEvents(events.filter((event) => event._id !== eventId)); // Remove the deleted event from the list
        alert("Event deleted successfully");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to delete event");
    }
  };

  // Navigate to the edit event page
  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`); // Assume you have an edit page for events
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">My Events</h2>
      {events.length === 0 ? (
        <p>You have not created any events yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <li
              key={event._id}
              className="bg-white shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              {/* Display the image */}
              {event.imageUrl && (
                <img
                  src={`${BASE_URL}${event.imageUrl}`} // Full image URL
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}

              <div className="p-6">
                {/* Event Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h2>

                {/* Event Date */}
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Date: </span>
                  {new Date(event.date).toLocaleDateString()}
                </p>

                {/* Event Location */}
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Location: </span>
                  {event.location}
                </p>

                {/* RSVPed Users */}
                <p className="text-gray-800 font-semibold mb-4">
                  Enrolled User For this Event:
                </p>
                {event.attendees.length > 0 ? (
                  <ul className="text-gray-600 list-disc list-inside">
                    {event.attendees.map((attendee) => (
                      <li key={attendee._id}>{attendee.username}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No users have RSVPed yet.</p>
                )}

                {/* Edit and Delete Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => handleEdit(event._id)}
                    className="flex items-center hover:border-blue-500 justify-center border text-blue-500 px-4 py-2 rounded-md transition-transform transform  active:scale-95"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex items-center hover:border-red-500 justify-center border text-red-500 px-4 py-2 rounded-md transition-transform transform  active:scale-95"
                  >
                    <FaTrashAlt className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
