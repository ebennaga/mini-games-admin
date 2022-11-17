/* eslint-disable new-cap */
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface GetCoordinatesProps {
    setPosition: any;
}

const GetCoordinates: React.FC<GetCoordinatesProps> = ({ setPosition }) => {
    const map = useMap();

    const GEOCODE_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=';

    // change latitude and longitude to address
    const reverseCoordinate = async (latlang: any) => {
        const data = await (await fetch(`${GEOCODE_URL}${latlang.lng},${latlang.lat}`)).json();
        return data;
    };

    useEffect(() => {
        if (!map) return;
        const info: any = L.DomUtil.create('div', 'legend');

        const positon = L.Control.extend({
            options: {
                position: 'bottomleft'
            },

            onAdd() {
                info.textContent = 'Click on map';
                return info;
            }
        });

        // event click map
        map.on('click', async (e) => {
            info.textContent = e.latlng;
            const data = await reverseCoordinate(e.latlng);
            setPosition(e.latlng, data.address.LongLabel);
        });

        map.addControl(new positon());
    }, [map]);

    return null;
};

export default GetCoordinates;
