import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {LatLngLiteral} from "leaflet";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor() {
    }

    urrentLocation():Observable<LatLngLiteral>{
        return new Observable<LatLngLiteral>((observer) => {
            if(!navigator.geolocation) return;
            return navigator.geolocation.getCurrentPosition(
                (pos) =>{
                    observer.next(
                        {
                            lng:pos.coords.longitude,
                            lat:pos.coords.latitude
                        }
                    )
                },
                (error) => {
                    observer.error(error);
                }
            );
        })
    }

}