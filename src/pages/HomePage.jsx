import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = ({ selectedType, setSelectedType, searchTerm }) => {
  const { data, loading, error } = useFetch(
    "https://meet-up-backend-self.vercel.app/events"
  );

  // Log the fetched data
  console.log("Fetched Data:", data);

  const filteredData = data
    ? data.filter((event) => {
        const matchesType =
          selectedType === "Select Event Type" ||
          event.eventMode.includes(selectedType);
        const matchesSearch =
          event.topic.toLowerCase().includes(searchTerm) ||
          event.title?.toLowerCase().includes(searchTerm);
        return matchesType && matchesSearch;
      })
    : [];

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <h1>Meetup Events</h1>
        <div className="row">
          <div className="col-12">
            <select
              id="selectType"
              className="form-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Select Event Type">Select Event Type</option>
              <option value="Online Event">Online</option>
              <option value="Offline Event">Offline</option>
            </select>
          </div>
        </div>

        {loading && <p>Loading events...</p>}
        {error && <p>Error fetching events: {error.message}</p>}
        <div className="row">
          {filteredData.map((event) => (
            <div className="col-md-4 mb-4" key={event.id}>
              <div className="card border border-0">
                <Link
                  to={`/event/${event._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span
                    className="badge text-bg-light fw-normal position-absolute"
                    style={{ top: "40px", left: "40px" }}
                  >
                    {event.eventMode.includes("Online Event")
                      ? "Online Event"
                      : "Offline Event"}
                  </span>
                  <img
                    src={event.imageUrl}
                    className="card-img-top rounded"
                    alt={`Event: ${event.topic}`} // Use a descriptive alt text
                  />
                  <div className="card-body">
                    <p className="card-text">{event.sessionTiming}</p>
                    <h5 className="card-title">{event.topic}</h5>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HomePage;
