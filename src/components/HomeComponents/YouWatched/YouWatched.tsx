import React from "react";
import Card from "@/components/UI/Card/Card";

interface IWatchedProps {
  data: any[];
}

const YouWatched = ({ data }: IWatchedProps) => {
  return (
    <section className="youWatched">
      <div className="container">
        <h1 className="sections__title">Вы смотрели</h1>
      </div>
      <div className="cards">
        {data.map((item, index) => (
          <Card cardData={item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default YouWatched;
