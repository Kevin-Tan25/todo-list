import React from 'react';
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {
  const { feedback } = useContext(FeedbackContext);
  // Feedback is taken in as context
  if (!feedback || feedback.length === 0) {
    return <p>No data yet</p>;
  }
  return feedback.map((item) => <FeedbackItem key={item.id} item={item} />);
}

export default FeedbackList;
