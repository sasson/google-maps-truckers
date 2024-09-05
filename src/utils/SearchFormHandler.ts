
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import ContextManager from "./ContextManager";
// import Autocomplete from '@vis.gl/react-google-maps';

class SearchFormHandler {

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    private map: google.maps.Map;
    private autocomplete: any;
    private input: any;

    constructor(map: google.maps.Map) {
        this.map = map;
        this.autocomplete = undefined;
        this.input = undefined;
        //this.init();
    }

    private init() {
        const card = document.getElementById("pac-card") as HTMLElement;
        this.input = document.getElementById("pac-input") as HTMLInputElement;
        const biasInputElement = document.getElementById(
        "use-location-bias"
        ) as HTMLInputElement;
        const strictBoundsInputElement = document.getElementById(
        "use-strict-bounds"
        ) as HTMLInputElement;
        const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        };
    
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
    
        this.autocomplete = new google.maps.places.Autocomplete(this.input, options);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        this.autocomplete.bindTo("bounds", this.map);
  
        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById(
        "infowindow-content"
        ) as HTMLElement;
  
        infowindow.setContent(infowindowContent);
    
        const marker = new google.maps.Marker({
        map: this.map,
        anchorPoint: new google.maps.Point(0, -29),
        });
  
        this.autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);
  
        const place = this.autocomplete.getPlace();
  
        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
  
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            this.map.fitBounds(place.geometry.viewport);
        } else {
            this.map.setCenter(place.geometry.location);
            this.map.setZoom(17);
        }
  
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    
        for (let i = 0; i < infowindowContent.children.length - 1; i++) {
            const elm = infowindowContent.children.item(i);
            if (elm?.localName === "place-name" && place.name) elm.textContent = place.name;
            if (elm?.localName === "place-address" && place.formatted_address) elm.textContent = place.formatted_address;
        }

        this.setupClickListener("changetype-all", []);
        this.setupClickListener("changetype-address", ["address"]);
        this.setupClickListener("changetype-establishment", ["establishment"]);
        this.setupClickListener("changetype-geocode", ["geocode"]);
        this.setupClickListener("changetype-cities", ["(cities)"]);
        this.setupClickListener("changetype-regions", ["(regions)"]);
    
        biasInputElement.addEventListener("change", () => {
        if (biasInputElement.checked) {
            this.autocomplete.bindTo("bounds", this.map);
        } else {
            // User wants to turn off location bias, so three things need to happen:
            // 1. Unbind from map
            // 2. Reset the bounds to whole world
            // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
            this.autocomplete.unbind("bounds");
            this.autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
            strictBoundsInputElement.checked = biasInputElement.checked;
        }
    
        this.input.value = "";
        });
  
        strictBoundsInputElement.addEventListener("change", () => {
        this.autocomplete.setOptions({
            strictBounds: strictBoundsInputElement.checked,
        });
    
        if (strictBoundsInputElement.checked) {
            biasInputElement.checked = strictBoundsInputElement.checked;
            this.autocomplete.bindTo("bounds", this.map);
        }
    
        this.input.value = "";
        });
    });

        

    }
    
        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
    private setupClickListener(id: string, types: any) {
        const radioButton = document.getElementById(id) as HTMLInputElement;

        radioButton.addEventListener("click", () => {
            this.autocomplete.setTypes(types);
            this.input.value = "";
        });
    }

  }



export default SearchFormHandler;