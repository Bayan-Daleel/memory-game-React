import { useState, useEffect, useRef } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTecInfo from "./components/AssistiveTecInfo";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";

function App() {
  const initialFormData = { category: "animals-and-nature", number: 10 };
  const [isFirstRender, setIsFirstRender] =useState(true)
  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);
  console.log(isError);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true);
    }
  }, [matchedCards]);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  async function startGame(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`)
      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }
      const data = await response.json();
      const dataSlice = await getDataSlice(data);
      const emojisArray = await getEmojisArray(dataSlice);
      setEmojisData(emojisArray);
      setIsGameOn(true)
    } catch (err) {
      console.error(err);
      setIsError(true)
    }
    finally{
      setIsFirstRender(false)
    }
  }

  function getDataSlice(data) {
    const randomIndicies = getRandomIndices(data);
    const dataSlice = randomIndicies.map((index) => data[index]);
    return dataSlice;
  }

  function getRandomIndices(data) {
    const randomIndicesArray = [];

    for (let i = 0; i < formData.number / 2; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomIndicesArray;
  }
  async function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }
    return pairedEmojisArray;
  }

  function turnCard(name, index) {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  function resetGame() {
    setIsGameOn(false);
    setSelectedCards([]);
    setAreAllCardsMatched(false);
    setMatchedCards([]);
  }

  function resetError() {
    setIsError(false);
  }

  function handleFormChange(e) {
    setFormData(prevFormData => ({...prevFormData, [e.target.name]: e.target.value}))
}
  
  return (
    <main>
        <h1>Memory</h1>
            {!isGameOn && !isError &&
                <Form handleSubmit={startGame} 
                handleChange={handleFormChange} 
                isFirstRender={isFirstRender}/>
            }
            {isGameOn && !areAllCardsMatched &&
                <AssistiveTecInfo emojisData={emojisData} matchedCards={matchedCards} />}
            {areAllCardsMatched && <GameOver handleClick={resetGame} />}
            {isGameOn &&
                <MemoryCard
                    handleClick={turnCard}
                    data={emojisData}
                    selectedCards={selectedCards}
                    matchedCards={matchedCards}
                />
            }
            {isError && <ErrorCard handleClick={resetError} />}
    </main>
  );
}

export default App;
