import { useEffect, useState } from "react";
//import { fetchRandomWord } from "../../wordRequest"; //importing api request

const Word = () => {
  //for displaying word onto screen
  const [randomWord, setRandomWord] = useState(null);
  const apiKey = import.meta.env.VITE_APIKEY || process.env.API_Key; //retrives api key

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://wordsapiv1.p.rapidapi.com/words/?random=true";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      };
      //first get api
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setRandomWord(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log(randomWord);
  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center">
      <h1>Random Word:</h1>
      {randomWord && <p>{randomWord.word}</p>}
      <h1>Definition:</h1>
      {randomWord && randomWord.results && randomWord.results.length > 0 ? ( // checks to see if there is a definition in results
        <p>{randomWord.results[0].definition}</p>
      ) : (
        <p>No definition available</p>
      )}
    </div>
  );
};

export default Word;
