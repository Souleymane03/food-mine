import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {
    tileLayer,
    LatLngTuple,
    Map,
    map,
    icon,
    Marker,
    marker,
    LatLngExpression,
    LeafletMouseEvent,
    LatLng
} from 'leaflet';
import {LocationService} from "../../../services/location.service";
import {OrderModel} from "../../../shared/types/models/order/order.model";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

    @Input()
    order!:OrderModel
    constructor(private locationService:LocationService) {
    }
    ngOnInit(): void {
        this.initializeMap();
    }

    private readonly MARKER_ZOOM_LEVEL = 16
    private readonly MARKER_ICON= icon({
        iconUrl:'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
        iconSize:[42,42],
        iconAnchor:[21,42],
    });

    private readonly DEFAULT_LATLNG: LatLngTuple = [5.31,-4.03]

    @ViewChild('map',{static:true})
    mapRef!:ElementRef
    map!:Map
    currentMarker!:Marker

    initializeMap(){
        if(this.map)return;

        this.map = map(this.mapRef.nativeElement,{
            attributionControl:false,

        }).setView(this.DEFAULT_LATLNG,1);

        tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);
        this.map.on('click',(e:LeafletMouseEvent) =>{
            this.setMarker(e.latlng);
        })
    }

    findMyLocation(){
        this.locationService.urrentLocation().subscribe({
            next:(latlng) => {
                this.map.setView(latlng,this.MARKER_ZOOM_LEVEL)
                this.setMarker(latlng)
            }
        });
    }

    setMarker(latLng:LatLngExpression){
        this.addressLatLng = latLng as LatLng
        if(this.currentMarker){
            this.currentMarker.setLatLng(latLng);
            return;
        }

        this.currentMarker = marker(latLng,{
            draggable:true,
            icon:this.MARKER_ICON
        }).addTo(this.map);

        this.currentMarker.on('dragend',() => {
            this.addressLatLng = this.currentMarker.getLatLng()
        });
    }

    set addressLatLng(latlng:LatLng){
        latlng.lat = parseFloat(latlng.lat.toFixed(8))
        latlng.lng = parseFloat(latlng.lng.toFixed(8))
        this.order.addessLatLng = latlng
        console.log(this.order)
    }

}
