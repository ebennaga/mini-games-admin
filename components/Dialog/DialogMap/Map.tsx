/* eslint-disable camelcase */
import { Box } from '@mui/material';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'react-leaflet-geosearch';
import icon from './const';
import GetCoordinates from './GetCoordinates';
import SearchControl from './SearchControl';

const Map = () => {
    const [latitude, setLatitude] = React.useState(-6.30943345);
    const [longitude, setLongitude] = React.useState(106.6893430616688);
    const [label, setLabel] = React.useState('Intermark, Rawa Mekar Jaya, Serpong, Tangerang Selatan, Banten, Indonesia');

    const prov = OpenStreetMapProvider();

    const setPositionByClick = (latlng: any, address: string) => {
        setLatitude(latlng.lat);
        setLongitude(latlng.lng);
        setLabel(address);
    };

    return (
        <Box
            sx={{
                '& .leaflet-bar-part': { bgcolor: '#fff', width: '100% !important' },
                '& .geosearch.leaflet-bar form': { background: '#fff' },
                '& .geosearch.leaflet-bar form .results.active div': { cursor: 'pointer' },
                '& .leaflet-top.leaflet-left': { display: 'flex' },
                '& .leaflet-control-zoom.leaflet-bar': { height: 'fit-content' }
            }}
        >
            <MapContainer className='leaflet-map' center={[latitude, longitude]} zoom={17} scrollWheelZoom style={{ height: '400px' }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[latitude, longitude]} icon={icon}>
                    <Popup>{label || `lat long: ${latitude}-${longitude}`}</Popup>
                </Marker>
                <GetCoordinates setPosition={(e: any, address: any) => setPositionByClick(e, address)} />
                <SearchControl
                    provider={prov}
                    showMarker={false}
                    showPopup={false}
                    popupFormat={(data: any) => {
                        const { lat, lon, display_name } = data.result.raw;
                        setLatitude(lat);
                        setLongitude(lon);
                        setLabel(display_name);
                        return data.result.label;
                    }}
                    maxMarkers={3}
                    retainZoomLevel={false}
                    animateZoom
                    autoClose={false}
                    searchLabel='Enter address, please'
                    keepResult
                />
            </MapContainer>
        </Box>
    );
};

export default Map;
