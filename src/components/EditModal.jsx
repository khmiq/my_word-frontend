import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditModal = ({ word, closeModal }) => {
  const [newWord, setNewWord] = useState(word.word);

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://backend-1teef6xz4-khmiqs-projects.vercel.app/words/${word._id}`, {
        word: newWord,
      });
      toast.success("Word updated!");
      closeModal();
    } catch (error) {
      toast.error("Error updating word");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2>Edit Word</h2>
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          className="border p-2"
        />
        <div className="mt-4 flex gap-2">
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2">
            Update
          </button>
          <button onClick={closeModal} className="bg-gray-400 p-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
