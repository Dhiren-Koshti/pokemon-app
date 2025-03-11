import React, { useEffect, useState } from "react";

export default function PokemonCards({ name, source }) {
  const [cardData, setCardData] = useState({
    name,
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fphotography&psig=AOvVaw3NQeKdWrFaf1RoeFsw6Ykm&ust=1741779653481000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOiRjYD5gYwDFQAAAAAdAAAAABAE",
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
    <div className="card">
      <img src={cardData.image} alt={cardData.name} className="pokemon-image" />
      <h2 className="pokemon-name">{cardData.name}</h2>
      <div className="pokemon-info">
        <h3>
          Type: <span className="badge">{cardData.types.join(", ")}</span>
        </h3>
        <h3>
          Speed: <span>{cardData.speed} km/h</span>
        </h3>
        <h3>
          Height: <span>{cardData.height} ft</span>
        </h3>
        <h3>
          Weight: <span>{cardData.weight} kg</span>
        </h3>
        <h3>
          Experience: <span>{cardData.experience}</span>
        </h3>
        <h3>
          Abilities: <span className="badge">{cardData.abilities}</span>
        </h3>
      </div>
    </div>
  );
}