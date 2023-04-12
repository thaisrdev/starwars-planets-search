import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const {
    planets,
    handleFilters,
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    newColumn,
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

  const handleClick = () => {
    handleFilters();
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
          { newColumn.map((element, index) => (
            <option value={ element } key={ index }>{element}</option>
          ))}
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
        { planets.filter((e) => e.name.includes(nameFilter)).map((element) => (

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
