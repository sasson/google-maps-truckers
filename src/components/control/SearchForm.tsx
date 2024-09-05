import SearchFormHandler from "../../utils/SearchFormHandler";
import ContextManager from "../../utils/ContextManager";
import SearchMap  from './SearchMap';

export interface SearchFormProps {
    onFormLoaded: () => void;
}

setTimeout(() => {
  const searchMap = new SearchMap();
  searchMap.init();
},1000)

function SearchForm() {

    return (
      <div>
        <input
            id="pac-input"
            className="controls"
            type="text"
            placeholder="Search Box"        
        />
        <div id="map"></div>
          <script> src="./SearchMap.js"</script>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA92f1aiopxbLOOJWN0xI_UjyEIx4Yo-2s&libraries=places&callback=SearchForm&libraries=places&v=weekly"  defer
        ></script>
    </div>
    )

}

export default SearchForm

