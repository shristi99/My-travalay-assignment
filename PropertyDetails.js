import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const PropertyDetails = (property) => {

    const [propertyName,setPropertyName] = useState([]);
    const [propertyImage,setPropertyImage] = useState([]);

     
    let data = JSON.stringify({
      "action": "getPropertyDetails",
      "getPropertyDetails": {
        "propertyCode": "TCJsjPbc"
      }
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.mytravaly.com/testing/v1/',
      headers: { 
        'authtoken': ' 7eaa8958a9f8047951d1ef23348abc3f', 
        'visitortoken': 'c9a2-928f-f5ef-c319-1c91-2269-18c5-09d8', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      return response
    })
    .then(data =>{
       console.log("data", data.data.data)
       const element=data.data.data
       const name=element.propertyName
       const propertyAddress= element.propertyAddress
       const propertyType=element.propertyType
       const image= element.propertyImage

       console.log("property name" ,name);
       console.log("propertryType" , propertyType);
       console.log("property address" , propertyAddress)

    //    setPropertyName(name)
    //    setPropertyImage(image)
    
    })
    .catch((error) => {
      console.log(error);
    });

     
  return (
   
    <div>
        PropertyDetails
        <h1>Here are the property details</h1>    
        <p>{propertyName}</p>
        <img src= {propertyImage}/>
        
        </div>
  )
}

export default PropertyDetails