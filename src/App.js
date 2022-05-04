import Header from './components/Header';
import FeedbackItem from './components/FeedbackItem';
import FeedbackData from './data/FeedbackData';
import FeedbackList from './components/FeedbackList';
import { useState } from 'react';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import { v4 as uuidv4 } from 'uuid';
// generates unique ID

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);
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
  return (
    <>
      <Header />
      <div className='container'>
        <FeedbackForm handleAdd={addFeedback} />
        {/* access the additional feedback in Feedback form */}
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
        {/* prop drilling. have to put deleteFeedback in main App because this is where statehook is used */}
      </div>
    </>
  );
}

export default App;
