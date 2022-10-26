import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './mycontext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('https://swapi.dev/api/planets');
      const { results } = await request.json();
      const planetas = results.filter((element) => element !== element.residents);
      setPlanets(planetas);
      setInitialState(planetas);
    };
    fetchData();
  }, []);

  const handleFilters = useCallback(() => {
    if (comparisonFilter === 'maior que') {
      const results = planets
        .filter((element) => Number(element[columnFilter]) > valueFilter);
      setPlanets(results);
    } if (comparisonFilter === 'menor que') {
      const results = planets
        .filter((element) => Number(element[columnFilter]) < valueFilter);
      setPlanets(results);
    } if (comparisonFilter === 'igual a') {
      const results = planets
        .filter((element) => element[columnFilter] === valueFilter);
      setPlanets(results);
    }
  }, [comparisonFilter, columnFilter, planets, valueFilter]);

  const contextValue = useMemo(() => ({
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    initialState,
    setInitialState,
    handleFilters,
  }), [
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    initialState,
    setInitialState,
    handleFilters,
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
