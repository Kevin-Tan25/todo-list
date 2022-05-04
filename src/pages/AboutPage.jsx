import React from 'react';
import Card from '../components/shared/Card';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <Card>
      <div className='about'>
        <h1>About This Project</h1>
        <h2>
          This is a React project to leave feedback. Learned from an online
          tutorial.
        </h2>
        <p>
          <Link to='/'>Back to Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
