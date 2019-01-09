import React from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
var map;
export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.mapHtml = React.createRef();
	}
	componentDidMount() {
		map = L.map(this.mapHtml.current, {
			minZoom: 2,
			maxZoom: 20,
			layers: [
				L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
					maxZoom: 20,
					maxNativeZoom: 18
				})
			]
		});
		map.locate({ setView: true, maxZoom: 16, watch: true });
		map.on('locationfound', this.onMapClick);
	}
	componentWillUnmount() {
		if (!map) return;
		map.off('click', this.onMapClick);
		map = null;
	}

	onMapClick = (e) => {
		console.log('e :', e);
		var marker = L.marker([ e.latitude, e.longitude ]).bindPopup('Your are here :)');
		map.addLayer(marker);
		marker.bindPopup('<b>Location</b><br>I am here').openPopup();
	};

	render() {
		return <div className="map" ref={this.mapHtml} />;
	}
}
