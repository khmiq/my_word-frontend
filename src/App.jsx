import { Toaster } from "react-hot-toast";
import WordInput from "./components/WordInput";
import WordList from "./components/WordList";
import { useState } from "react";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal"; // Import DeleteModal

function App() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = (word) => {
    setSelectedWord(word);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (wordId) => {
    setSelectedWord({ _id: wordId });
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <Toaster position="top-center" />
      <h1 className="text-navy text-2xl mb-4">Word Manager</h1>
      <WordInput fetchWords={() => {}} />
      <WordList openEditModal={openEditModal} openDeleteModal={openDeleteModal} />
      
      {isEditModalOpen && (
        <EditModal
          word={selectedWord}
          closeModal={() => setIsEditModalOpen(false)}
        />
      )}
      
      {isDeleteModalOpen && (
        <DeleteModal
          wordId={selectedWord._id}
          closeModal={() => setIsDeleteModalOpen(false)}
          fetchWords={() => {}} // Pass fetchWords function if needed
        />
      )}
    </div>
  );
}

export default App;
