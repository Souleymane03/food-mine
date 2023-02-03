import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {tileLayer, LatLngTuple, Map, map} from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
    ngOnInit(): void {
        this.initializeMap();
    }

    private readonly DEFAULT_LATLNG: LatLngTuple = [5.31,-4.03]

    @ViewChild('map',{static:true})
    mapRef!:ElementRef
    map!:Map

    initializeMap(){
        if(this.map)return;

        this.map = map(this.mapRef.nativeElement,{
            attributionControl:false,

        }).setView(this.DEFAULT_LATLNG,1);

        tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);
    }

}
