import { useEffect, useRef, useState } from "react";

const CardMemory = ({ championName = null }) => {
  const [isSelectCard, setSelectCard] = useState(false);
  const [prevCard, setPrevCard] = useState(false);
  //const [nextCard, setNextCard] = useState(null);

  const handlerSelectCard = (nameChampion) => {
    setSelectCard(!isSelectCard);
    if (sessionStorage.getItem("cards") == null) {
      sessionStorage.setItem("cards", JSON.stringify([nameChampion]));
      return;
    }

    if (sessionStorage.getItem("cards").length > 0) {
      let data = JSON.parse(sessionStorage.getItem("cards"));
      let addNewChampion = [...data, nameChampion];
      sessionStorage.setItem("cards", JSON.stringify(addNewChampion));
    }
    checkCombinationCard();
  };

  const checkCombinationCard = () => {
    let data = JSON.parse(sessionStorage.getItem("cards"));
    if (data != null) {
      if (data.length == 2 || data != null) {
        if (data[0] === data[1]) {
          console.log("encontrado");
          sessionStorage.removeItem("cards");
        } else {
          console.log("no en encontrado");
          sessionStorage.removeItem("cards");
          setTimeout(() => {
            setSelectCard(isSelectCard);
            setTimeout(() => {
              let allCards = document.querySelectorAll(
                ".memory-card-item__select"
              );
              console.log(allCards);
              allCards[0].classList.remove("memory-card-item__select");
            }, 1200);
          }, 1500);
        }
      }
    }
  };

  return (
    <div
      className={
        isSelectCard
          ? "memory-card-item memory-card-item__select"
          : "memory-card-item"
      }
      onClick={() => handlerSelectCard(championName)}
    >
      <div className="memory-card-item__default-front">
        <h3 className="text-kenit">League of Lengends Memory</h3>
      </div>
      <div className="memory-card-item__image">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_0.jpg`}
          alt={championName}
        />
      </div>
      <div className="memory-card-item__title">
        <h3 className="text-kenit">{championName}</h3>
      </div>
    </div>
  );
};
export { CardMemory };
