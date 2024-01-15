import React from 'react';
import GenreCard from './GenreCard';

interface GenreFilterProps {
  mostPlayedGames: any;
}

const GenreFilter = ({ mostPlayedGames }: GenreFilterProps) => {
  console.log(mostPlayedGames);

  return (
    <div>
      <GenreCard />
    </div>
  );
};

export default GenreFilter;
