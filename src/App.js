import { useState } from "react";
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);

  async function startGame(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://emojihub.yurace.pro/api/all/category/animals-and-nature"
      );
      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }
      const data = await response.json();
      const dataSlice =await getDataSlice(data);
      const emojisArray= await getEmojisArray(dataSlice)
      setEmojisData(emojisArray);

    } catch (err) {
      console.error(err);
    }
    setIsGameOn(true);
  }
  function getDataSlice(data) {
    const randomIndicies = getRandomIndices(data);
    const dataSlice = randomIndicies.map((index) => data[index]);
    return dataSlice;
  }

  function getRandomIndices(data) {
    const randomIndicesArray = [];

    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomIndicesArray;
  }
  async function getEmojisArray(data){
    const pairedEmojisArray=[...data,...data]
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = pairedEmojisArray[i]
      pairedEmojisArray[i] = pairedEmojisArray[j]
      pairedEmojisArray[j] = temp
  }
    return pairedEmojisArray
  }

  function turnCard(index,name) {
    console.log("Memory card clicked");
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
    </main>
  );
}

export default App;
