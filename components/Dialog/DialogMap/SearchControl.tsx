/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
import 'react-leaflet-geosearch/lib';
import 'leaflet/dist/leaflet.css';

const SearchControl = (props: any) => {
    const map: any = useMap();

    useEffect(() => {
        const searchControl = new (GeoSearchControl as any)({
            provider: props.provider,
            ...props
        });

        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map, props]);

    return null;
};
export default SearchControl;
