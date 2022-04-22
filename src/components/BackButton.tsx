import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button className='movie_button' onClick={goBack}>
      Go Back To Search
    </Button>
  );
};

export default BackButton;
