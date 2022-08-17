import React from 'react';
import './marker.css';

const Marker = (props: any) => {
    const { name, selected, onClick } = props;

    return (
        <div className="marker"
            style={{
                backgroundImage: selected ? `url("https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png")` : `url("https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png")`,
                cursor: "pointer"
            }}
            title={name}
            onClick={onClick} />
    );
};

export default Marker;