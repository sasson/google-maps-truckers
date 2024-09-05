import SearchFormHandler from "../../utils/SearchFormHandler";
import ContextManager from "../../utils/ContextManager";

export interface SearchFormProps {
    onFormLoaded: () => void;
}

function SerachForm() {

    setTimeout(() => {
        const map = ContextManager.getInstance().getContext().googleMap as google.maps.Map;
        new SearchFormHandler(map);
    }, 500)

    return (
        <div id="searchForm">
        <div className="pac-card" id="pac-card">
        <div>
          <div id="title">Autocomplete search</div>
          <div id="type-selector" className="pac-controls">
            <input
              type="radio"
              name="type"
              id="changetype-all"
              checked= {true}
            />
            <label htmlFor="changetype-all">All</label>
  
            <input type="radio" name="type" id="changetype-establishment" />
            <label htmlFor="changetype-establishment">establishment</label>
  
            <input type="radio" name="type" id="changetype-address" />
            <label htmlFor="changetype-address">address</label>
  
            <input type="radio" name="type" id="changetype-geocode" />
            <label htmlFor="changetype-geocode">geocode</label>
  
            <input type="radio" name="type" id="changetype-cities" />
            <label htmlFor="changetype-cities">(cities)</label>
  
            <input type="radio" name="type" id="changetype-regions" />
            <label htmlFor="changetype-regions">(regions)</label>
          </div>
          <br />
          <div id="strict-bounds-selector" className="pac-controls">
            <input type="checkbox" id="use-location-bias" value="" checked />
            <label htmlFor="use-location-bias">Bias to map viewport</label>
  
            <input type="checkbox" id="use-strict-bounds" value="" />
            <label htmlFor="use-strict-bounds">Strict bounds</label>
          </div>
        </div>
        <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Enter a location" />
        </div>
      </div>
      <div id="map"></div>
      <div id="infowindow-content">
        <span id="place-name" className="title"></span><br />
        <span id="place-address"></span>
      </div>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA92f1aiopxbLOOJWN0xI_UjyEIx4Yo-2s&libraries=places&callback=init&libraries=places&v=weekly"  defer></script>
      </div>
    )
}

export default SerachForm

