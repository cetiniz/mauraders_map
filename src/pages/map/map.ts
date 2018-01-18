import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  LoadingController,
  ModalController, NavController, NavParams, PopoverController,
  ViewController
} from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { ConnectivityServiceProvider } from "../../providers/connectivity-service/connectivity-service";
import { SettingsPage } from "../settings/settings";
import { FriendsPage } from "../friends/friends";
import { RelationshipServiceProvider } from "../../providers/relationship-service/relationship-service";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { MapServiceProvider } from "../../providers/map-service/map-service";



// GLOBAL VARIABLES
declare let google;
let markers: any[] = [];
let infoWindows: any[] = [];

let washrooms: any[] = [
  ['UH 313', false, 'all-genders'],
  ['HH 405', false, 'all-genders'],
  ['HH 406', false, 'all-genders'],
  ['REF 105', true, 'all-genders'],
  ['REF 106', true, 'all-genders'],
  ['NRB 103', false, 'all-genders'],
  ['MML 3', true, 'all-genders'],
  ['BSB 128', true, 'all-genders'],
  ['BSB 321', false, 'all-genders'],
  ['HH 406', false, 'all-genders'],
  ['JHE 126', false, 'all-genders'],
  ['JHE 236', false, 'all-genders'],
  ['JHE 324', false, 'all-genders'],
  ['JHE 347', false, 'all-genders'],
  ['GH 111', true, 'all-genders'],
  ['CNH 206', false, 'all-genders'],
  ['CNH 305', false, 'all-genders'],
  ['IWC 209A', false, 'all-genders'],
  ['IWC 209B', false, 'all-genders'],
  ['IWC 209C', false, 'all-genders'],
  ['ABB B121', false, 'all-genders'],
  ['ABB 1', false, 'all-genders'],
  ['ABB 2', false, 'all-genders'],
  ['ABB 3', false, 'all-genders'],
  ['ABB 4', false, 'all-genders'],
  ['ABB 5', false, 'all-genders'],
  ['CSB 119', false, 'all-genders'],
  ['HSC BW03', false, 'all-genders'],
  ['IAHS 109', true, 'all-genders'],
  ['ITB A206', false, 'all-genders'],
  ['ITB A207', false, 'all-genders'],
  ['ITB A306', false, 'all-genders'],
  ['ITB A307', false, 'all-genders'],
  ['MUSC 233', true, 'all-genders'],
  ['MUSC 1', false, 'all-genders'],
  ['MDCL 1013', true, 'all-genders'],
  ['MDCL 2008', true, 'all-genders'],
  ['MDCL 3004', true, 'all-genders'],
  ['MDCL 4004', true, 'all-genders'],
  ['MDCL 5004', true, 'all-genders'],
  ['DBAC 211', false, 'all-genders'],
  ['ETB 128', true, 'all-genders'],
  ['LRW 1056', true, 'all-genders'],
  ['LRW 2', true, 'all-genders'],
  ['LRW 3', true, 'all-genders'],
  ['LRW 4', true, 'all-genders']
];

let computer_labs: any[] = [
  'BSB 241', 'BSB 242', 'BSB 244', 'BSB 249',
  'JHE 233', 'JHE 234',
  'KTH B121', 'KTH B123'
];

