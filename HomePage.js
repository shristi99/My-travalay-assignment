import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Componets/Styles/homepage.css'

const TravelAPI = () => {
  const [popularStays, setPopularStays] = useState([]);
  const [propertyName,setPropertyName] = useState([]);
  const [propertyImage,setPropertyImage] = useState([]);
  const [searchType, setSearchType] = useState('byCity');
  const [searchInfo, setSearchInfo] = useState({
    city: '',
    state: '',
    country: '',
    random: 'Select the filter to get the popular stays'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(JSON.stringify(response.data));
  // let yu=response.data
  // console.log("data is" , yu);
  // setPopularStays(yu);

  const fetchData= () =>{
    let data = JSON.stringify({
      "action": "popularStay",
      "popularStay": {
        "limit": 10,
        "entityType": "Any",
        "filter": {
          "searchType": "byRandom",
          "searchTypeInfo": {
            "country": "India"
          }
        }
      }
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.mytravaly.com/testing/v1/',
      headers: { 
        'authtoken': '7eaa8958a9f8047951d1ef23348abc3f', 
        'visitortoken': 'c9a2-928f-f5ef-c319-1c91-2269-18c5-09d8', 
        'Content-Type': 'application/json', 
        'Cookie': 'search_person_id=8ce6911e0ca0f88cc8dfbc2ad73ea25e8650c457'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      return response;
    })
    .then((data) =>{
      const firstProperty= data.data.data
      const array1=[]
      firstProperty.forEach(element => {
        const name=element.propertyName;
        array1.push(name)
        console.log("name" , name);
      });

      setPropertyName(array1)
      
    //iamges
      const array2=[]
      firstProperty.forEach(element =>{
        const image=element.propertyImage;
        array2.push(image)
        console.log("image", image);
      })

      setPropertyImage(array2)
    })
    .catch((error) => {
      console.log(error);
    });

  }

  // console.log("data", data);

  useEffect(() => {
    fetchData();
  }, [searchType,searchInfo]);


  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchInfoChange = (event) => {
    setSearchInfo({
      ...searchInfo,
      [event.target.name]: event.target.value
    });
  };


  return (
   
  <div>  
  <h1>Popular Stays</h1>
  <div>
    <label>
      Search Type:
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="byCity">By City</option>
        <option value="byState">By State</option>
        <option value="byCountry">By Country</option>
        <option value="byRandom">Random</option>
      </select>
    </label>
  </div>
 
  
 
 <div className='card-container'>
  <div className='card'>
  {
     propertyName.map((name) => <h2 className='card-title'>{name}</h2>)
  
  }
     
     {
       propertyImage.map((image) => <img className="card-image" src={image}></img>)
     }
</div>
</div>
     </div>
     
    
  );
};


export default TravelAPI;
