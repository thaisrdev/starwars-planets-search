import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './mycontext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('https://swapi.dev/api/planets');
      const { results } = await request.json();
      const planetas = results.filter((element) => element !== element.residents);
      setPlanets(planetas);
    };
    fetchData();
  }, []);

  const contextValue = useMemo(() => ({
    planets,
  }), [planets]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
