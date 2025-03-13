import React, { useState, useEffect } from "react";
import PokemonCards from "./PokemonCards";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Pokemon() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalLength, setTotalLength] = useState(0);
  const [api, setApi] = useState("https://pokeapi.co/api/v2/pokemon?limit=12");

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await fetch(api);
      const apiData = await response.json();
      setData(data.concat(apiData.results));
      setLoading(false);
      setTotalLength(apiData.count);
      setApi(apiData.next);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="pokemon-container">
      <h1 className="heading">Pokédex</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="search-bar"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchPokemon}
        hasMore={data.length <= totalLength}
        loader={loading && <div className="loader"></div>}
        style={{ overflow: "hidden" }}
      >
        <div className="card-grid">
          {data
            .filter((pokemon) => pokemon.name.includes(search))
            .map((currEle, index) => (
              <PokemonCards key={index} name={currEle.name} source={currEle.url} />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}