let buildings: any[] = [
  ['7',   'Alumni House', 'AH', 43.265198, -79.923088],
  ['8',   'Alumni Memorial Building', 'AMB', 43.263983, -79.919653],
  ['33',  'Applied Dynamics Laboratory', 'ADL', 43.263517, -79.928331],
  ['25',  'Arthur N. Bourns Building', 'ABB', 43.260398, -79.921733],
  ['40',  'Bates Residence Building', 'BRB', 43.263945, -79.922590],
  ['30',  'Biology Greenhouse', 'BG', 43.262984, -79.920695],
  ['36',  'Brandon Hall', 'BH', 43.265908, -79.919824],
  ['11',  'Burke Sciences Building', 'BSB', 43.262057, -79.920183],
  ['31',  'Campus Services Building', 'CSB', 43.261964, -79.927773],
  ['23',  'Chester New Hall', 'CNH', 43.263818, -79.918414],
  ['28',  'Commons Building', 'CB', 43.265514, -79.919257],
  ['43',  'Communications Research Laboratory', 'CRL', 43.259159, -79.919314],
  ['54',  'David Braley Athletic Centre', 'DBAC', 43.264716, -79.916198],
  ['46',  'DeGroote School of Business', 'DSB', 43.264108, -79.916478],
  ['12',  'E.T. Clarke Centre', 'ETCC', 43.261777, -79.922047],
  ['5',   'Edwards Hall', 'EH', 43.264091, -79.918968],
  ['56',  'Engineering Technology Building', 'ETB', 43.258485, -79.920078],
  ['EX',  'Examination Centre', 'EC', 43.257337, -79.921087],
  ['22',  'General Sciences Building', 'GSB', 43.262343, -79.921248],
  ['20',  'Guilmour Hall', 'GH', 43.263229, -79.918480],
  ['42',  'H.G. Thode Library', 'HGTL', 43.261113, -79.922600],
  ['2',   'Hamilton Hall', 'HH', 43.263163, -79.920116],
  ['37',  'Health Science Centre', 'HSC', 43.259522, -79.917414],
  ['45',  'Hedden Hall', 'HeH', 43.266374, -79.918189],
  ['49',  'Information Technology Building', 'ITB', 43.258837, -79.920897],
  ['48',  'Institute for Applied Health Sciences', 'IAHS', 43.259720, -79.920498],
  ['24',  'Ivor Wynne Centre', 'IWC', 43.265565, -79.915570],
  ['16',  'John Hodgins Engineering Building', 'JHE', 43.260797, -79.920428],
  ['38',  'Kenneth Taylor Hall', 'KTH', 43.264088, -79.916909],
  ['74',  'L.R. Wilson Hall', 'LRW', 43.261823, -79.916697],
  ['53',  'Les Princes Hall', 'LPH', 43.267453, -79.917099],
  ['39',  'Life Sciences Building', 'LSB', 43.261003, -79.917801],
  ['50',  'Mary E. Keyes Residence', 'MKR', 43.262695, -79.922853],
  ['26',  'Matthews Hall', 'MattH', 43.262766, -79.922111],
  ['27',  'McKay Hall', 'MKH', 43.265133, -79.919003],
  ['T33', 'McMaster Children\'s Centre', 'MCC', 43.263855, -79.927609],
  ['17',  'Divinity College', 'MDC', 43.261857, -79.918007],
  ['51',  'McMaster University Student Centre', 'MUSC', 43.263453, -79.917581],
  ['52',  'Michael DeGroote Centre for Learning and Discovery', 'MDCL', 43.261046, -79.916794],
  ['10',  'Mills Memorial Library / Museum of Art', 'MML', 43.262733, -79.917606],
  ['18',  'Moulton Hall', 'MoH', 43.263312, -79.922194],
  ['15',  'Nuclear Reactor', 'NucR', 43.261174, -79.921479],
  ['9',   'Nuclear Research Building', 'NRB', 43.261414, -79.921101],
  ['T13', 'Preliminary Laboratory', 'PB', 43.258623, -79.919531],
  ['34',  'Psychology Building', 'PB', 43.259700, -79.919468],
  ['4',   'Refectory', 'REF', 43.262883, -79.921105],
  ['55',  'Ron Joyce Stadium', 'RJS', 43.266125, -79.916387],
  ['32',  'Tandem Accelerator Building', 'TAB', 43.262042, -79.921192],
  ['T26', 'Temporary Building', 'TB', 43.262883, -79.928105],
  ['29',  'Togo Salmon Hall', 'TSH', 43.264302, -79.917731],
  ['1',   'University Hall', 'UH', 43.263440, -79.918930],
  ['6',   'Wallingford Hall', 'WaH', 43.263022, -79.921636],
  ['19',  'Whidden Hall', 'WhiH', 43.265035, -79.919558],
  ['35',  'Woodstock Hall', 'WoH', 43.265985, -79.918981]
];

let others: any[] = [
  ['cafe', 'Tim Hortons', 'Tim Hortons', 43.263592, -79.917692],
  ['cafe', 'Starbucks', 'Starbucks', 43.263184, -79.918319]
];


// GLOBAL FUNCTIONS
function matchBuilding(code: string): any {
  for (let i = 0; i < buildings.length; i++) {
    if (code.indexOf(buildings[i][2]) != -1) {
      return buildings[i];
    }
  }
  return undefined;
}

function distance(lat1, lon1, lat2, lon2) {
  const p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 - c((lat2 - lat1) * p)/2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}




