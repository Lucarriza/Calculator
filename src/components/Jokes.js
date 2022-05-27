import React from "react";
import axios from "axios";

const [jokes, setJokes] = useState();
const [notFound, setNotFound] = useState(false);

useEffect(() => {
  let jokeApi = "https://v2.jokeapi.dev/joke/Any";
  axios
    .get(jokeApi)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data.message) {
        setNotFound(true);
        setJokes();
      } else {
        if (parseInt(numberJokes) === 1) {
          setJokes([data]);
        } else {
          setJokes(data.jokes);
        }
        setNotFound(false);
      }
    })
    .catch((error) => console.log(error));
}, []);

export default jokes;
