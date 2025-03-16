import { useEffect, useState, useRef } from "react";
import axios from "axios";

const WordList = ({ openEditModal }) => {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    fetchWords();
  }, [page]);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://m-word-backend-git-main-khmiqs-projects.vercel.app/words?page=${page}&limit=20`);
      setWords((prevWords) => [...prevWords, ...data.words]);
      localStorage.setItem("words", JSON.stringify([...words, ...data.words]));
    } catch (error) {
      console.error("Error fetching words:", error);
    }
    setLoading(false);
  };

  const lastWordRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div>
      {words.map((word, index) => (
        <div ref={index === words.length - 1 ? lastWordRef : null} key={word._id} className="flex justify-between p-2 border-b border-gray-500">
          <span className="text-navy">{index + 1}. {word.word}</span>
          <div>
            <button onClick={() => openEditModal(word)}>✏️</button>
            <button onClick={() => handleDelete(word._id)}>🗑️</button>
          </div>
        </div>
      ))}
      {loading && <p className="text-navy text-center mt-4">Loading...</p>}
    </div>
  );
};

export default WordList;