@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  private sessionID;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any = "AIzaSyBiua_0qPExEsd4RF9b94R0G1s0nfCxOQ4";

  numberNotifications: any = 0;
  userInput: any = '';
  results: any[] = [];
  searching: Boolean = false;

  directionsService: any;
  directionsDisplay: any;
  directionsResults: any;

  constructor(public navCtrl: NavController,
              public connectivityService: ConnectivityServiceProvider,
              public geolocation: Geolocation,
              public navParams: NavParams,
              public relationshipService: RelationshipServiceProvider,
              public userService: UserServiceProvider,
              public popoverCtrl: PopoverController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController) {
    this.sessionID = this.navParams.get("sessionId");

    this.getNumberNotifications();

    this.loadGoogleMap();
    this.updateGeoloc();
    this.displayFriends();

    this.userInput = '';
    this.searching = false;
  }

  onInput(ev: any) {
    this.relationshipService.getRelationships()
      .subscribe(relationships => {
        let val = ev.target.value;

        this.searching = true;
        this.results = [];

        // FRIENDS
        let first = true;
        for (let i = 0; i < relationships.length; i++) {
          if (relationships[i].userA === this.sessionID) {
            this.userService.getUser(relationships[i].userB)
              .subscribe(friend => {
                if (relationships[i].status === 'accepted') {
                  this.results.push(['friend', friend.firstname, friend.lastname, parseFloat(friend.posLat), parseFloat(friend.posLng), friend.avatar]);
                }

                if (first) {
                  // BUILDINGS
                  for (let i = 0; i < buildings.length; i++) {
                    this.results.push(['building', buildings[i][1], buildings[i][2], buildings[i][3], buildings[i][4]]);
                  }
                  // OTHERS
                  for (let i = 0; i < others.length; i++) { this.results.push(others[i]); }
                }

                if (val && val.trim() != '') {
                  this.results = this.results.filter((result) => {
                    return (result[1].toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                      result[2].toLowerCase().indexOf(val.toLowerCase()) > -1);
                  });
                  let res: any[] = [];
                  if (this.results.length > 4) {
                    for (let i = 0; i < 4; i++) { res.push(this.results[i]); }
                    this.results = res;
                  }
                } else {
                  this.searching = false;
                }

                first = false;
              });
          }
        }
      });
  }

  showNearbyPopover(ev: any) {
    this.clearMap();
    let popover = this.popoverCtrl.create(NearbyPopoverPage, { map: this.map, sessionId: this.sessionID });

    popover.present({
      ev: ev
    });
  }

  getNumberNotifications() {
    this.relationshipService.getRelationships()
      .subscribe(relationships => {
        for (let i = 0; i < relationships.length; i++) {
          if (relationships[i].userA === this.sessionID) {
            this.userService.getUser(relationships[i].userB)
              .subscribe(friend => {
                if (relationships[i].status === 'received') { this.numberNotifications++; }
              });
          }
        }
      });
  }

  updateGeoloc() {
    this.userService.getUser(this.sessionID)
      .subscribe(user => {
        let posLat, posLng;
        this.geolocation.getCurrentPosition()
          .then((position) => {
            posLat = position.coords.latitude;
            posLng = position.coords.longitude;

            this.userService.updateUser(this.sessionID, {
              rev: user._rev,
              email: user.email,
              password: user.password,
              avatar: user.avatar,
              firstname: user.firstname,
              lastname: user.lastname,
              distanceUnit: user.distanceUnit,
              accessibility: user.accessibility,
              posLat: posLat,
              posLng: posLng
            });
          });
      });
  }

  displayFriends() {
    this.relationshipService.getRelationships()
      .subscribe(relationships => {
        for (let i = 0; i < relationships.length; i++) {
          if (relationships[i].userA === this.sessionID) {
            this.userService.getUser(relationships[i].userB)
              .subscribe(friend => {
                if (relationships[i].status === 'accepted') {
                  let latLng = new google.maps.LatLng(friend.posLat, friend.posLng);
                  let friendPosition = new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: latLng,
                    icon: '../../assets/markers/friend.png'
                  });

                  let content = '<div id="content">'+
                    '<div id="siteNotice"></div>'+
                    '<h4 id="firstHeading" class="firstHeading">'+friend.firstname+' '+friend.lastname+'</h4>'+
                    '</div>';

                  let friendWindow = new google.maps.InfoWindow({
                    content: content,
                    maxWidth: 250
                  });

                  friendPosition.addListener('click', function () {
                    NearbyPopoverPage.closeInfoWindows();
                    friendWindow.open(this.map, friendPosition);
                  });
                }
              });
          }
        }
      });
  }

  calcRoute(res) {
    if(this.directionsDisplay != null){
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
    }
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);

    let loading = this.loadingCtrl.create({
      content: "Preparing your route!"
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
    loading.present();

    this.geolocation.getCurrentPosition()
          .then((position) => {
            let posLat = position.coords.latitude;
            let posLng = position.coords.longitude;

            let start = new google.maps.LatLng(posLat,posLng);
            let end = new google.maps.LatLng(res[3], res[4]);

            let bounds = new google.maps.LatLngBounds();
            bounds.extend(start);
            bounds.extend(end);
            this.map.fitBounds(bounds);
            let request = {
              origin: start,
              destination: end,
              travelMode: google.maps.TravelMode.WALKING
            };

            directionsService.route(request, function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                loading.dismiss();
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(this.map);
              } else {
                alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
              }
            });
          });
    this.directionsDisplay = directionsDisplay;
  }
  clearMap(){

    if(this.directionsDisplay != null){
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
    }
  }


  goSettings() {
    if(this.directionsDisplay != null){
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
    }
    NearbyPopoverPage.setMapOnAll(null);
    this.navCtrl.push(SettingsPage, { sessionId: this.sessionID });
  }

  goFriends() {
    if(this.directionsDisplay != null){
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
    }
    NearbyPopoverPage.setMapOnAll(null);
    this.navCtrl.push(FriendsPage, { sessionId: this.sessionID });
  }

  reCenter() {
    this.userService.getUser(this.sessionID).subscribe(user => {
      let latLng = new google.maps.LatLng(user.posLat, user.posLng);
      this.map.panTo(latLng);
      this.map.setZoom(16);
    });
  }

  loadGoogleMap() {
    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {
      console.log("Google maps Javascript needs to be loaded");
      MapPage.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("Online, loading the map...");

        // Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          MapPage.enableMap();
        };

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);
      }
    } else {
      if (this.connectivityService.isOnline()) {
        console.log("Showing map");
        this.initMap();
        MapPage.enableMap();
      } else {
        console.log("Disabling map");
        MapPage.disableMap();
      }
    }
  }

  initMap() {
    this.mapInitialised = true;

    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#523735"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#c9b2a6"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#dcd2be"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ae9e90"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#93817c"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#a5b076"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#447530"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#fdfcf8"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f8c967"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#e9bc62"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e98d58"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#db8555"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#806b63"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8f7d77"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#b9d3c2"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#92998d"
              }
            ]
          }
        ]
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let myPosition = new google.maps.Marker({
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: '../../assets/markers/me.png'
      });
    })
  }

  static disableMap() {
    console.log("Disable map");
  }

  static enableMap() {
    console.log("Enable map");
  }

  addConnectivityListeners() {
    let onOnline = () => {
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMap();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          MapPage.enableMap();
        }
      }, 2000);
    };

    let onOffline = () => {
      MapPage.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
  }

}






