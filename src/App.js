import React,{useContext} from "react";
import { MapContainer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapData from "./MapData";
import Sidebar from "./Sidebar";
import  { MyContext } from "./mycontext";
export default function App() {



  const data = useContext(MyContext);
  console.log(data)
  return (
      <div className="container map">
        <div className="mapStyle">
          <MapContainer  center={data.center} zoom={5}>
            <MapData />
          </MapContainer>
          <Sidebar />
        </div>
      </div>
  );
}
