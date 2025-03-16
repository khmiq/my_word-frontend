import axios from "axios";
import { toast } from "react-hot-toast";

const DeleteModal = ({ wordId, closeModal, fetchWords }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://m-word-backend-git-main-khmiqs-projects.vercel.app
      /words/${wordId}`);
      toast.success("Word deleted successfully!");
      fetchWords(); // Refresh the word list
      closeModal();
    } catch (error) {
      toast.error("Error deleting word");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded text-center">
        <h2 className="text-lg font-bold">Are you sure?</h2>
        <p className="text-gray-600">This action cannot be undone.</p>
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
          <button onClick={closeModal} className="bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