@Component({
  selector: 'page-nearby',
  template: `
    <div style="text-align: center;"><h5><b>Find Near Me</b></h5></div>
    <hr/>
    <ion-list style="display: inline !important;">
      <button ion-item (click)="displayNearbyMcMaster('washrooms')">
          <img src="../../assets/icon/toilets.png" width="40px" item-start/>
          <ion-label>Washrooms</ion-label>       
      </button>
      <button ion-item (click)="displayNearbyMaps('cafe')">
        <img src="../../assets/icon/coffee-cup.png" width="40px" item-start/>
        <ion-label>Coffee Shops</ion-label>
      </button>
      <button ion-item (click)="displayNearbyMaps('restaurant')">
        <img src="../../assets/icon/restaurant.png" width="40px" item-start/>
        <ion-label>Restaurants</ion-label>
      </button>
      <button ion-item (click)="displayNearbyMaps('library')">
        <img src="../../assets/icon/library.png" width="40px" item-start/>
        <ion-label>Libraries</ion-label>
      </button>
      <button ion-item (click)="displayNearbyMaps('bus_station')">
        <img src="../../assets/icon/bus-stop.png" width="40px" item-start/>
        <ion-label>Bus stops</ion-label>
      </button>
      <button ion-item (click)="displayNearbyMaps('parking')">
        <img src="../../assets/icon/parking.png" width="40px" item-start/>
        <ion-label>Parking lots</ion-label>
      </button>
      <button ion-item (click)="displayNearbyMaps('convenience_store')">
        <img src="../../assets/icon/convenience-store.png" width="40px" item-start/>
        <ion-label>Convenience stores</ion-label>
      </button>
      <button ion-item (click)="displayNearbyMcMaster('labs')">
        <img src="../../assets/icon/computer-lab.png" width="40px" item-start/>
        <ion-label>Computer labs</ion-label>
      </button>
    </ion-list>
  `,
  providers: [ MapServiceProvider ]
})
export class NearbyPopoverPage {

