import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <section id="banner" className="flex justify-between gap-10 items-center mx-10 h-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-5">{title}</h1>
        <p className="w-250">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora,
          sapiente voluptatum alias quisquam perferendis tenetur voluptatem
          delectus ab placeat magni labore vel eius, minima beatae. Quam
          incidunt, eligendi sequi officiis doloremque tempore mollitia
          necessitatibus quia! Voluptatem distinctio dignissimos consequuntur
          necessitatibus! Doloribus explicabo reiciendis deserunt deleniti
          tenetur neque consequatur voluptatum debitis.
        </p>
        </div>
        <img src={imageUrl} alt="" className="h-80"/>

      </section>
    </>
  );
};

export default Hero;
