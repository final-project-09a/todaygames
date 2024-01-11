// src/components/GameIntro.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SteamGames {
  name: string;
  description: string;
  // Add more details as needed
}

interface SteamGamesProps {
  appId: string;
}

const SteamGames: React.FC<SteamGamesProps> = ({ appId }) => {
  const [gameInfo, setGameInfo] = useState<SteamGames | null>(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await axios.get<SteamGames>(`/api/gameInfo/76561198122908202`);
        setGameInfo(response.data);
      } catch (error) {
        console.error('Error fetching game info:', error);
      }
    };

    fetchGameInfo();
  }, [appId]);

  if (!gameInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{gameInfo.name}</h2>
      <p>{gameInfo.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default SteamGames;
