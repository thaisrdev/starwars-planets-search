import React, { useEffect, useState } from 'react';
import MyContext from './mycontext';
import getApi from '../api';
// import PropTypes from 'prop-types';

function Provider(props) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getApi();
      const result = results.map((element) => element);
      setPlanets(result);
    };
    fetchData();
  }, []);

  return (
    <MyContext.Provider value={ planets }>
      { props.children }
    </MyContext.Provider>
  );
}

// Provider.propTypes = {
//   children: PropTypes.?.isRequired,
// };

export default Provider;
