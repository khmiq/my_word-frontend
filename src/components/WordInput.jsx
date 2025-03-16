import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const WordInput = ({ fetchWords }) => {
  const [word, setWord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word.trim()) {
      toast.error("Word cannot be empty!");
      return;
    }

    try {
      const res = await axios.post("https://backend-1teef6xz4-khmiqs-projects.vercel.app/words", { word });
      toast.success("Word added successfully!");
      setWord(""); // Clear input
      fetchWords(); // Refresh word list
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding word");
    }
  };

  return (
    <div className="p-4 bg-navy text-white rounded-lg">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
          className="p-2 rounded text-black outline-none"
          
        />
        <button type="submit" className="bg-white text-navy p-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
};

export default WordInput;
