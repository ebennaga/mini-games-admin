/* eslint-disable camelcase */
import { Box } from '@mui/material';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'react-leaflet-geosearch';
import icon from './const';
import GetCoordinates from './GetCoordinates';
import SearchControl from './SearchControl';

interface MapProps {
    nameAddress: string;
    nameLat: string;
    nameLong: string;
    form: any;
    isSetAddress: boolean;
    setIsSetAddress: any;
    dataMap: any;
    setDataMap: any;
}

const Map: React.FC<MapProps> = ({ nameAddress, nameLat, nameLong, form, isSetAddress, setIsSetAddress, setDataMap, dataMap }) => {
    const prov = OpenStreetMapProvider();

    // Event click map
    const setPositionByClick = (latlng: any, address: string) => {
        const data = { latitude: latlng.lat, longitude: latlng.lng, label: address };
        setDataMap(data);
    };

    // Event onSubmit search address in map
    const setPopupFormat = (data: any) => {
        const { lat, lon, display_name } = data.result.raw;
        const dataResult = { latitude: lat, longitude: lon, label: display_name };
        setDataMap(dataResult);
        return data.result.label;
    };

    // did update when pinpoint address is change
    React.useEffect(() => {
        if (isSetAddress) {
            const { latitude, longitude, label } = dataMap;
            form.setValue(nameAddress, label);
            form.setValue(nameLat, latitude);
            form.setValue(nameLong, longitude);
            setIsSetAddress(false);
        }
    }, [isSetAddress]);

    return (
        <Box
            sx={{
                '& .leaflet-bar-part': { bgcolor: '#fff', width: '100% !important', display: 'none' },
                '& .geosearch.leaflet-bar form': { background: '#fff' },
                '& .geosearch.leaflet-bar form .results.active div': { cursor: 'pointer' },
                '& .leaflet-top.leaflet-left': { display: 'flex' },
                '& .leaflet-control-zoom.leaflet-bar, .geosearch.leaflet-bar': { height: 'fit-content' }
            }}
        >
            <MapContainer
                className='leaflet-map'
                center={[dataMap.latitude, dataMap.longitude]}
                zoom={17}
                scrollWheelZoom
                style={{ height: '400px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[dataMap.latitude, dataMap.longitude]} icon={icon}>
                    <Popup>{dataMap.label || `lat long: ${dataMap.latitude}-${dataMap.longitude}`}</Popup>
                </Marker>
                <GetCoordinates setPosition={(e: any, address: any) => setPositionByClick(e, address)} />
                <SearchControl
                    provider={prov}
                    showMarker={false}
                    showPopup={false}
                    popupFormat={(data: any) => setPopupFormat(data)}
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