  private sessionId; any;
  map: any;

  constructor(private navParams: NavParams,
              public mapService: MapServiceProvider,
              public userService: UserServiceProvider,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController) {}

  ngOnInit() {
    if (this.navParams.data) {
      this.map = this.navParams.data.map;
      this.sessionId = this.navParams.data.sessionId;
      NearbyPopoverPage.setMapOnAll(null);
      markers = [];

      NearbyPopoverPage.closeInfoWindows();
      infoWindows = [];
    }
  }

  displayNearbyMcMaster(what: string) {

    let loading = this.loadingCtrl.create({
      content: "Adding requested markers!"
    });


    NearbyPopoverPage.setMapOnAll(null);
    markers = [];

    NearbyPopoverPage.closeInfoWindows();
    infoWindows = [];
    loading.present();
    this.userService.getUser(this.sessionId)
      .subscribe(user => {

        let bounds = new google.maps.LatLngBounds();

        if (what === 'washrooms') {
          let washrooms_distances = [];

          for (let i = 0; i < washrooms.length; i++) {
            let w = matchBuilding(washrooms[i][0]);
            washrooms_distances.push([distance(user.posLat, user.posLng, w[3], w[4]), w, washrooms[i]]);
          }

          washrooms_distances.sort(function(a, b){return a[0] - b[0]});

          for (let i = 0; i < 5; i++) {
            let pos = new google.maps.LatLng({lat: washrooms_distances[i][1][3], lng: washrooms_distances[i][1][4]});
            let name = washrooms_distances[i][2][0];

            markers.push(new google.maps.Marker({
              map: this.map,
              draggable: false,
              animation: google.maps.Animation.DROP,
              position: pos,
              title: name,
              icon: '../../assets/markers/washroom.png'
            }));

            bounds.extend(markers[i].position);

            let floor = name.split(" ")[1];

            if (floor.indexOf('B') == 0) {
              floor = "Basement";
            } else if (floor.indexOf('A') == 0) {
              if (floor[1] === '1') { floor = "1st"; }
              else if (floor[1] === '2') { floor = "2nd"; }
              else if (floor[1] === '3') { floor = "3rd"; }
              else { floor = floor[1]+'th'; }
            } else {
              if (floor[0] === '1') { floor = "1st"; }
              else if (floor[0] === '2') { floor = "2nd"; }
              else if (floor[0] === '3') { floor = "3rd"; }
              else { floor = floor[0]+'th'; }
            }

            let content = '<div id="content">'+
                            '<div id="siteNotice"></div>'+
                            '<h4 id="firstHeading" class="firstHeading">Washrooms ('+name+')</h4>'+
                            '<div id="bodyContent">'+
                              '<p>These washrooms are located on the <b>'+floor+' floor</b> of the <b>'+washrooms_distances[i][1][1]+'</b>.</p>'+
                            '</div>'+
                          '</div>';

            infoWindows.push(new google.maps.InfoWindow({
              content: content,
              maxWidth: 250
            }));


            markers[i].addListener('click', function () {
              NearbyPopoverPage.closeInfoWindows();
              infoWindows[i].open(this.map, markers[i]);
            });
          }
        }
        else if (what === 'labs') {
          let labs_distances = [];

          for (let i = 0; i < computer_labs.length; i++) {
            let l = matchBuilding(computer_labs[i]);
            labs_distances.push([distance(user.posLat, user.posLng, l[3], l[4]), l, computer_labs[i]]);
          }

          labs_distances.sort(function(a, b){return a[0] - b[0]});

          for (let i = 0; i < 5; i++) {
            let pos = new google.maps.LatLng({lat: labs_distances[i][1][3], lng: labs_distances[i][1][4]});
            let name = labs_distances[i][2];

            markers.push(new google.maps.Marker({
              map: this.map,
              draggable: false,
              animation: google.maps.Animation.DROP,
              position: pos,
              title: name,
              icon: '../../assets/markers/computer-lab.png'
            }));

            bounds.extend(markers[i].position);

            let floor = name.split(" ")[1];

            if (floor.indexOf('B') == 0) {
              floor = "Basement";
            } else if (floor.indexOf('A') == 0) {
              if (floor[1] === '1') { floor = "1st"; }
              else if (floor[1] === '2') { floor = "2nd"; }
              else if (floor[1] === '3') { floor = "3rd"; }
              else { floor = floor[1]+'th'; }
            } else {
              if (floor[0] === '1') { floor = "1st"; }
              else if (floor[0] === '2') { floor = "2nd"; }
              else if (floor[0] === '3') { floor = "3rd"; }
              else { floor = floor[0]+'th'; }
            }

            let content = '<div id="content">'+
                            '<div id="siteNotice"></div>'+
                            '<h4 id="firstHeading" class="firstHeading">Computer Lab ('+name+')</h4>'+
                            '<div id="bodyContent">'+
                              '<p>This computer lab is located on the <b>'+floor+' floor</b> of the <b>'+labs_distances[i][1][1]+'</b>.</p>'+
                              '<p><button onclick="alert()">GO</button></p>'+
                            '</div>'+
                          '</div>';

            infoWindows.push(new google.maps.InfoWindow({
              content: content,
              maxWidth: 250
            }));


            markers[i].addListener('click', function () {
              NearbyPopoverPage.closeInfoWindows();
              infoWindows[i].open(this.map, markers[i]);
            });
          }
        }

        this.viewCtrl.dismiss();
        NearbyPopoverPage.setMapOnAll(this.map);
        this.map.fitBounds(bounds);
        loading.dismiss();
      });
  }

