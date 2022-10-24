import React, { useContext } from 'react';
import MyContext from '../context/mycontext';

function Table() {
  const {
    planets,
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    wasClicked,
    setWasClicked,
  } = useContext(MyContext);

  const handleNameFilterChange = ({ target }) => {
    const { value } = target;
    setNameFilter(value);
  };

  const handleColumnFilterChange = ({ target }) => {
    const { value } = target;
    setColumnFilter(value);
  };

  const handleComparisonFilterChange = ({ target }) => {
    const { value } = target;
    setComparisonFilter(value);
  };

  const handleValueFilterChange = ({ target }) => {
    const { value } = target;
    setValueFilter(value);
  };

  const handleFilters = () => {
    const filterMaiorQue = planets
      .filter((element) => Number(element[columnFilter]) > valueFilter);
    const filterMenorQue = planets
      .filter((element) => Number(element[columnFilter]) < valueFilter);
    const filterIgualA = planets
      .filter((element) => element[columnFilter] === valueFilter);
    if (comparisonFilter === 'maior que') {
      return filterMaiorQue;
    } if (comparisonFilter === 'menor que') {
      return filterMenorQue;
    } if (comparisonFilter === 'igual a') {
      return filterIgualA;
    }
  };

  const filtros = () => {
    const planetsFilteredByName = planets
      .filter((element) => element.name.includes(nameFilter));
    if (nameFilter !== '') {
      return planetsFilteredByName;
    } return planets;
  };

  const handleClick = () => {
    setWasClicked(true);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ handleNameFilterChange }
      />

      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          name="column-filter"
          id="column-filter"
          value={ columnFilter }
          onChange={ handleColumnFilterChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          id="comparison-filter"
          value={ comparisonFilter }
          onChange={ handleComparisonFilterChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <input
        type="number"
        data-testid="value-filter"
        id="value-filter"
        value={ valueFilter }
        onChange={ handleValueFilterChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        id="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>

      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>CLimate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        { wasClicked ? handleFilters().map((element, index) => (

          <tbody key={ index }>
            <tr>
              <td>{ element.name }</td>
              <td>{ element.rotation_period }</td>
              <td>{ element.orbital_period }</td>
              <td>{ element.diameter }</td>
              <td>{ element.climate }</td>
              <td>{ element.gravity }</td>
              <td>{ element.terrain }</td>
              <td>{ element.surface_water }</td>
              <td>{ element.population }</td>
              <td>{ element.films }</td>
              <td>{ element.created }</td>
              <td>{ element.edited }</td>
              <td>{ element.url }</td>
            </tr>
          </tbody>
        )) : filtros().map((element) => (

          <tbody key={ element.name }>
            <tr>
              <td>{ element.name }</td>
              <td>{ element.rotation_period }</td>
              <td>{ element.orbital_period }</td>
              <td>{ element.diameter }</td>
              <td>{ element.climate }</td>
              <td>{ element.gravity }</td>
              <td>{ element.terrain }</td>
              <td>{ element.surface_water }</td>
              <td>{ element.population }</td>
              <td>{ element.films }</td>
              <td>{ element.created }</td>
              <td>{ element.edited }</td>
              <td>{ element.url }</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Table;
