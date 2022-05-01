import React from 'react';
import { CastProps } from '../types';

const Actor = ({ actor }: CastProps) => {
  const { name, profile_path } = actor;
  return (
    <>
      {profile_path && (
        <div className='cast-item'>
          <span>{name}</span>

          <img
            src={`https://image.tmdb.org/t/p/w185/${profile_path}`}
            alt={name}
            width={75}
          />
        </div>
      )}
    </>
  );
};

export default Actor;
