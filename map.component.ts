import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import 'mapbox-gl/dist/mapbox-gl.css';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles:`

  #map{
  object-fit: cover;
  width: 100%;
  max-height: 100%;
  border-radius: 6px;
  height: 85vh;
  min-height: 323.4px;
  }

  .custom-marker{
    background:url("/marker-blue.png");
  }

  .custom-marker{
    max-width: 50px;
  }

`
})

export class AppMapComponent implements OnInit {

  leafletMap:any;
  @Input() input: string = '';
  currentCircle: L.Circle | null = null;

  // @ts-ignore
  latlngs: LatLongExpression = [
    [
      41.5050,1.5000
    ],
    [
      41.5055,1.4990
    ],
    [
      41.5060,1.4994
    ],
    [
      41.5050,1.5003
    ],
  ];

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {

    this.leafletMap = L.map('map', {
      center: [1.5000, 41.5000],
      zoom: 14
    });

    let mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.leafletMap)

    //polygon example
    const polygon = L.polygon(this.latlngs, {color: 'red'}).addTo(this.leafletMap);
    this.leafletMap.fitBounds(polygon.getBounds());

    //marker example
    this.addMarker( 41.5040,1.5000);
    //polygon example
    this.addPolygon(this.latlngs,'red');
    //circle example
    let circle = this.addCircle(41.5030,1.5000,400)
    //fit bounds example
    this.leafletMap.fitBounds(circle.getBounds());


  }

  addMarker(lat:any,long:any) {
    var customMarker = L.icon({iconUrl:'/assets/marker-blue.png',iconSize:[38, 60],popupAnchor: [-3, -76]})
    let markerLayer = L.marker([lat,long],{icon:customMarker}).addTo(this.leafletMap);
    markerLayer.addTo(this.leafletMap)
    this.leafletMap.setView([lat,long])
    return markerLayer;
  }

  addCircle(lat:number,lng:number,radius:number){
    if (this.currentCircle) {
      this.leafletMap.removeLayer(this.currentCircle);
    }
    this.currentCircle = L.circle([lat,lng], {radius:radius}).addTo(this.leafletMap);
    return this.currentCircle;
  }

  addPolygon(latLngArrayMatrix: [][],color:string){
    let polygon = L.polygon(latLngArrayMatrix, {color: color}).addTo(this.leafletMap);
    return polygon;
  }

}
