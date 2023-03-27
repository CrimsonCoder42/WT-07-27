import React, { useState} from 'react'
import { MultiSelect } from 'react-multi-select-component';
import countries from './multiselect.json'

// Access the 'countries' array from the imported JSON file
const dictionary = countries.countries

const Page = () => {

    // Declare a state variable 'selected' and a function to update it 'setSelected'
    const [selected, setSelected] = useState([]);
  
    return (
      <div>
 
        <MultiSelect 
        
          options={dictionary}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          
        />
      </div>
    );
  };
  
  export default Page;