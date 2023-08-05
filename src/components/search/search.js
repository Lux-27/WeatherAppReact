import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../Api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  async function loadOptions(inputValue) {
    // return fetch(
    //     `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
    //     geoApiOptions
    //   )
    //     .then ((response) => response.json());
    //     .then((response) => {
    //     return {
    //         options: response.data.map((city) =>{
    //             return{
    //                 value: `${city.latitude} ${city.longitude}`,
    //                 label: `${city.name}, ${city.countryCode}`,
    //             };
    //         }),
    //     };
    //   })
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name} , ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
