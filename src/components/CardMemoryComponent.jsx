import { useEffect, useRef, useState } from "react";

const CardMemory = ({ championName = null }) => {
  const [isSelectCard, setSelectCard] = useState(false);
  const [prevCard, setPrevCard] = useState(null);
  const [nextCard, setNextCard] = useState(null);

  const handlerSelectCard = (nameChampion) => {
    setSelectCard(!isSelectCard);
    if (prevCard == null) {
      setPrevCard(nameChampion);
      return;
    }

    if (nextCard == null) {
      setNextCard(nameChampion);
      return;
    }
  };

  console.log(nextCard);
  console.log(prevCard);

  return (
    <div
      className={
        isSelectCard
          ? "memeory-card-item memory-card-item__select"
          : "memeory-card-item"
      }
      onClick={() => handlerSelectCard(championName)}
    >
      <div className="memeory-card-item__default-front">
        <h3 className="text-kenit">League of Lengends Memory</h3>
      </div>
      <div className="memeory-card-item__image">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_0.jpg`}
          alt={championName}
        />
      </div>
      <div className="memeory-card-item__title">
        <h3 className="text-kenit">{championName}</h3>
      </div>
    </div>
  );
};
export { CardMemory };
