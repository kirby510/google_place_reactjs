import React, { Component } from "react";
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleMapReact from 'google-map-react';
import { createPlace, clearAllPlaces } from "../../actions/places";
import AutoComplete from "../../widgets/autocomplete";
import Marker from "../../widgets/marker";

const theme = createTheme();

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultLat: 3.1569,
            defaultLng: 101.7123,
            defaultZoom: 11,
            selectedMarker: -1
        };
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={4}
                    sx={{
                        position: "relative",
                        borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap>
                            Google Places React JS
                        </Typography>
                    </Toolbar>
                </AppBar>
                <React.Fragment>
                    <Stack direction="row">
                        <Box component="div" sx={{ width: "30%" }}>
                            <Stack direction="column" sx={{ height: "100%", maxHeight: "100%" }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ padding: 2 }}>
                                    {this.renderSearchBox()}
                                </Stack>
                                <Box component="div" sx={{ height: "calc(100vh - 230px)", overflowY: 'scroll' }}>
                                    {this.renderSearchedPlaces()}
                                </Box>
                                <Button
                                    variant="contained"
                                    sx={{ height: "50px", m: 2 }}
                                    onClick={() => {
                                        this.props.clearAllPlaces();

                                        this.setState({
                                            selectedMarker: -1
                                        });
                                    }}>
                                    Clear
                                </Button>
                            </Stack>
                        </Box>
                        <Box sx={{ width: "70%" }}>
                            {this.renderGoogleMaps()}
                        </Box>
                    </Stack>
                </React.Fragment>
            </ThemeProvider>
        );
    }

    renderSearchBox() {
        return (
            <>
                <AutoComplete
                    onPlacedSelected={(place) => {
                        var newPlace = {
                            id: this.props.places.length + 1,
                            name: place.name,
                            icon: place.icon,
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            address_components: place.address_components
                        };

                        this.props.createPlace(newPlace);

                        this.setState({
                            defaultLat: newPlace.lat,
                            defaultLng: newPlace.lng,
                            selectedMarker: newPlace.id
                        });
                    }}
                />
            </>
        );
    }

    renderSearchedPlaces() {
        return (
            <List>
                {this.props.places.reverse().map((place, index) => (
                    <ListItem key={"place" + index}>
                        <Card sx={{
                            width: "100%",
                            p: 2,
                            bgcolor: this.state.selectedMarker == place.id ? "#F5F5F5" : "background.paper"
                        }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center">
                                <CardContent sx={{
                                    p: 0,
                                    "&:last-child": {
                                        pb: 0
                                    }
                                }}>
                                    <Typography variant="h6">
                                        {place.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {this.generateFullAddress(place)}
                                    </Typography>
                                    <Typography variant="body2">
                                        {place.lat + ", " + place.lng}
                                    </Typography>
                                </CardContent>
                                <IconButton
                                    aria-label="map"
                                    sx={{ height: "50px" }}
                                    onClick={() => {
                                        this.setState({
                                            defaultLat: place.lat,
                                            defaultLng: place.lng,
                                            selectedMarker: place.id
                                        });
                                    }}>
                                    <LocationOnIcon />
                                </IconButton>
                            </Stack>
                        </Card>
                    </ListItem>
                ))}
            </List>
        );
    }

    generateFullAddress(place) {
        var address = "";

        place.address_components.map((address_component) => {
            if (address != "") {
                address += ", "
            }

            address += address_component.long_name
        });

        return address;
    }

    renderGoogleMaps() {
        return (
            <div style={{ height: "calc(100vh - 64px)", width: "100%" }}>
                <GoogleMapReact
                    defaultCenter={{
                        lat: 3.1569,
                        lng: 101.7123
                    }}
                    center={{
                        lat: this.state.defaultLat,
                        lng: this.state.defaultLng
                    }}
                    defaultZoom={this.state.defaultZoom}>
                    {this.props.places.reverse().map((place, index) => (
                        <Marker
                            key={"place-marker" + index}
                            name={place.name}
                            lat={place.lat}
                            lng={place.lng}
                            selected={this.state.selectedMarker == place.id}
                            onClick={() => {
                                this.setState({
                                    selectedMarker: place.id
                                });
                            }} />
                    ))}
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.places.places
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPlace: (data) => dispatch(createPlace(data)),
        clearAllPlaces: () => dispatch(clearAllPlaces()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
