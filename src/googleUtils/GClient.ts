import {Client} from "@googlemaps/google-maps-services-js";
import ContextManager from "../utils/ContextManager";

class GClient {

    private client: Client;

    constructor () {
        this.client = new Client();
        const API_KEY = ContextManager.getInstance().getContext().GOOGLE_MAPS_API_KEY;
        this.client.elevation({
            params: {
              locations: [{ lat: 45, lng: -110 }],
              key: API_KEY,
            },
            timeout: 1000, // milliseconds
          })
    }
}