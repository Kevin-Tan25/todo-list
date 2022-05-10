import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    // The item we are editing
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // need to understand what this does
  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:8000/feedback?_sort=rating&_order=desc`
    );
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };
  const addFeedback = async (newFeedback) => {
    const response = await fetch('http://localhost:8000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`http://localhost:8000/feedback/${id}`, { method: 'DELETE' });

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // edit item
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  // update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
      // why is spread needed here?
    );
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
      // editFeedback is the function
      // feedbackEdit is the state that holds the object and the boolean
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
