import { useRef, useEffect, useState } from "react";
import "./autocomplete.css";
import TextField from '@mui/material/TextField';

const AutoComplete = ({ onPlacedSelected }) => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const [searchPlaceInputValue, setSearchPlaceInputValue] = useState("");
    const options = {
        componentRestrictions: { country: "my" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    };

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();

            if (onPlacedSelected != null) {
                onPlacedSelected(place);
            }

            setSearchPlaceInputValue("");
        });
    }, []);

    return (
        <TextField
            id="search"
            inputRef={inputRef}
            type="text"
            sx={{ width: "100%" }}
            placeholder="Search Places..."
            value={searchPlaceInputValue}
            onChange={(event) => setSearchPlaceInputValue(event.target.value) } />
    );
};

export default AutoComplete;
