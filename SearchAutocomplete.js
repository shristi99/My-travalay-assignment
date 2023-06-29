import axios from "axios"
import { useState } from "react";
// var searchautodata = require("../searchC.json")

const SearchAuto = () => {

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0);

  const onChange = (e) => {
    const searchText = e.target.value;
    setValue(searchText)
    // fetchSuggestions(searchText);
  };

  const onSearch = (searchTerm) => {
    //our api to fetch the search result
    console.log("search",searchTerm);
  }


// const axios = require('axios');
let data = JSON.stringify({
  "action": "searchAutoComplete",
  "searchAutoComplete": {
    "inputText": "indi",
    "searchType": [
      "byCity",
      "byState",
      "byCountry",
      "byRandom",
      "byPropertyName"
    ],
    "limit": 10
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.mytravaly.com/testing/v1/',
  headers: { 
    'authtoken': '7eaa8958a9f8047951d1ef23348abc3f', 
    'visitortoken': 'c9a2-928f-f5ef-c319-1c91-2269-18c5-09d8', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  // console.log(JSON.stringify(response.data));
  return response
})
.then(data => {
  if(data.data.status && data.data.data.present){
    const element=data.data.data
    console.log("data" ,data)
    const autoComplete =  element.autoCompleteList
    let suggestions =[];

    if (autoComplete.byPropertyName.present) {
      suggestions = suggestions.concat(autoComplete.byPropertyName.listOfResult.valueToDisplay);
    }

    if (autoComplete.byStreet.present) {
      suggestions = suggestions.concat(autoComplete.byStreet.listOfResult.valueToDisplay);
    }

    if(autoComplete.byCity.present){
      suggestions = suggestions.concat(autoComplete.byCity.listOfResult.valueToDisplay)
    }

    if(autoComplete.byState.present){
      suggestions= suggestions.concat(autoComplete.byState.listOfResult.valueToDisplay)
    }
  }

  setSuggestions(suggestions)

  console.log("suggestions" , suggestions)
 
  // setSuggestions(data.data.autoCompleteList.byPropertyName.listOfResult);
  // setTotalNumberOfResults(data.data.totalNumberOfResult);
})
.catch((error) => {
  console.log(error);
});


return (
  // <div>
  //   <h1>hello this is auto search complete</h1>
  //   <label for="fname">Search here for popular stays :</label>
  // <input type="text" id="fname" name="fname"/>
  //   <button>Search</button>
  // </div>
  <div>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
    />
    <button onClick={() => onSearch(value)}>Search</button>
    <div className="dropdown">
      {/* {
      data
      .filter(item => {
        const searchTerm= value.toLowerCase();
        const fullName=item.data.autoCompleteList;

      })
      .map(item) => <div>
        {item.data.autoCompleteList}
        </div>} */}
    </div>
    {/* <div>
      {totalNumberOfResults > 0 && (
        <p>Total Results: {totalNumberOfResults}</p>
      )}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleClick(suggestion)}>
            {suggestion.valueToDisplay}
          </li>
        ))}
      </ul>
    </div> */}
  </div>
);


}

export default SearchAuto