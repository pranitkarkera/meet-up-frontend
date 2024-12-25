import React, { useState } from "react";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { IoMdTime } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { FaIndianRupeeSign } from "react-icons/fa6";
import profileIcon from "../profile-icon.jpg";

const MarketingSeminar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error } = useFetch(
    "https://meet-up-backend-self.vercel.app/events"
  );

  console.log("Fetched Data:", data);

  const filteredTopicData = data
    ? data.filter((event) => {
        const isMarketingSeminar =
          event.topic.toLowerCase() === "marketing seminar";
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
          <div className="row" key={event._id} style={{ display: "flex" }}>
            <div className="col-md-6" style={{ textAlign: "left" }}>
              <div>
                <h1>{event.topic}</h1>
                <p>
                  {" "}
                  Hosted By: <br /> <b>{event.hostedBy}</b>
                </p>
              </div>

              <div style={{ textAlign: "left" }}>
                <img
                  style={{ width: "100%" }}
                  src={event.imageUrl}
                  alt={`Event: ${event.topic}`}
                />
                <div className="mt-3">
                  <h3>Details:</h3>
                  <p>{event.details}</p>
                  <h3>Additional Information:</h3>
                  <p>
                    <b>Dress Code:</b> {event.dressCode.join(", ")}
                  </p>
                  <p>
                    <b>Age Restrictions:</b> {event.ageRestrictions.join(", ")}
                  </p>
                  <h3>Event Tags:</h3>
                  <div className="tag-container">
                    {event.eventTags.map((tag, index) => (
                      <div className="tag-section" key={index}>
                        <span className="rounded-pill bg-body-tertiary py-2 pe-2 ps-2">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="bg-body-tertiary"
                style={{
                  border: "2px",
                  borderRadius: "1rem",
                  marginTop: "1rem",
                }}
              >
                <div style={{ paddingLeft: "2rem" }}>
                  <div className="pt-3" style={{ display: "flex" }}>
                    <div className="pe-2">
                      <IoMdTime />
                    </div>
                    <div>
                      <p>{event.sessionTiming}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div className="pe-2">
                      <SlLocationPin />
                    </div>
                    <div>
                      <p>{event.venue}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div className="pe-2">
                      <FaIndianRupeeSign />
                    </div>
                    <div>
                      <p>₹{event.pricing}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{ marginTop: "2rem" }}>
                <div className="col-md-12">
                  <h3 style={{ textAlign: "left" }}>
                    Speakers:{" "}
                    {event.speakers.length > 0
                      ? `(${event.speakers.length})`
                      : ""}{" "}
                  </h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {event.speakers.map((speaker, index) => (
                    <div key={index}>
                      <div
                        className="card py-2"
                        style={{
                          margin: "0 0.5rem",
                          flex: "1 1 45%",
                          maxWidth: "200px",
                        }}
                      >
                        <div>
                          <img
                            src={profileIcon}
                            style={{ width: "100%", height: "auto" }}
                            alt={`Speaker: ${speaker.name}`}
                          />
                          <div>
                            <h5>{speaker.name}</h5>
                            <p>{speaker.profession}</p>
                          </div>
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

export default MarketingSeminar;
