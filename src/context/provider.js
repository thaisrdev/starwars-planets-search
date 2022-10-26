import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './mycontext';

const arrayColumn = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period', 'surface_water'];

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState(arrayColumn[0]);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [newColumn, setNewColumn] = useState(arrayColumn);
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
      setNewColumn(newColumn.filter((element) => element !== columnFilter));
      setColumnFilter(newColumn[0]);
    } if (comparisonFilter === 'menor que') {
      const results = planets
        .filter((element) => Number(element[columnFilter]) < valueFilter);
      setPlanets(results);
      setNewColumn(newColumn.filter((element) => element !== columnFilter));
      setColumnFilter(newColumn[0]);
    } if (comparisonFilter === 'igual a') {
      const results = planets
        .filter((element) => element[columnFilter] === valueFilter);
      setPlanets(results);
      setNewColumn(newColumn.filter((element) => element !== columnFilter));
      setColumnFilter(newColumn[0]);
    }
  }, [comparisonFilter, columnFilter, planets, valueFilter, newColumn]);

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
    newColumn,
    setNewColumn,
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
    newColumn,
    setNewColumn,
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
