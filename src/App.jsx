import "./App.css";
import { CardMemory } from "./components/CardMemoryComponent.jsx";
import { useEffect, useState } from "react";

const App = () => {
  const [champion, setChampions] = useState([]);
  const [randCards, setCardsRandValues] = useState([]);
  const numberChampionRand = (maxLength) => {
    let count = 3;
    let numbers = [];
    while (count > 0) {
      let randNumber = Math.floor(Math.random() * (maxLength - 0) + 0);
      numbers.push(randNumber);
      count--;
    }
    return numbers;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const autoAssign = () => {
    let assign = [0, 1, 2, 2, 1, 0];
    let values = shuffleArray(assign);
    setCardsRandValues(values);
  };

  const getLeagueAPI = async (URL) => {
    let response = await fetch(URL).catch((error) => {
      console.log(error);
    });
    let champions = await response.json();
    let allChampions = await Object.values(champions.data);
    let getChampionNumber = numberChampionRand(allChampions.length);
    setChampions([
      allChampions[getChampionNumber[0]],
      allChampions[getChampionNumber[1]],
      allChampions[getChampionNumber[2]],
    ]);
  };

  useEffect(() => {
    getLeagueAPI(
      "https://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion.json"
    );
    sessionStorage.removeItem("cards");
    autoAssign();
  }, []);

  if (champion.length == 0) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          color: "#FFF",
        }}
      >
        <h2 className="text-kenit">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="memory-card-container">
        <div className="grid-row">
          {randCards.map((value, index) => (
            <div className="memory-card-position-right" key={index}>
              <CardMemory championName={champion[value].id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { App };
