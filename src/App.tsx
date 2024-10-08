import React, {useState} from 'react';
import './App.css';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import MapComponent, {MapComponentProps} from './components/maps/MapComponent';
import ContextManager from '../src/utils/ContextManager';
import ControlPanel from './components/control/ControlPanel';
import SearchForm, {SearchFormProps} from './components/control//SearchForm';

function App() {

  const render = (status: Status) => (<h1>{status}</h1>)
  const API_KEY = ContextManager.getInstance().getContext().GOOGLE_MAPS_API_KEY;
  const mapProps: MapComponentProps = {onMapLoaded: onMapLoaded};
  const formProps: SearchFormProps = { onFormLoaded: onFormLoaded};
  const [mapLoaded, setMapLoaded] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);

  function onMapLoaded() {
    setMapLoaded(true);
  }

  function onFormLoaded() {
    setTimeout(() => {
      // setFormLoaded(true);
    }, 100)
  }

  return (
    <div className="App">
        {mapLoaded &&
        <div className="user-info" >
               <SearchForm />  
        </div> }
       <div className="map-info" >
          <Wrapper apiKey={API_KEY} render={render}>
            <MapComponent {...mapProps}/>
          </Wrapper>
        </div>       
    </div>
  );
}

export default App;
