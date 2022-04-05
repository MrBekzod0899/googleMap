import React, { useState,useContext } from "react";
import { TileLayer, Polygon, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {iconMarker} from './Icon'
import { countries } from "./countries";
import { MyContext } from "./mycontext";


export default function MapData() {
  const [name, setName] = useState("");
  const [countryInfo, setCountryInfo] = useState([]);
  const [borderCountry, setBorderCountry] = useState([]);
  const {dispatch}=useContext(MyContext)
  const [position,setPosition]=useState(['',''])

 useMapEvents({
    click: async (e) => {
      let aside=document.querySelector('aside')
      aside.classList.add('show')
      let mapContainer=document.querySelector('.leaflet-container')
      mapContainer.classList.toggle('show')
      await getCountryName(e.latlng.lat, e.latlng.lng);
    },
  });
  
  const getCountryName = async (lat, lng) => {
    setPosition([lat,lng])
    try {
      const res = await fetch(
        `http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_MAP_KEY}&query=${lat},${lng}`
      );
      const data = await res.json();
        setName(data.data[0].country);
        await getCountryBorder(data.data[0].country);

    } catch (err) {
      console.log(err)
    }
  };

  const getCountryBorder = async (namecountry) => {
    setBorderCountry([]);
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${namecountry}`
    );
    const info = await res.json();
    dispatch({type:'GET_DATA',payload:{info,position}})
    setCountryInfo(info);  
    if (info[0].borders !== "") {
      info[0].borders.forEach((border,index) => {
        let country = countries.filter((item) => item["alpha-3"] === border);
          if(country){
            let coordinates =  country[0].geoJSON.coordinates[0].map((item) => [item[1], item[0]]);
            setBorderCountry((prev) => [...prev, coordinates]);    
          }
      });
    }
  };
  let country = countries.filter((item) => item.name === name);
  let coordinates = country[0] && country[0].geoJSON.coordinates[0].map((item) =>  [item[1], item[0]]);
  return (
    <>
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=w4htmIlg8iGXBPzOtHlC"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        position !== "" && 
          <Marker 
              position={position}
              icon={iconMarker}
          >
            <Popup>
              {countryInfo && countryInfo.name}
            </Popup>
        </Marker>
      }
      {coordinates && (
        <Polygon
          pathOptions={{
            fillColor: "green",
            fillOpacity: 0.7,
            weight: 2,
            opacity: 1,
            dashArray: 3,
            color: "white",
          }}
          positions={coordinates}
          eventHandlers={{
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({
                dashArray: "",
                fillColor: "blue",
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                color: "white",
              });
            },
            mouseout: (e) => {
              const layer = e.target;
              layer.setStyle({
                fillOpacity: 0.7,
                weight: 2,
                dashArray: "3",
                color: "white",
                fillColor: "green",
              });
            },
            click: (e) => {},
          }}
        />
      )}
      {borderCountry &&
        borderCountry.map((coordinates,index) => {
          return (
            <Polygon
              key={index}
              pathOptions={{
                fillColor: "#FD8D3C",
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                dashArray: 3,
                color: "white",
              }}
              positions={coordinates}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    dashArray: "",
                    fillColor: "#BD0026",
                    fillOpacity: 0.7,
                    weight: 2,
                    opacity: 1,
                    color: "white",
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    weight: 2,
                    dashArray: "3",
                    color: "white",
                    fillColor: "#FD8D3C",
                  });
                },
                click: (e) => {},
              }}
            />
          );
        })}
    </>
  );
}
