import React from 'react';
import Card from './shared/Card';
import { useState } from 'react';
import Button from './shared/Button';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleTextChange = (e) => {
    if (text === '') {
      setMessage(null);
      setBtnDisabled(true);
    } else if (text.trim() !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters');
      setBtnDisabled(true);
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters');
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };
  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>
        <div className='input-group'>
          <input
            type='text'
            onChange={handleTextChange}
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
        {/* If there is message then outputs message */}
      </form>
    </Card>
  );
}

export default FeedbackForm;
