import React, { useState} from 'react'
import { MultiSelect } from 'react-multi-select-component';
import countries from './multiselect.json'

// Define a state variable for the selected countries
const dictionary = countries.countries

const DisabledPage = () => {
    // Define a state variable for the selected countries
    const [selected, setSelected] = useState([]);

    // Render the multi-select component
    return (
      <div>
 
        <MultiSelect 
        
          options={dictionary}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          disabled
        />
      </div>
    );
  };
  
  export default DisabledPage;