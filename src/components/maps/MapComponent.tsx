import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useRef, useState } from "react";
import ContextManager from "../../utils/ContextManager";

export interface MapComponentProps {
  onMapLoaded: () => void;
}

export default function MapComponent(props: MapComponentProps) {
  const [map, setMap] = useState<google.maps.Map>()
  const ref = useRef<HTMLDivElement>()
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<{lat: number, lng: number} | undefined>();

  useEffect(()=>{
    if(ref.current && !map){
      setMap(new window.google.maps.Map(ref.current, {
        center: {lat: 39.099728, lng:-94.578568},
        zoom: 5,
      }))
    }
    if(map && !markerCluster){
      map.addListener('click', (e: google.maps.MapMouseEvent)=> {
        if(e.latLng){
          const {lat, lng} = e.latLng
          setMarker({lat: lat(), lng: lng()})
        }
      })
      setMarkerClusters(new MarkerClusterer({map, markers: [], }));
      ContextManager.getInstance().getContext().googleMap = map;
      props.onMapLoaded();
    }
  }, [map, markerCluster])
  
  useEffect(()=> {
    if(marker && markerCluster){
      markerCluster.clearMarkers();
      markerCluster.addMarker(
        new window.google.maps.Marker({
          position: {lat: marker.lat, lng: marker.lng}
        })
      )
    }
  }, [marker, markerCluster])

  return (
    <>
      <div ref={ref as any} style={{height: "100%", width: "700px", minHeight:"700px"}} ></div>
    </>
  )
}