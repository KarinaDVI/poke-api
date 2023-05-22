import React, { useEffect, useState } from 'react';

const ApiAbs = ({ id }) => {
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setAbilities(data.abilities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAbilities();
  }, [id]);

  return (
    <div>
      <h3>Abilities:</h3>
      <ul>
        {abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiAbs;