import React from "react";
import peopleData from "./peopleData";
import "./About.css";
import { FaLinkedin } from "react-icons/fa";

const About: React.FC = () => {
  const handleLinkedInClick = (linkedin:any) => {
    window.open(linkedin, "_blank");
  };

  return (
    <div className="team-container">
    {peopleData.map((person) => (
      <div key={person.id} className="person-card" >
        <img src={person.image} alt={person.name}  />
        <div>
          <h2>{person.name}</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{person.about}</p>
        </div>
        <div className="linkedin-button-container">
          <button onClick={() => handleLinkedInClick(person.linkedin)}>
          <FaLinkedin  /> LinkedIn'e Git
          </button>
        </div>
      </div>
    ))}
  </div>
  );
};
export default About;