  displayNearbyMaps(what: string) {

    let loading = this.loadingCtrl.create({
      content: "Adding requested markers!"
    });

    /*
    {
      location: LatLng,
      rankby: prominence | distance,
      type: https://developers.google.com/places/web-service/supported_types
    }
    */
    NearbyPopoverPage.setMapOnAll(null);
    markers = [];

    NearbyPopoverPage.closeInfoWindows();
    infoWindows = [];
    loading.present();
    this.userService.getUser(this.sessionId)
      .subscribe(user => {
        let body = {
          location: user.posLat+','+user.posLng,
          rankby: 'distance',
          type: what
        };
        this.mapService.places_nearby(body)
          .subscribe(results => {

            let bounds = new google.maps.LatLngBounds();

            for (let i = 0; i < NearbyPopoverPage.min(results.length, 5); i++) {
              let pos = new google.maps.LatLng({lat: results[i].geometry.location.lat, lng: results[i].geometry.location.lng});
              let name = results[i].name;

              // Cafe
              if (what === 'cafe') {
                if (name === 'Tim Hortons') {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/tim-hortons.png'
                  }));
                } else if (name === 'Starbucks') {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/starbucks.png'
                  }));
                } else {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/cafe.png'
                  }));
                }
              }
              // Restaurant
              else if (what === 'restaurant') {
                if (name.indexOf('Pizza') != -1 || name.indexOf('pizza') != -1) {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/pizza.png'
                  }));
                } else if (name.indexOf('Chinese') != -1 || name.indexOf('chinese') != -1 ||
                           name.indexOf('Viet') != -1 || name.indexOf('viet') != -1) {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/chinese.png'
                  }));
                } else if (name.indexOf('Sushi') != -1 || name.indexOf('sushi') != -1 ||
                           name.indexOf('Japanese') != -1 || name.indexOf('japanese') != -1) {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/sushi.png'
                  }));
                } else if (name.indexOf('Burger') != -1 || name.indexOf('burger') != -1) {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/burger.png'
                  }));
                } else if (name === 'Subway') {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/subway.png'
                  }));
                } else if (name === 'McDonald\'s') {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/mc-donalds.png'
                  }));
                } else if (name === 'Burger King') {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/burger-king.png'
                  }));
                } else {
                  markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/restaurant.png'
                  }));
                }
              }
              // Library
              else if (what === 'library') {
                markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/library.png'
                  }));
              }
              // Bus stations
              else if (what === 'bus_station') {
                markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/bus.png'
                  }));
              }
              // Parking
              else if (what === 'parking') {
                markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/parking.png'
                  }));
              }
              // Convenience stores
              else if (what === 'convenience_store') {
                markers.push(new google.maps.Marker({
                    map: this.map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: name,
                    icon: '../../assets/markers/store.png'
                  }));
              }

              bounds.extend(markers[i].position);
              let content = "";

              if (what === 'restaurant' || what === 'cafe' || what === 'library' || what === 'convenience_store') {
                if (results[i].price_level != undefined && results[i].opening_hours != undefined) {
                  content = '<div id="content">'+
                    '<div id="siteNotice"></div>'+
                    '<h4 id="firstHeading" class="firstHeading">'+NearbyPopoverPage.displayOpen(results[i].opening_hours.open_now)+' '+name+'</h4>'+
                    '<div id="bodyContent">'+
                    '<p><b>Rating</b>: '+NearbyPopoverPage.displayRating(results[i].rating)+'</p>'+
                    '<p><b>Price level</b>: '+NearbyPopoverPage.displayPrice(results[i].price_level)+'</p>'+
                    '</div>'+
                    '</div>';
                } else if (results[i].opening_hours == undefined) {
                  content = '<div id="content">'+
                    '<div id="siteNotice"></div>'+
                    '<h4 id="firstHeading" class="firstHeading">'+name+'</h4>'+
                    '<div id="bodyContent">'+
                    '<p><b>Rating</b>: '+NearbyPopoverPage.displayRating(results[i].rating)+'</p>'+
                    '<p><b>Price level</b>: '+NearbyPopoverPage.displayPrice(results[i].price_level)+'</p>'+
                    '</div>'+
                    '</div>';
                } else {
                  content = '<div id="content">'+
                    '<div id="siteNotice"></div>'+
                    '<h4 id="firstHeading" class="firstHeading">'+NearbyPopoverPage.displayOpen(results[i].opening_hours.open_now)+' '+name+'</h4>'+
                    '<div id="bodyContent">'+
                    '<p><b>Rating</b>: '+NearbyPopoverPage.displayRating(results[i].rating)+'</p>'+
                    '</div>'+
                    '</div>';
                }
              } else if (what === 'bus_station' || what === 'parking') {
                content = '<div id="content">'+
                  '<div id="siteNotice"></div>'+
                  '<h4 id="firstHeading" class="firstHeading">'+name+'</h4>'+
                  '</div>';
              }


              infoWindows.push(new google.maps.InfoWindow({
                content: content,
                maxWidth: 250
              }));


              markers[i].addListener('click', function () {
                NearbyPopoverPage.closeInfoWindows();
                infoWindows[i].open(this.map, markers[i]);
              });

            }

            this.viewCtrl.dismiss();
            NearbyPopoverPage.setMapOnAll(this.map);
            this.map.fitBounds(bounds);
          });
      });
    loading.dismiss();
  }

  static displayOpen(data) {
    let res = "";
    if (data === true) {
      res = '<img src= "../../assets/icon/open.png" style="vertical-align: middle"/>';
    } else {
      res = '<img src= "../../assets/icon/close.png" style="vertical-align: middle"/>';
    }
    return res;
  }

  static displayRating(data) {
    let res = "";
    while (data >= 1) {
      res += '<img src="../../assets/icon/star.png" style="vertical-align: middle"/>';
      data--;
    }
    if (data > 0) {
      res += '<img src="../../assets/icon/half-star.png" style="vertical-align: middle"/>';
    }
    return res;
  }

  static displayPrice(data) {
    let res = "";
    while (data >= 1) {
      res += '<img src="../../assets/icon/dollar.png" style="vertical-align: middle"/>';
      data--;
    }
    return res;
  }

  static min(a: number, b: number): number {
    return a < b ? a : b;
  }

  static setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  static closeInfoWindows() {
    for (let i = 0; i < infoWindows.length; i++) {
      infoWindows[i].close();
    }
  }

  dismiss(data) {
    console.log(data);
    this.viewCtrl.dismiss({pos: data});
  }
}
