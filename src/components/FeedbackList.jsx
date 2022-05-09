import React from 'react';
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';
import Spinner from './shared/Spinner';

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext);
  // Feedback is taken in as context
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No data yet</p>;
  }
  return isLoading ? (
    <Spinner />
  ) : (
    feedback.map((item) => <FeedbackItem key={item.id} item={item} />)
  );
}

export default FeedbackList;
