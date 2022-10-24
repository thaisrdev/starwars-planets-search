import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './mycontext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

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
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
  }), [
    planets,
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
  ]);

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
