import React, { useEffect, useState } from "react";

export default function PokemonCards({ name, source }) {
  const [cardData, setCardData] = useState({
    name,
    image: "https://via.placeholder.com/150",
    height: "",
    weight: "",
    speed: "",
    experience: "",
    types: [],
    abilities: "",
  });

  const getCardData = async () => {
    try {
      const response = await fetch(source);
      const data = await response.json();
      setCardData({
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        height: data.height,
        weight: data.weight,
        experience: data.base_experience,
        types: data.types.map((currEle) => currEle.type.name),
        speed: data.stats[1].base_stat,
        abilities: data.abilities[0].ability.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, [source]);

  return (
    <div className="pokemon-card">
      <div className="card-inner">
        <div className="card-front">
          <img
            src={cardData.image}
            alt={cardData.name}
            className="pokemon-image"
          />
          <h2 className="pokemon-name">{cardData.name}</h2>
          <div className="pokemon-types">
            {cardData.types.map((type, index) => (
              <span key={index} className={`type-badge type-${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
        <div
          className="card-back"
          style={{
            background: `linear-gradient(
      145deg,
      rgba(68, 68, 68, 0.9),
      rgba(34, 34, 34, 0.9)
    ), url(${cardData.image})`,
          }}
        >
          <div className="stat">
            <span className="stat-label">Height</span>
            <div className="stat-bar">
              <div
                className="stat-progress"
                style={{ width: `${(cardData.height / 20) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="stat">
            <span className="stat-label">Weight</span>
            <div className="stat-bar">
              <div
                className="stat-progress"
                style={{ width: `${(cardData.weight / 1000) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="stat">
            <span className="stat-label">Speed</span>
            <div className="stat-bar">
              <div
                className="stat-progress"
                style={{ width: `${(cardData.speed / 150) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="stat">
            <span className="stat-label">Experience</span>
            <div className="stat-bar">
              <div
                className="stat-progress"
                style={{ width: `${(cardData.experience / 300) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
