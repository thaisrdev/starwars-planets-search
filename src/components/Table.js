import React, { useContext } from 'react';
import MyContext from '../context/mycontext';

function Table() {
  const { nameFilter, setNameFilter, planets } = useContext(MyContext);

  const filtros = () => {
    const planetsFilteredByName = planets
      .filter((element) => element.name.includes(nameFilter));
    if (nameFilter !== '') {
      return planetsFilteredByName;
    }
    return planets;
  };

  const handleNameFilterChange = ({ target }) => {
    const { value } = target;
    setNameFilter(value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ handleNameFilterChange }
      />
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
        { filtros().map((element, index) => (

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
        ))}
      </table>
    </div>
  );
}

export default Table;
