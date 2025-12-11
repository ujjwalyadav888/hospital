import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={"wellcome to deni deni Hospital"}
        imageUrl={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRymF4Am_crLSm_gi5M_VyYyHDvJ-nhdpaVnw&s"
        }
      />
      <Biography 
      title={"this is bio of the hospital"}
      />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
