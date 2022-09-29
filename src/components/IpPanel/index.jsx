import React, { useState, useEffect } from "react";
import "./styles.css";


const IpPanel = () => {
    const [clientIP, setClientIP] = useState("");
    const [clientISP, setClientISP] = useState("");
    const [clientCountry, setClientCountry] = useState("");
    const [clientRegion, setClientRegion] = useState("");
    const [clientLat, setClientLat] = useState("");
    const [clientLong, setClientLong] = useState("");

    const apiURL = "https://isp-middle-api.nrueda687.repl.co/whoami";

    useEffect(() => {
        const getClientGeoLoc = () => {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){
                  setClientLat(position.coords.latitude);
                  setClientLong(position.coords.longitude);
                });
            }
        }
        const getClientData = async() => {
            fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setClientIP(data.ip);
                setClientCountry(data.country);
                setClientRegion(data.city);
                setClientISP(data.isp);
            })
        }
        getClientGeoLoc();
        getClientData();
    }, []);

    return (
      <div id="contenedor" className="flexV">
        <div id="data_localizacion">
              {clientCountry.length === 0 ? <h2 id="pais">Cargando Coordenadas</h2> : <h2 id="pais">{clientCountry}</h2>}
              {clientRegion.length === 0 ? <h3 id="region">...</h3> : <h3 id="region">{clientRegion}</h3>}
        </div>
        <div id="data_coordenadas" className="flexH">
              {clientLat.length === 0 ? <h4 id="lat" className="flexItem">Latitud: </h4> : <h4 id="lat" className="flexItem">Latitud: {clientLat}</h4>}
              {clientLong.length === 0 ? <h4 id="long" className="flexItem">Longitud: </h4> : <h4 id="long" className="flexItem">Longitud: {clientLong}</h4>}
        </div>
        <div id="data_internet">
              {clientIP.length === 0 ? <h2 id="ip">IP: </h2> : <h2 id="ip">{clientIP}</h2>}
              {clientISP === 0 ? <h2 id="isp">Proveedor: </h2> : <h2 id="isp">{clientISP}</h2>}
        </div>
      </div>
    )
}

export default IpPanel;