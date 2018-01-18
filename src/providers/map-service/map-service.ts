import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../models/user";
import "rxjs/add/operator/toPromise";

@Injectable()
export class MapServiceProvider {

  //private localUrl = 'mongodb://root:root2017@ds129066.mlab.com:29066/marauders-map';  // URL to web api
  private localUrl = 'http://localhost:3000';  // URL to web api

  constructor(private http: Http) { }

  /*
  {
    address: string || location: LatLng || placeId: string
  }
  */
  geocode(data: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body =  "address="+data.address;

    return this.http.post(this.localUrl+'/geocode', body, options)
      .map((res: Response) => { return res.json() as any[] })
      .subscribe(data => console.log("Geocode"));
  }

  reverse_geocode(data: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body =  "location="+data.location;

    return this.http.post(this.localUrl+'/geocode/reverse', body, options)
      .map((res: Response) => { return res.json() as any[] })
      .subscribe(data => console.log("Reverse geocode"));
  }

  /*
  {
    origin: LatLng | String | google.maps.Place,
    destination: LatLng | String | google.maps.Place,
    travelMode: TravelMode,
    transitOptions: TransitOptions,
    unitSystem: UnitSystem,
    waypoints[]: DirectionsWaypoint,
    optimizeWaypoints: Boolean,
    provideRouteAlternatives: Boolean,
  }
  */
  directions(data: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body =  "origin="+data.origin+
                "&destination="+data.destination+
                "&travelMode="+data.travelMode+
                "&transitOptions="+data.transitOptions+
                "&unitSystem="+data.unitSystem+
                "&waypoints="+data.waypoints+
                "&optimizeWaypoints="+data.optimizeWaypoints+
                "&provideRouteAlternative="+data.provideRouteAlternative;

    return this.http.post(this.localUrl+'/directions', body, options)
      .map((res: Response) => { return res.json() as any[] })
      .subscribe(data => console.log("Directions"));
  }

  /*
  {
    query: String,
    lccation: LatLng,
    radius: Int < 50000,
    minprice: 0 to 4 (less to most expensive),
    maxprice: 0 to 4,
    opennow: Boolean,
    type: https://developers.google.com/places/web-service/supported_types
  }
  */
  places_search(data: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body =  "query="+data.query+
                "&location="+data.location+
                "&radius="+data.radius+
                "&minprice="+data.minprice+
                "&maxprice="+data.maxprice+
                "&opennow="+data.opennow+
                "&type="+data.type;

    return this.http.post(this.localUrl+'/places/search', body, options)
      .map((res: Response) => { return res.json() as any[] })
      .subscribe(data => console.log("Search place"));
  }

  /*
  {
    lccation: LatLng,
    rankby: prominence | distance,
    type: https://developers.google.com/places/web-service/supported_types
  }
  */
  places_nearby(data: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body =  "location="+data.location+
                "&rankby="+data.rankby+
                "&type="+data.type;

    return this.http.post(this.localUrl+'/places/nearby', body, options)
      .map((res: Response) => { return res.json().json.results as any[] });
  }

  /*
  {
    placeid: String
  }
  */
  places_details(data: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body = "placeid="+data.placeid;

    return this.http.post(this.localUrl+'/places/details', body, options)
      .map((res: Response) => { return res.json() as any[] })
      .subscribe(data => console.log("Places details"));
  }

  /*
  {
    photoreference: String,
    maxheight: Int,
    maxwidth: Int
  }
  */
  places_photos(data: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body =  "photoreference="+data.photoreference+
                "&maxheight="+data.maxheight+
                "&maxwidth="+data.maxwidth;

    return this.http.post(this.localUrl+'/places/photos', body, options)
      .map((res: Response) => { return res.json() as any[] })
      .subscribe(data => console.log("Places photos"));
  }

  /*
  https://google-developers.appspot.com/maps/documentation/javascript/places-autocomplete
  */
  places_predictions(data: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body = "";

    return this.http.post(this.localUrl+'/places/predictions', body, options)
      .map((res: Response) => { return res.json() as any[] })
      .subscribe(data => console.log("Places predictions"));
  }
}
