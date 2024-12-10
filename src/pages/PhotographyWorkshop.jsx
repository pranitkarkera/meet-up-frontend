import React, { useState } from "react";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { IoMdTime } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { FaIndianRupeeSign } from "react-icons/fa6";
import profileIcon from "../profile-icon.jpg";

const PhotographyWorkshop = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error } = useFetch(
    "https://meet-up-backend-self.vercel.app/events"
  );

  console.log("Fetched Data:", data);

  const filteredTopicData = data
    ? data.filter((event) => {
        const isMarketingSeminar =
          event.topic.toLowerCase() === "photography workshop";
        const matchesSearch =
          searchTerm === "" ||
          event.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.title?.toLowerCase().includes(searchTerm.toLowerCase());
        return isMarketingSeminar && matchesSearch;
      })
    : [];

  return (
    <div className="container-fluid">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <hr />
      {loading && <p>Loading events...</p>}
      {error && <p>Error fetching events: {error.message}</p>}
      <div>
        {filteredTopicData.map((event) => (
          <div className="row my-4" key={event._id}>
            <div className="col-6 text-start">
              <div className="container">
                <h1>{event.topic}</h1>
                <p>
                  Hosted By:
                  <br />
                  <b>{event.hostedBy}</b>
                </p>
              </div>

              <div className="card border-0 text-start">
                <img
                  src={event.imageUrl}
                  className="card-img-top rounded"
                  alt={`Event: ${event.topic}`}
                />
                <div className="card-body">
                  <h2>Details:</h2>
                  <p className="card-text">{event.details}</p>
                  <h2>Additional Information:</h2>
                  <p className="card-text">
                    <b>Dress Code:</b> {event.dressCode.join(", ")}
                  </p>
                  <p className="card-text">
                    <b>Age Restrictions:</b> {event.ageRestrictions.join(", ")}
                  </p>
                  <h2>Event Tags:</h2>
                  <span className="badge bg-light text-dark">
                    {event.eventTags.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-6 text-start">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <IoMdTime />
                    </div>
                    <div className="col-11">
                      <p>{event.sessionTiming}</p>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-1">
                      <SlLocationPin />
                    </div>
                    <div className="col-11">
                      <p>{event.venue}</p>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-1">
                      <FaIndianRupeeSign />
                    </div>
                    <div className="col-11">
                      <p>₹{event.pricing}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1>Speakers:</h1>
                <div className="row">
                  {event.speakers.map((speaker, index) => (
                    <div className="col-6" key={index}>
                      <div className="card" style={{ width: "12rem" }}>
                        <img
                          src={profileIcon}
                          className="card-img-top rounded-circle"
                          style={{ height: "120px", width: "120px" }}
                          alt={`Speaker: ${speaker.name}`}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{speaker.name}</h5>
                          <p className="card-text">{speaker.profession}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotographyWorkshop;
