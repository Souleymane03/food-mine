import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
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
export class MapComponent implements OnChanges {

    @Input()
    order!: OrderModel

    @Input()
    readonly = false

    constructor(private locationService: LocationService) {
    }

    ngOnChanges(): void {
        if (!this.order) return;
        this.initializeMap();

        if (this.readonly && this.addressLatLng) {
            this.showLocationOnReadOnlyMode()
        }
    }

    private readonly MARKER_ZOOM_LEVEL = 16
    private readonly MARKER_ICON = icon({
        iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
        iconSize: [42, 42],
        iconAnchor: [21, 42],
    });

    private readonly DEFAULT_LATLNG: LatLngTuple = [5.31, -4.03]

    @ViewChild('map', {static: true})
    mapRef!: ElementRef
    map!: Map
    currentMarker!: Marker

    initializeMap() {
        if (this.map) return;

        this.map = map(this.mapRef.nativeElement, {
            attributionControl: false,

        }).setView(this.DEFAULT_LATLNG, 1);

        tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);
        this.map.on('click', (e: LeafletMouseEvent) => {
            this.setMarker(e.latlng);
        })
    }

    findMyLocation() {
        this.locationService.urrentLocation().subscribe({
            next: (latlng) => {
                this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
                this.setMarker(latlng)
            }
        });
    }

    setMarker(latLng: LatLngExpression) {
        this.addressLatLng = latLng as LatLng
        if (this.currentMarker) {
            this.currentMarker.setLatLng(latLng);
            return;
        }

        this.currentMarker = marker(latLng, {
            draggable: true,
            icon: this.MARKER_ICON
        }).addTo(this.map);

        this.currentMarker.on('dragend', () => {
            this.addressLatLng = this.currentMarker.getLatLng()
        });
    }

    set addressLatLng(latlng: LatLng) {

        if(!latlng.lat.toFixed) return;
        latlng.lat = parseFloat(latlng.lat.toFixed(8))
        latlng.lng = parseFloat(latlng.lng.toFixed(8))
        this.order.addessLatLng = latlng
        console.log(this.order)
    }

    get addressLatLng() {
        return this.order.addessLatLng!
    }

    showLocationOnReadOnlyMode() {

        const m = this.map;
        this.setMarker(this.addressLatLng);
        m.setView(this.addressLatLng,this.MARKER_ZOOM_LEVEL);

        m.dragging.disable()
        m.touchZoom.disable()
        m.doubleClickZoom.disable()
        m.scrollWheelZoom.disable()
        m.boxZoom.disable()
        m.keyboard.disable()
        m.off('click')
        m.tap?.disable()
        this.currentMarker.dragging?.disable()
    }
}
