import { App, Bundle, LogLevel, Environment, lazyLoad, domReady, requestJson } from "protoculture";
import { PrdcWebAppState } from "./PrdcWebAppState";
import * as _ from "lodash";
import { Drone } from "../Drone";


export class PrdcMapApp implements App {

    public name = "map";

    public working = true;

    public bundle: Bundle;

    protected map: google.maps.Map;

    protected markers: google.maps.Marker[];

    public constructor(protected environment: Environment) {

    }

    public async run(): Promise<void> {

        const googleMapsApiKey = document.getElementsByName("googleMapsApiKey")[0].getAttribute("value");
        const lat = 49.8912977;
        const lon = -97.1948747;

        const googleMapsUri = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;

        await lazyLoad(googleMapsUri);

        this.map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(lat, lon),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            mapTypeControl: false,
        });

        setInterval(() => this.loadDrones(), 5000);
    }

    protected async loadDrones() {

        this.bundle.logger.log("Loading current drones", this, LogLevel.Info);

        const drones = await requestJson<{[key: string]: Drone}>("/connected");

        this.bundle.logger.log(JSON.stringify(drones), this, LogLevel.Info);

        _.forEach(this.markers, (marker) => marker.setMap(null));

        this.markers = _.map(drones, (drone) => new google.maps.Marker({
            position: new google.maps.LatLng(drone.latitude, drone.longitude),
            title: drone.id,
            map: this.map,
            icon: {
                url: "https://azure.microsoft.com/svghandler/app-service/?width=50&height=50",
            }
        }));
    }
}
