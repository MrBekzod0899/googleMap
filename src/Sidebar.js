import React,{useState,useContext} from 'react'
import { MyContext } from './mycontext';


export default function Sidebar() {
    const data = useContext(MyContext);
    console.log('side ',data)
    console.log(data.data[0].area)
    const [show, setShow] = useState(false);
   
  const isShow=()=>{
    setShow(!show)
    let aside=document.querySelector('aside') 
    let mapContainer=document.querySelector('.leaflet-container')
    aside.classList.toggle('show')
    mapContainer.classList.toggle('show')
  }

  return (
    <aside>
        <button onClick={isShow}>x</button>
        {
            data ?
            <div className='countryInfo'>
                <div className='info'>
                    <label>Mamlakat Nomi</label>
                    <span>{data.data[0].name.common}</span>
                </div>
                <div className='info'>
                    <label>Mamlakatning Xalqaro Nomi</label>
                    <span>{data.data[0].name.official}</span>
                </div>
                <div className='info'>
                    <label>Mamlakat maydoni</label>
                    <span>{data.data[0].area}</span>
                </div> 
                <div className='info'>
                    <label>Mamlakat poytaxti</label>
                    <span>{data.data[0].capital}</span>
                </div>
                <div className='info'>
                    <label>Mamlakat maydoni</label>
                    <span>{data.data[0].area}</span>
                </div>
                <div className='info'>
                    <label>Mamlakat aholisi soni</label>
                    <span>{data.data[0].population}</span>
                </div>
                <div className='info'>
                    <label>Mamlakat domeni</label>
                    <span>{data.data[0].tld[0]}</span>
                </div>
                
                <div className='info'>
                    <label>Mintaqa</label>
                    <span>{data.data[0].region}</span>,
                    <span>{data.data[0].subregion}</span>
                </div>
                <div className='info'>
                    <label>Mintaqa kengligi</label>
                    <span>{data.data[0].latlng[0]}</span>,
                    <span>{data.data[0].latlng[1]}</span>
                </div>
                <div className='info info-img'>
                    <div className='top'>
                      <label>Mamlakat gerbi  va bayrog'i</label>
                    </div>
                    <div className='images'>
                        <img src={data.data[0].flags.png} alt="flag"/>
                        <img width={200}  src={data.data[0].coatOfArms.png}  alt='harbiy'/>
                    </div>
                </div>
            </div> : 
            <h4>Not Found</h4>
        }
    </aside>
  )
}
