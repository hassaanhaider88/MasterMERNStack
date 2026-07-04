/* Hooks are special Functions introduce in react 16 
 Some Rules
 Name should be start wiht "use" keyword like useFetch, useLocalStorage etc
 followed other hoooks rules


import { useEffect, useRef, useState } from "react";

 const CustomHookLearn = () => {
    const {data,Loading,error} = useFetch("https:dummyjson.com/posts");
    console.log(data,Loading,error)

   const inputRef = useRef();
   const { saveData, getData } = useLocalStorage("country");
   const save = () => {
     saveData(inputRef.current.value);
   };
   return (
     <div>
       <h1>CustomHookLearn</h1>
       <input type="text" ref={inputRef} />
       <button onClick={() => save()}>Store</button>
     </div>
   );
 };

const CustomHookLearn = () => {
   const {data,Loading,error} = useFetch("https:dummyjson.com/posts");
   console.log(data,Loading,error)

  const inputRef = useRef();
  const { getData } = useLocalStorage("country");
  console.log(getData("country"));
  return (
    <div>
      <h1>CustomHookLearn</h1>
      <input type="text" ref={inputRef} />
    </div>
  );
};
export default CustomHookLearn;

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Https error!");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, Loading, error };
};

const useLocalStorage = (key) => {
  const saveData = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getData = () => {
    const storeValue = localStorage.getItem(key);
    return storeValue ? JSON.parse(storeValue) : null;
  };
  return { saveData, getData };
};

 
 */