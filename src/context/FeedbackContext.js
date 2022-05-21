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
      `http://localhost:8000/feedback?_sort=rating&_order=desc`,
      {
        mode: 'no-cors',
      }
    );
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };
  const addFeedback = async (newFeedback) => {
    const response = await fetch('http://localhost:8000/feedback', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        // specifies the application type
        'Content-Type': 'application/json',
      },
      // converts to JSON
      body: JSON.stringify(newFeedback),
    });

    // returns the new object created in json
    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`http://localhost:8000/feedback/${id}`, {
        mode: 'no-cors',
        method: 'DELETE',
      });

      // returns all items in list MINUS the id that we are passing in
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
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      mode: 'no-cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    // NOTE: no need to spread data and item
    setFeedback(feedback.map((item) => (item.id === id ? data : item)));

    setFeedbackEdit({
      item: {},
      edit: false,
    });
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
