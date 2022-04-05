import React,{useContext,useRef,useEffect} from "react";
import { MapContainer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapData from "./MapData";
import Sidebar from "./Sidebar";
import  { MyContext } from "./mycontext";
import L from 'leaflet'
export default function App() {

  const mapRef = useRef();

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    map.locate({
      setView: true,
      });
    map.on('locationfound', handleOnLocationFound);
  }, []); 

  function handleOnLocationFound(event) {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const latlng = event.latlng;
    const radius = event.accuracy;
    const circle = L.circle(latlng, radius);
    circle.addTo(map);
  }

  const data = useContext(MyContext);
  console.log(data)
  return (
      <div className="container map">
        <div className="mapStyle">
          <MapContainer ref={mapRef} center={data.center} zoom={5}>
            <MapData />
          </MapContainer>
          <Sidebar />
        </div>
      </div>
  );
}
