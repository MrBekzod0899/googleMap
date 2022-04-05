import L from 'leaflet';
import marker from './asset/1.png'
const iconMarker = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 40),
});

export { iconMarker };