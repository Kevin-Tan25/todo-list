import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is an example feedback item',
      rating: 10,
    },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    // The item we are editing
    edit: false,
  });
  // delete feedback
  const deleteFeedback = (id) => {
    // deleteFeedback takes in prop id because FeedbackItem returns item.id
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
      // id is given from FeedbackItem
    }
  };
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    // setFeedback = [newFeedback, ...feedback];
    console.log(newFeedback);
    setFeedback([newFeedback, ...feedback]);
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
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
