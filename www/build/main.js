webpackJsonp([0],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__map_map__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, formBuilder, alertCtrl, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.submitAttempt = false;
        this.email = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("^[_a-z0-9-]+(.[a-z0-9-]+)@mcmaster\\.ca$")
        ]);
        this.password = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("^[a-zA-Z]\\w{3,14}$")
        ]);
        this.login = this.formBuilder.group({
            email: this.email,
            password: this.password
        });
        this.email_after_register = navParams.get("email");
    }
    LoginPage.prototype.process_login = function () {
        this.submitAttempt = true;
        if (this.login.valid) {
            var email = this.login.value.email;
            var password = this.login.value.password;
            this.checkCredentials(email, password);
        }
    };
    LoginPage.prototype.presentAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Bad credentials',
            subTitle: 'The provided email and password does not match with our user database. Please register before using the app!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: 'Register',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignUpPage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage.prototype.checkCredentials = function (email, password) {
        var _this = this;
        return this.userService.getUsers()
            .subscribe(function (users) {
            for (var i = 0; i < users.length; i++) {
                if (email === users[i].email && password === users[i].password) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__map_map__["a" /* MapPage */], { 'sessionId': users[i]._id });
                    return;
                }
            }
            _this.presentAlert();
            return;
        });
    };
    LoginPage.prototype.goSignUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignUpPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/root/Downloads/MaraudersMap/src/pages/login/login.html"*/'<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <div text-center>\n          <img width="80%" heigh="80%" src="../assets/imgs/logo.png" />\n        </div>\n      </ion-col>\n    </ion-row>\n\n    <form [formGroup]="login" (ngSubmit)="process_login()">\n\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-input type="text" placeholder="McMaster email" formControlName="email" clearInput\n                       [(ngModel)]="email_after_register"\n                       [class.invalid]="!login.controls.email.valid && (login.controls.email.dirty || submitAttempt)">\n            </ion-input>\n          </ion-item>\n          <ion-item *ngIf="!login.controls.email.valid && (login.controls.email.dirty || submitAttempt)">\n            <p>Please enter a valid McMaster email!</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-input type="password" placeholder="Password" formControlName="password" clearInput\n                       [class.invalid]="!login.controls.password.valid && (login.controls.password.dirty || submitAttempt)">\n            </ion-input>\n          </ion-item>\n          <ion-item *ngIf="!login.controls.password.valid && (login.controls.password.dirty || submitAttempt)">\n            <p>Please enter a valid password!</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col text-center>\n          <button type="submit" ion-button round full large\n                  color="login" style="color: #333333"\n                  [disabled]="!login.valid">\n            Login &nbsp;&nbsp; <ion-icon name="arrow-dropright-circle"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n\n    <ion-row>\n      <ion-col text-center>\n        <p>\n          Not registered yet?<br><br>\n          <button ion-button round outline (click)="goSignUp()">Register</button>\n        </p>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/root/Downloads/MaraudersMap/src/pages/login/login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelationshipServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RelationshipServiceProvider = (function () {
    function RelationshipServiceProvider(http) {
        this.http = http;
        //private relationshipUrl = 'mongodb://root:root2017@ds129066.mlab.com:29066/marauders-map/relationships';  // URL to web api
        this.relationshipUrl = 'http://localhost:3000/relationships'; // URL to web api
    }
    RelationshipServiceProvider.prototype.getRelationships = function () {
        return this.http.get(this.relationshipUrl)
            .map(function (response) {
            return response.json();
        });
    };
    ;
    RelationshipServiceProvider.prototype.createRelationship = function (rel) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "userA=" + rel.userA + "&userB=" + rel.userB + "&status=" + rel.status;
        return this.http.post(this.relationshipUrl, body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("New relationship registered"); });
    };
    RelationshipServiceProvider.prototype.getRelationship = function (id) {
        return this.http.get(this.relationshipUrl + '/' + id)
            .map(function (response) {
            return response.json();
        });
    };
    RelationshipServiceProvider.prototype.updateRelationship = function (id, new_rel) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "_id=" + id + "&_rev=" + new_rel.rev + "&" +
            "userA=" + new_rel.userA + "&" +
            "userB=" + new_rel.userB + "&" +
            "status=" + new_rel.status;
        return this.http.post(this.relationshipUrl + '/' + id, body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("Relationship updated"); });
    };
    return RelationshipServiceProvider;
}());
RelationshipServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], RelationshipServiceProvider);

//# sourceMappingURL=relationship-service.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NearbyPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connectivity_service_connectivity_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__friends_friends__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_relationship_service_relationship_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_service_user_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_map_service_map_service__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var markers = [];
var infoWindows = [];
var washrooms = [
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
var computer_labs = [
    'BSB 241', 'BSB 242', 'BSB 244', 'BSB 249',
    'JHE 233', 'JHE 234',
    'KTH B121', 'KTH B123'
];
var buildings = [
    ['7', 'Alumni House', 'AH', 43.265198, -79.923088],
    ['8', 'Alumni Memorial Building', 'AMB', 43.263983, -79.919653],
    ['33', 'Applied Dynamics Laboratory', 'ADL', 43.263517, -79.928331],
    ['25', 'Arthur N. Bourns Building', 'ABB', 43.260398, -79.921733],
    ['40', 'Bates Residence Building', 'BRB', 43.263945, -79.922590],
    ['30', 'Biology Greenhouse', 'BG', 43.262984, -79.920695],
    ['36', 'Brandon Hall', 'BH', 43.265908, -79.919824],
    ['11', 'Burke Sciences Building', 'BSB', 43.262057, -79.920183],
    ['31', 'Campus Services Building', 'CSB', 43.261964, -79.927773],
    ['23', 'Chester New Hall', 'CNH', 43.263818, -79.918414],
    ['28', 'Commons Building', 'CB', 43.265514, -79.919257],
    ['43', 'Communications Research Laboratory', 'CRL', 43.259159, -79.919314],
    ['54', 'David Braley Athletic Centre', 'DBAC', 43.264716, -79.916198],
    ['46', 'DeGroote School of Business', 'DSB', 43.264108, -79.916478],
    ['12', 'E.T. Clarke Centre', 'ETCC', 43.261777, -79.922047],
    ['5', 'Edwards Hall', 'EH', 43.264091, -79.918968],
    ['56', 'Engineering Technology Building', 'ETB', 43.258485, -79.920078],
    ['EX', 'Examination Centre', 'EC', 43.257337, -79.921087],
    ['22', 'General Sciences Building', 'GSB', 43.262343, -79.921248],
    ['20', 'Guilmour Hall', 'GH', 43.263229, -79.918480],
    ['42', 'H.G. Thode Library', 'HGTL', 43.261113, -79.922600],
    ['2', 'Hamilton Hall', 'HH', 43.263163, -79.920116],
    ['37', 'Health Science Centre', 'HSC', 43.259522, -79.917414],
    ['45', 'Hedden Hall', 'HeH', 43.266374, -79.918189],
    ['49', 'Information Technology Building', 'ITB', 43.258837, -79.920897],
    ['48', 'Institute for Applied Health Sciences', 'IAHS', 43.259720, -79.920498],
    ['24', 'Ivor Wynne Centre', 'IWC', 43.265565, -79.915570],
    ['16', 'John Hodgins Engineering Building', 'JHE', 43.260797, -79.920428],
    ['38', 'Kenneth Taylor Hall', 'KTH', 43.264088, -79.916909],
    ['74', 'L.R. Wilson Hall', 'LRW', 43.261823, -79.916697],
    ['53', 'Les Princes Hall', 'LPH', 43.267453, -79.917099],
    ['39', 'Life Sciences Building', 'LSB', 43.261003, -79.917801],
    ['50', 'Mary E. Keyes Residence', 'MKR', 43.262695, -79.922853],
    ['26', 'Matthews Hall', 'MattH', 43.262766, -79.922111],
    ['27', 'McKay Hall', 'MKH', 43.265133, -79.919003],
    ['T33', 'McMaster Children\'s Centre', 'MCC', 43.263855, -79.927609],
    ['17', 'Divinity College', 'MDC', 43.261857, -79.918007],
    ['51', 'McMaster University Student Centre', 'MUSC', 43.263453, -79.917581],
    ['52', 'Michael DeGroote Centre for Learning and Discovery', 'MDCL', 43.261046, -79.916794],
    ['10', 'Mills Memorial Library / Museum of Art', 'MML', 43.262733, -79.917606],
    ['18', 'Moulton Hall', 'MoH', 43.263312, -79.922194],
    ['15', 'Nuclear Reactor', 'NucR', 43.261174, -79.921479],
    ['9', 'Nuclear Research Building', 'NRB', 43.261414, -79.921101],
    ['T13', 'Preliminary Laboratory', 'PB', 43.258623, -79.919531],
    ['34', 'Psychology Building', 'PB', 43.259700, -79.919468],
    ['4', 'Refectory', 'REF', 43.262883, -79.921105],
    ['55', 'Ron Joyce Stadium', 'RJS', 43.266125, -79.916387],
    ['32', 'Tandem Accelerator Building', 'TAB', 43.262042, -79.921192],
    ['T26', 'Temporary Building', 'TB', 43.262883, -79.928105],
    ['29', 'Togo Salmon Hall', 'TSH', 43.264302, -79.917731],
    ['1', 'University Hall', 'UH', 43.263440, -79.918930],
    ['6', 'Wallingford Hall', 'WaH', 43.263022, -79.921636],
    ['19', 'Whidden Hall', 'WhiH', 43.265035, -79.919558],
    ['35', 'Woodstock Hall', 'WoH', 43.265985, -79.918981]
];
var others = [
    ['cafe', 'Tim Hortons', 'Tim Hortons', 43.263592, -79.917692],
    ['cafe', 'Starbucks', 'Starbucks', 43.263184, -79.918319]
];
// GLOBAL FUNCTIONS
function matchBuilding(code) {
    for (var i = 0; i < buildings.length; i++) {
        if (code.indexOf(buildings[i][2]) != -1) {
            return buildings[i];
        }
    }
    return undefined;
}
function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
var MapPage = MapPage_1 = (function () {
    function MapPage(navCtrl, connectivityService, geolocation, navParams, relationshipService, userService, popoverCtrl, loadingCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.relationshipService = relationshipService;
        this.userService = userService;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.mapInitialised = false;
        this.apiKey = "AIzaSyBiua_0qPExEsd4RF9b94R0G1s0nfCxOQ4";
        this.numberNotifications = 0;
        this.userInput = '';
        this.results = [];
        this.searching = false;
        this.sessionID = this.navParams.get("sessionId");
        this.getNumberNotifications();
        this.loadGoogleMap();
        this.updateGeoloc();
        this.displayFriends();
        this.userInput = '';
        this.searching = false;
    }
    MapPage.prototype.onInput = function (ev) {
        var _this = this;
        this.relationshipService.getRelationships()
            .subscribe(function (relationships) {
            var val = ev.target.value;
            _this.searching = true;
            _this.results = [];
            // FRIENDS
            var first = true;
            var _loop_1 = function (i) {
                if (relationships[i].userA === _this.sessionID) {
                    _this.userService.getUser(relationships[i].userB)
                        .subscribe(function (friend) {
                        if (relationships[i].status === 'accepted') {
                            _this.results.push(['friend', friend.firstname, friend.lastname, parseFloat(friend.posLat), parseFloat(friend.posLng), friend.avatar]);
                        }
                        if (first) {
                            // BUILDINGS
                            for (var i_1 = 0; i_1 < buildings.length; i_1++) {
                                _this.results.push(['building', buildings[i_1][1], buildings[i_1][2], buildings[i_1][3], buildings[i_1][4]]);
                            }
                            // OTHERS
                            for (var i_2 = 0; i_2 < others.length; i_2++) {
                                _this.results.push(others[i_2]);
                            }
                        }
                        if (val && val.trim() != '') {
                            _this.results = _this.results.filter(function (result) {
                                return (result[1].toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                                    result[2].toLowerCase().indexOf(val.toLowerCase()) > -1);
                            });
                            var res = [];
                            if (_this.results.length > 4) {
                                for (var i_3 = 0; i_3 < 4; i_3++) {
                                    res.push(_this.results[i_3]);
                                }
                                _this.results = res;
                            }
                        }
                        else {
                            _this.searching = false;
                        }
                        first = false;
                    });
                }
            };
            for (var i = 0; i < relationships.length; i++) {
                _loop_1(i);
            }
        });
    };
    MapPage.prototype.showNearbyPopover = function (ev) {
        this.clearMap();
        var popover = this.popoverCtrl.create(NearbyPopoverPage, { map: this.map, sessionId: this.sessionID });
        popover.present({
            ev: ev
        });
    };
    MapPage.prototype.getNumberNotifications = function () {
        var _this = this;
        this.relationshipService.getRelationships()
            .subscribe(function (relationships) {
            var _loop_2 = function (i) {
                if (relationships[i].userA === _this.sessionID) {
                    _this.userService.getUser(relationships[i].userB)
                        .subscribe(function (friend) {
                        if (relationships[i].status === 'received') {
                            _this.numberNotifications++;
                        }
                    });
                }
            };
            for (var i = 0; i < relationships.length; i++) {
                _loop_2(i);
            }
        });
    };
    MapPage.prototype.updateGeoloc = function () {
        var _this = this;
        this.userService.getUser(this.sessionID)
            .subscribe(function (user) {
            var posLat, posLng;
            _this.geolocation.getCurrentPosition()
                .then(function (position) {
                posLat = position.coords.latitude;
                posLng = position.coords.longitude;
                _this.userService.updateUser(_this.sessionID, {
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
    };
    MapPage.prototype.displayFriends = function () {
        var _this = this;
        this.relationshipService.getRelationships()
            .subscribe(function (relationships) {
            var _loop_3 = function (i) {
                if (relationships[i].userA === _this.sessionID) {
                    _this.userService.getUser(relationships[i].userB)
                        .subscribe(function (friend) {
                        if (relationships[i].status === 'accepted') {
                            var latLng = new google.maps.LatLng(friend.posLat, friend.posLng);
                            var friendPosition_1 = new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: latLng,
                                icon: '../../assets/markers/friend.png'
                            });
                            var content = '<div id="content">' +
                                '<div id="siteNotice"></div>' +
                                '<h4 id="firstHeading" class="firstHeading">' + friend.firstname + ' ' + friend.lastname + '</h4>' +
                                '</div>';
                            var friendWindow_1 = new google.maps.InfoWindow({
                                content: content,
                                maxWidth: 250
                            });
                            friendPosition_1.addListener('click', function () {
                                NearbyPopoverPage.closeInfoWindows();
                                friendWindow_1.open(this.map, friendPosition_1);
                            });
                        }
                    });
                }
            };
            for (var i = 0; i < relationships.length; i++) {
                _loop_3(i);
            }
        });
    };
    MapPage.prototype.calcRoute = function (res) {
        var _this = this;
        if (this.directionsDisplay != null) {
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = null;
        }
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(this.map);
        var loading = this.loadingCtrl.create({
            content: "Preparing your route!"
        });
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
        this.geolocation.getCurrentPosition()
            .then(function (position) {
            var posLat = position.coords.latitude;
            var posLng = position.coords.longitude;
            var start = new google.maps.LatLng(posLat, posLng);
            var end = new google.maps.LatLng(res[3], res[4]);
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(start);
            bounds.extend(end);
            _this.map.fitBounds(bounds);
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    loading.dismiss();
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap(this.map);
                }
                else {
                    alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
                }
            });
        });
        this.directionsDisplay = directionsDisplay;
    };
    MapPage.prototype.clearMap = function () {
        if (this.directionsDisplay != null) {
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = null;
        }
    };
    MapPage.prototype.goSettings = function () {
        if (this.directionsDisplay != null) {
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = null;
        }
        NearbyPopoverPage.setMapOnAll(null);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__settings_settings__["b" /* SettingsPage */], { sessionId: this.sessionID });
    };
    MapPage.prototype.goFriends = function () {
        if (this.directionsDisplay != null) {
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = null;
        }
        NearbyPopoverPage.setMapOnAll(null);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__friends_friends__["a" /* FriendsPage */], { sessionId: this.sessionID });
    };
    MapPage.prototype.reCenter = function () {
        var _this = this;
        this.userService.getUser(this.sessionID).subscribe(function (user) {
            var latLng = new google.maps.LatLng(user.posLat, user.posLng);
            _this.map.panTo(latLng);
            _this.map.setZoom(16);
        });
    };
    MapPage.prototype.loadGoogleMap = function () {
        var _this = this;
        this.addConnectivityListeners();
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
            console.log("Google maps Javascript needs to be loaded");
            MapPage_1.disableMap();
            if (this.connectivityService.isOnline()) {
                console.log("Online, loading the map...");
                // Load the SDK
                window['mapInit'] = function () {
                    _this.initMap();
                    MapPage_1.enableMap();
                };
                var script = document.createElement("script");
                script.id = "googleMaps";
                if (this.apiKey) {
                    script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
                }
                else {
                    script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                }
                document.body.appendChild(script);
            }
        }
        else {
            if (this.connectivityService.isOnline()) {
                console.log("Showing map");
                this.initMap();
                MapPage_1.enableMap();
            }
            else {
                console.log("Disabling map");
                MapPage_1.disableMap();
            }
        }
    };
    MapPage.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
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
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            var myPosition = new google.maps.Marker({
                map: _this.map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: latLng,
                icon: '../../assets/markers/me.png'
            });
        });
    };
    MapPage.disableMap = function () {
        console.log("Disable map");
    };
    MapPage.enableMap = function () {
        console.log("Enable map");
    };
    MapPage.prototype.addConnectivityListeners = function () {
        var _this = this;
        var onOnline = function () {
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMap();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    MapPage_1.enableMap();
                }
            }, 2000);
        };
        var onOffline = function () {
            MapPage_1.disableMap();
        };
        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);
    };
    return MapPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], MapPage.prototype, "mapElement", void 0);
MapPage = MapPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-map',template:/*ion-inline-start:"/root/Downloads/MaraudersMap/src/pages/map/map.html"*/'<ion-header>\n  <ion-toolbar color="gray">\n    <ion-searchbar type="search" animated="true"\n                   placeholder="Let\'s find what you want!"\n                   [(ngModel)]="userInput"\n                   [showCancelButton]="shouldShowCancel"\n                   (ionInput)="onInput($event)">>\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-list *ngIf="results != undefined && results.length > 0 && searching == true" style="display: inline !important;">\n    <button ion-item *ngFor="let res of results" (click)="calcRoute(res)" style="background-color: white; color: black;">\n        <div *ngIf="res[0] === \'friend\'">\n          <img src="../../assets/avatars/{{res[5]}}.png" item-start style="height: 30px; vertical-align: middle; border-radius: 10px">\n          {{res[1]}} {{res[2]}}\n        </div>\n        <div *ngIf="res[0] === \'building\'">\n          <img src="../../assets/icon/building.png" item-start style="height: 30px; vertical-align: middle">\n          {{res[1]}}\n        </div>\n        <div *ngIf="res[0] === \'cafe\' && res[1] === \'Tim Hortons\'">\n          <img src="../../assets/markers/tim-hortons.png" item-start style="height: 30px; vertical-align: middle">\n          {{res[1]}}\n        </div>\n        <div *ngIf="res[0] === \'cafe\' && res[1] === \'Starbucks\'">\n          <img src="../../assets/markers/starbucks.png" item-start style="height: 30px; vertical-align: middle">\n          {{res[1]}}\n        </div>\n    </button>\n  </ion-list>\n\n  <div #map id="map"></div>\n\n  <ion-fab bottom center>\n    <button ion-button large (click)="reCenter()" style="background-color: white; width: 30px; height: 30px; margin-left: 15px; margin-bottom: 10px"><ion-icon name="locate" style="color: dodgerblue;border-radius: 25px;"></ion-icon></button>\n  </ion-fab>\n  <ion-fab bottom center>\n    <button ion-button large (click)="reCenter()" style="margin-bottom: -10px; border-radius: 25px; margin-left: -40px; width: 150px; height: 25px; background-color: white; color: black">\n      <ion-note>Locate Me</ion-note>\n    </button>\n  </ion-fab>\n\n  <ion-fab top right *ngIf="searching == false">\n  <button ion-fab large color="secondary" (click)="showNearbyPopover($event)"><img src="../../assets/imgs/aroundMe.png"></button>\n</ion-fab>\n\n  <ion-fab bottom left>\n    <button ion-fab large (click)="goSettings()" style="background-color: darkslategray"><ion-icon name="settings"></ion-icon></button>\n  </ion-fab>\n\n  <ion-fab bottom right>\n    <button ion-fab large (click)="goFriends()">\n      <ion-icon name="people"></ion-icon>\n    </button>\n  </ion-fab>\n  <ion-fab bottom right *ngIf="numberNotifications > 0">\n    <ion-badge color="danger">{{ numberNotifications }}</ion-badge>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/root/Downloads/MaraudersMap/src/pages/map/map.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_connectivity_service_connectivity_service__["a" /* ConnectivityServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_6__providers_relationship_service_relationship_service__["a" /* RelationshipServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_7__providers_user_service_user_service__["a" /* UserServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], MapPage);

var NearbyPopoverPage = NearbyPopoverPage_1 = (function () {
    function NearbyPopoverPage(navParams, mapService, userService, loadingCtrl, viewCtrl) {
        this.navParams = navParams;
        this.mapService = mapService;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
    }
    NearbyPopoverPage.prototype.ngOnInit = function () {
        if (this.navParams.data) {
            this.map = this.navParams.data.map;
            this.sessionId = this.navParams.data.sessionId;
            NearbyPopoverPage_1.setMapOnAll(null);
            markers = [];
            NearbyPopoverPage_1.closeInfoWindows();
            infoWindows = [];
        }
    };
    NearbyPopoverPage.prototype.displayNearbyMcMaster = function (what) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Adding requested markers!"
        });
        NearbyPopoverPage_1.setMapOnAll(null);
        markers = [];
        NearbyPopoverPage_1.closeInfoWindows();
        infoWindows = [];
        loading.present();
        this.userService.getUser(this.sessionId)
            .subscribe(function (user) {
            var bounds = new google.maps.LatLngBounds();
            if (what === 'washrooms') {
                var washrooms_distances = [];
                for (var i = 0; i < washrooms.length; i++) {
                    var w = matchBuilding(washrooms[i][0]);
                    washrooms_distances.push([distance(user.posLat, user.posLng, w[3], w[4]), w, washrooms[i]]);
                }
                washrooms_distances.sort(function (a, b) { return a[0] - b[0]; });
                var _loop_4 = function (i) {
                    var pos = new google.maps.LatLng({ lat: washrooms_distances[i][1][3], lng: washrooms_distances[i][1][4] });
                    var name_1 = washrooms_distances[i][2][0];
                    markers.push(new google.maps.Marker({
                        map: _this.map,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        position: pos,
                        title: name_1,
                        icon: '../../assets/markers/washroom.png'
                    }));
                    bounds.extend(markers[i].position);
                    var floor = name_1.split(" ")[1];
                    if (floor.indexOf('B') == 0) {
                        floor = "Basement";
                    }
                    else if (floor.indexOf('A') == 0) {
                        if (floor[1] === '1') {
                            floor = "1st";
                        }
                        else if (floor[1] === '2') {
                            floor = "2nd";
                        }
                        else if (floor[1] === '3') {
                            floor = "3rd";
                        }
                        else {
                            floor = floor[1] + 'th';
                        }
                    }
                    else {
                        if (floor[0] === '1') {
                            floor = "1st";
                        }
                        else if (floor[0] === '2') {
                            floor = "2nd";
                        }
                        else if (floor[0] === '3') {
                            floor = "3rd";
                        }
                        else {
                            floor = floor[0] + 'th';
                        }
                    }
                    var content = '<div id="content">' +
                        '<div id="siteNotice"></div>' +
                        '<h4 id="firstHeading" class="firstHeading">Washrooms (' + name_1 + ')</h4>' +
                        '<div id="bodyContent">' +
                        '<p>These washrooms are located on the <b>' + floor + ' floor</b> of the <b>' + washrooms_distances[i][1][1] + '</b>.</p>' +
                        '</div>' +
                        '</div>';
                    infoWindows.push(new google.maps.InfoWindow({
                        content: content,
                        maxWidth: 250
                    }));
                    markers[i].addListener('click', function () {
                        NearbyPopoverPage_1.closeInfoWindows();
                        infoWindows[i].open(this.map, markers[i]);
                    });
                };
                for (var i = 0; i < 5; i++) {
                    _loop_4(i);
                }
            }
            else if (what === 'labs') {
                var labs_distances = [];
                for (var i = 0; i < computer_labs.length; i++) {
                    var l = matchBuilding(computer_labs[i]);
                    labs_distances.push([distance(user.posLat, user.posLng, l[3], l[4]), l, computer_labs[i]]);
                }
                labs_distances.sort(function (a, b) { return a[0] - b[0]; });
                var _loop_5 = function (i) {
                    var pos = new google.maps.LatLng({ lat: labs_distances[i][1][3], lng: labs_distances[i][1][4] });
                    var name_2 = labs_distances[i][2];
                    markers.push(new google.maps.Marker({
                        map: _this.map,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        position: pos,
                        title: name_2,
                        icon: '../../assets/markers/computer-lab.png'
                    }));
                    bounds.extend(markers[i].position);
                    var floor = name_2.split(" ")[1];
                    if (floor.indexOf('B') == 0) {
                        floor = "Basement";
                    }
                    else if (floor.indexOf('A') == 0) {
                        if (floor[1] === '1') {
                            floor = "1st";
                        }
                        else if (floor[1] === '2') {
                            floor = "2nd";
                        }
                        else if (floor[1] === '3') {
                            floor = "3rd";
                        }
                        else {
                            floor = floor[1] + 'th';
                        }
                    }
                    else {
                        if (floor[0] === '1') {
                            floor = "1st";
                        }
                        else if (floor[0] === '2') {
                            floor = "2nd";
                        }
                        else if (floor[0] === '3') {
                            floor = "3rd";
                        }
                        else {
                            floor = floor[0] + 'th';
                        }
                    }
                    var content = '<div id="content">' +
                        '<div id="siteNotice"></div>' +
                        '<h4 id="firstHeading" class="firstHeading">Computer Lab (' + name_2 + ')</h4>' +
                        '<div id="bodyContent">' +
                        '<p>This computer lab is located on the <b>' + floor + ' floor</b> of the <b>' + labs_distances[i][1][1] + '</b>.</p>' +
                        '<p><button onclick="alert()">GO</button></p>' +
                        '</div>' +
                        '</div>';
                    infoWindows.push(new google.maps.InfoWindow({
                        content: content,
                        maxWidth: 250
                    }));
                    markers[i].addListener('click', function () {
                        NearbyPopoverPage_1.closeInfoWindows();
                        infoWindows[i].open(this.map, markers[i]);
                    });
                };
                for (var i = 0; i < 5; i++) {
                    _loop_5(i);
                }
            }
            _this.viewCtrl.dismiss();
            NearbyPopoverPage_1.setMapOnAll(_this.map);
            _this.map.fitBounds(bounds);
            loading.dismiss();
        });
    };
    NearbyPopoverPage.prototype.displayNearbyMaps = function (what) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Adding requested markers!"
        });
        /*
        {
          location: LatLng,
          rankby: prominence | distance,
          type: https://developers.google.com/places/web-service/supported_types
        }
        */
        NearbyPopoverPage_1.setMapOnAll(null);
        markers = [];
        NearbyPopoverPage_1.closeInfoWindows();
        infoWindows = [];
        loading.present();
        this.userService.getUser(this.sessionId)
            .subscribe(function (user) {
            var body = {
                location: user.posLat + ',' + user.posLng,
                rankby: 'distance',
                type: what
            };
            _this.mapService.places_nearby(body)
                .subscribe(function (results) {
                var bounds = new google.maps.LatLngBounds();
                var _loop_6 = function (i) {
                    var pos = new google.maps.LatLng({ lat: results[i].geometry.location.lat, lng: results[i].geometry.location.lng });
                    var name_3 = results[i].name;
                    // Cafe
                    if (what === 'cafe') {
                        if (name_3 === 'Tim Hortons') {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/tim-hortons.png'
                            }));
                        }
                        else if (name_3 === 'Starbucks') {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/starbucks.png'
                            }));
                        }
                        else {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/cafe.png'
                            }));
                        }
                    }
                    else if (what === 'restaurant') {
                        if (name_3.indexOf('Pizza') != -1 || name_3.indexOf('pizza') != -1) {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/pizza.png'
                            }));
                        }
                        else if (name_3.indexOf('Chinese') != -1 || name_3.indexOf('chinese') != -1 ||
                            name_3.indexOf('Viet') != -1 || name_3.indexOf('viet') != -1) {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/chinese.png'
                            }));
                        }
                        else if (name_3.indexOf('Sushi') != -1 || name_3.indexOf('sushi') != -1 ||
                            name_3.indexOf('Japanese') != -1 || name_3.indexOf('japanese') != -1) {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/sushi.png'
                            }));
                        }
                        else if (name_3.indexOf('Burger') != -1 || name_3.indexOf('burger') != -1) {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/burger.png'
                            }));
                        }
                        else if (name_3 === 'Subway') {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/subway.png'
                            }));
                        }
                        else if (name_3 === 'McDonald\'s') {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/mc-donalds.png'
                            }));
                        }
                        else if (name_3 === 'Burger King') {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/burger-king.png'
                            }));
                        }
                        else {
                            markers.push(new google.maps.Marker({
                                map: _this.map,
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                                position: pos,
                                title: name_3,
                                icon: '../../assets/markers/restaurant.png'
                            }));
                        }
                    }
                    else if (what === 'library') {
                        markers.push(new google.maps.Marker({
                            map: _this.map,
                            draggable: false,
                            animation: google.maps.Animation.DROP,
                            position: pos,
                            title: name_3,
                            icon: '../../assets/markers/library.png'
                        }));
                    }
                    else if (what === 'bus_station') {
                        markers.push(new google.maps.Marker({
                            map: _this.map,
                            draggable: false,
                            animation: google.maps.Animation.DROP,
                            position: pos,
                            title: name_3,
                            icon: '../../assets/markers/bus.png'
                        }));
                    }
                    else if (what === 'parking') {
                        markers.push(new google.maps.Marker({
                            map: _this.map,
                            draggable: false,
                            animation: google.maps.Animation.DROP,
                            position: pos,
                            title: name_3,
                            icon: '../../assets/markers/parking.png'
                        }));
                    }
                    else if (what === 'convenience_store') {
                        markers.push(new google.maps.Marker({
                            map: _this.map,
                            draggable: false,
                            animation: google.maps.Animation.DROP,
                            position: pos,
                            title: name_3,
                            icon: '../../assets/markers/store.png'
                        }));
                    }
                    bounds.extend(markers[i].position);
                    var content = "";
                    if (what === 'restaurant' || what === 'cafe' || what === 'library' || what === 'convenience_store') {
                        if (results[i].price_level != undefined && results[i].opening_hours != undefined) {
                            content = '<div id="content">' +
                                '<div id="siteNotice"></div>' +
                                '<h4 id="firstHeading" class="firstHeading">' + NearbyPopoverPage_1.displayOpen(results[i].opening_hours.open_now) + ' ' + name_3 + '</h4>' +
                                '<div id="bodyContent">' +
                                '<p><b>Rating</b>: ' + NearbyPopoverPage_1.displayRating(results[i].rating) + '</p>' +
                                '<p><b>Price level</b>: ' + NearbyPopoverPage_1.displayPrice(results[i].price_level) + '</p>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (results[i].opening_hours == undefined) {
                            content = '<div id="content">' +
                                '<div id="siteNotice"></div>' +
                                '<h4 id="firstHeading" class="firstHeading">' + name_3 + '</h4>' +
                                '<div id="bodyContent">' +
                                '<p><b>Rating</b>: ' + NearbyPopoverPage_1.displayRating(results[i].rating) + '</p>' +
                                '<p><b>Price level</b>: ' + NearbyPopoverPage_1.displayPrice(results[i].price_level) + '</p>' +
                                '</div>' +
                                '</div>';
                        }
                        else {
                            content = '<div id="content">' +
                                '<div id="siteNotice"></div>' +
                                '<h4 id="firstHeading" class="firstHeading">' + NearbyPopoverPage_1.displayOpen(results[i].opening_hours.open_now) + ' ' + name_3 + '</h4>' +
                                '<div id="bodyContent">' +
                                '<p><b>Rating</b>: ' + NearbyPopoverPage_1.displayRating(results[i].rating) + '</p>' +
                                '</div>' +
                                '</div>';
                        }
                    }
                    else if (what === 'bus_station' || what === 'parking') {
                        content = '<div id="content">' +
                            '<div id="siteNotice"></div>' +
                            '<h4 id="firstHeading" class="firstHeading">' + name_3 + '</h4>' +
                            '</div>';
                    }
                    infoWindows.push(new google.maps.InfoWindow({
                        content: content,
                        maxWidth: 250
                    }));
                    markers[i].addListener('click', function () {
                        NearbyPopoverPage_1.closeInfoWindows();
                        infoWindows[i].open(this.map, markers[i]);
                    });
                };
                for (var i = 0; i < NearbyPopoverPage_1.min(results.length, 5); i++) {
                    _loop_6(i);
                }
                _this.viewCtrl.dismiss();
                NearbyPopoverPage_1.setMapOnAll(_this.map);
                _this.map.fitBounds(bounds);
            });
        });
        loading.dismiss();
    };
    NearbyPopoverPage.displayOpen = function (data) {
        var res = "";
        if (data === true) {
            res = '<img src= "../../assets/icon/open.png" style="vertical-align: middle"/>';
        }
        else {
            res = '<img src= "../../assets/icon/close.png" style="vertical-align: middle"/>';
        }
        return res;
    };
    NearbyPopoverPage.displayRating = function (data) {
        var res = "";
        while (data >= 1) {
            res += '<img src="../../assets/icon/star.png" style="vertical-align: middle"/>';
            data--;
        }
        if (data > 0) {
            res += '<img src="../../assets/icon/half-star.png" style="vertical-align: middle"/>';
        }
        return res;
    };
    NearbyPopoverPage.displayPrice = function (data) {
        var res = "";
        while (data >= 1) {
            res += '<img src="../../assets/icon/dollar.png" style="vertical-align: middle"/>';
            data--;
        }
        return res;
    };
    NearbyPopoverPage.min = function (a, b) {
        return a < b ? a : b;
    };
    NearbyPopoverPage.setMapOnAll = function (map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    };
    NearbyPopoverPage.closeInfoWindows = function () {
        for (var i = 0; i < infoWindows.length; i++) {
            infoWindows[i].close();
        }
    };
    NearbyPopoverPage.prototype.dismiss = function (data) {
        console.log(data);
        this.viewCtrl.dismiss({ pos: data });
    };
    return NearbyPopoverPage;
}());
NearbyPopoverPage = NearbyPopoverPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-nearby',
        template: "\n    <div style=\"text-align: center;\"><h5><b>Find Near Me</b></h5></div>\n    <hr/>\n    <ion-list style=\"display: inline !important;\">\n      <button ion-item (click)=\"displayNearbyMcMaster('washrooms')\">\n          <img src=\"../../assets/icon/toilets.png\" width=\"40px\" item-start/>\n          <ion-label>Washrooms</ion-label>       \n      </button>\n      <button ion-item (click)=\"displayNearbyMaps('cafe')\">\n        <img src=\"../../assets/icon/coffee-cup.png\" width=\"40px\" item-start/>\n        <ion-label>Coffee Shops</ion-label>\n      </button>\n      <button ion-item (click)=\"displayNearbyMaps('restaurant')\">\n        <img src=\"../../assets/icon/restaurant.png\" width=\"40px\" item-start/>\n        <ion-label>Restaurants</ion-label>\n      </button>\n      <button ion-item (click)=\"displayNearbyMaps('library')\">\n        <img src=\"../../assets/icon/library.png\" width=\"40px\" item-start/>\n        <ion-label>Libraries</ion-label>\n      </button>\n      <button ion-item (click)=\"displayNearbyMaps('bus_station')\">\n        <img src=\"../../assets/icon/bus-stop.png\" width=\"40px\" item-start/>\n        <ion-label>Bus stops</ion-label>\n      </button>\n      <button ion-item (click)=\"displayNearbyMaps('parking')\">\n        <img src=\"../../assets/icon/parking.png\" width=\"40px\" item-start/>\n        <ion-label>Parking lots</ion-label>\n      </button>\n      <button ion-item (click)=\"displayNearbyMaps('convenience_store')\">\n        <img src=\"../../assets/icon/convenience-store.png\" width=\"40px\" item-start/>\n        <ion-label>Convenience stores</ion-label>\n      </button>\n      <button ion-item (click)=\"displayNearbyMcMaster('labs')\">\n        <img src=\"../../assets/icon/computer-lab.png\" width=\"40px\" item-start/>\n        <ion-label>Computer labs</ion-label>\n      </button>\n    </ion-list>\n  ",
        providers: [__WEBPACK_IMPORTED_MODULE_8__providers_map_service_map_service__["a" /* MapServiceProvider */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_8__providers_map_service_map_service__["a" /* MapServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_7__providers_user_service_user_service__["a" /* UserServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
], NearbyPopoverPage);

var MapPage_1, NearbyPopoverPage_1;
//# sourceMappingURL=map.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectivityServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectivityServiceProvider = (function () {
    function ConnectivityServiceProvider(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('cordova');
    }
    ConnectivityServiceProvider.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type !== "none";
        }
        else {
            return navigator.onLine;
        }
    };
    ConnectivityServiceProvider.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type === "none";
        }
        else {
            return !navigator.onLine;
        }
    };
    return ConnectivityServiceProvider;
}());
ConnectivityServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
], ConnectivityServiceProvider);

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SettingsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(navCtrl, userService, navParams, popoverCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.sessionID = navParams.get("sessionId");
        this.retrieveSettings();
    }
    SettingsPage.prototype.retrieveSettings = function () {
        var _this = this;
        this.userService.getUser(this.sessionID)
            .subscribe(function (user) {
            _this.accessibility = user.accessibility;
            _this.distanceUnit = user.distanceUnit;
            _this.avatar = user.avatar;
            _this.firstname = user.firstname;
            _this.lastname = user.lastname;
            _this.email = user.email;
        });
    };
    SettingsPage.prototype.showPopover = function (ev) {
        var popover = this.popoverCtrl.create(HelpPage);
        popover.present({
            ev: ev
        });
    };
    SettingsPage.prototype.updateAccessibility = function () {
        var _this = this;
        this.accessibility = this.accessValue ? 'true' : 'false';
        this.userService.getUser(this.sessionID)
            .subscribe(function (user) {
            _this.userService.updateUser(_this.sessionID, {
                rev: user._rev,
                email: user.email,
                password: user.password,
                avatar: user.avatar,
                firstname: user.firstname,
                lastname: user.lastname,
                distanceUnit: user.distanceUnit,
                accessibility: _this.accessValue ? 'true' : 'false',
                posLat: user.posLat,
                posLng: user.posLng
            });
        });
    };
    SettingsPage.prototype.updateDistanceUnit = function () {
        var _this = this;
        this.userService.getUser(this.sessionID)
            .subscribe(function (user) {
            _this.userService.updateUser(_this.sessionID, {
                rev: user._rev,
                email: user.email,
                password: user.password,
                avatar: user.avatar,
                firstname: user.firstname,
                lastname: user.lastname,
                distanceUnit: _this.distanceUnit,
                accessibility: user.accessibility,
                posLat: user.posLat,
                posLng: user.posLng
            });
        });
    };
    SettingsPage.prototype.clickNames = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Change firstname/lastname',
            message: "Enter your firstname and your lastname:",
            inputs: [
                {
                    name: 'firstname',
                    placeholder: 'Firstname'
                },
                {
                    name: 'lastname',
                    placeholder: 'Lastname'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Proceed',
                    handler: function (data) {
                        if (data.firstname !== '' && data.lastname !== '') {
                            _this.userService.getUser(_this.sessionID)
                                .subscribe(function (user) {
                                _this.userService.updateUser(_this.sessionID, {
                                    rev: user._rev,
                                    email: user.email,
                                    password: user.password,
                                    avatar: user.avatar,
                                    firstname: data.firstname,
                                    lastname: data.lastname,
                                    distanceUnit: user.distanceUnit,
                                    accessibility: user.accessibility,
                                    posLat: user.posLat,
                                    posLng: user.posLng
                                });
                                _this.retrieveSettings();
                            });
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    SettingsPage.prototype.clickPassword = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Change password',
            message: "Enter your current password:",
            inputs: [
                {
                    name: 'currentPassword',
                    type: 'password',
                    placeholder: 'Password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Continue',
                    handler: function (data) {
                        _this.changePassword(data.currentPassword);
                    }
                }
            ]
        });
        prompt.present();
    };
    SettingsPage.prototype.changePassword = function (currentPassword) {
        var _this = this;
        this.userService.getUser(this.sessionID)
            .subscribe(function (user) {
            if (user.password === currentPassword) {
                var prompt_1 = _this.alertCtrl.create({
                    title: 'Change password',
                    message: "Enter a new password:",
                    inputs: [
                        {
                            name: 'newPassword',
                            type: 'password',
                            placeholder: 'Password'
                        },
                        {
                            name: 'confirmPassword',
                            type: 'password',
                            placeholder: 'Confirm password'
                        }
                    ],
                    buttons: [
                        {
                            text: 'Cancel',
                            handler: function (data) { }
                        },
                        {
                            text: 'Proceed',
                            handler: function (data) {
                                if (data.newPassword === data.confirmPassword) {
                                    _this.userService.updateUser(_this.sessionID, {
                                        rev: user._rev,
                                        email: user.email,
                                        password: data.newPassword,
                                        avatar: user.avatar,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        distanceUnit: user.distanceUnit,
                                        accessibility: user.accessibility,
                                        posLat: user.posLat,
                                        posLng: user.posLng
                                    });
                                }
                                else {
                                    var error = _this.alertCtrl.create({
                                        title: 'Unmatching passwords',
                                        message: 'The confirmation password must be equal to the new password.',
                                        buttons: [
                                            {
                                                text: 'Ok',
                                                handler: function (data) { }
                                            }
                                        ]
                                    });
                                    error.present();
                                }
                            }
                        }
                    ]
                });
                prompt_1.present();
            }
            else {
                var errorpass = _this.alertCtrl.create({
                    title: 'Wrong passord',
                    message: 'You entered a wrong password.',
                    buttons: [
                        {
                            text: 'Ok',
                            handler: function (data) { }
                        }
                    ]
                });
                errorpass.present();
            }
        });
    };
    SettingsPage.prototype.changePicture = function () {
        console.log("change picture");
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"/root/Downloads/MaraudersMap/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Settings\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n    <ion-list-header>\n      General Settings\n    </ion-list-header>\n\n    <ion-item>\n      <ion-label>\n        Accessibility <br/> Entrances\n        <button round ion-button icon-only style="background-color: white; margin: -35px 0 10px 15px" (click)="showPopover($event)">\n          <ion-icon name="information-circle" style="color: blue"></ion-icon>\n        </button>\n      </ion-label>\n      <ion-toggle Enabled checked="{{accessibility}}" [(ngModel)]="accessValue" (ionChange)="updateAccessibility()"></ion-toggle>\n    </ion-item>\n\n    <div padding>\n      <ion-label> Distance Units</ion-label>\n      <ion-segment [(ngModel)]="distanceUnit" (ionChange)="updateDistanceUnit()">\n        <ion-segment-button value="km" selected>km</ion-segment-button>\n        <ion-segment-button value="mile">miles</ion-segment-button>\n      </ion-segment>\n    </div>\n  </ion-list>\n\n\n  <ion-list inset>\n    <ion-list-header> Profile Settings </ion-list-header>\n    <button ion-item (click)="clickPassword()">Password</button>\n    <button ion-item (click)="clickNames()">Firstname/Lastname</button>\n    <button ion-item (click)="changePicture()">Picture</button>\n  </ion-list>\n\n  <ion-list>\n    <ion-item>\n      <ion-thumbnail item-start>\n        <img *ngIf="avatar !== undefined" src="../../assets/avatars/{{avatar}}.png">\n        <img *ngIf="avatar === undefined" src="../../assets/avatars/pending.png">\n      </ion-thumbnail>\n      <h2>{{firstname}} {{lastname}}</h2>\n      <p>{{email}}</p>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/root/Downloads/MaraudersMap/src/pages/settings/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], SettingsPage);

var HelpPage = (function () {
    function HelpPage(navParams) {
        this.navParams = navParams;
    }
    return HelpPage;
}());
HelpPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: "\n    <p padding>Turn on to show the buildings' accessibility entrances.</p>\n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], HelpPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_relationship_service_relationship_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var FriendsPage = (function () {
    function FriendsPage(navCtrl, alertCtrl, relationshipService, userService, navParams) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.relationshipService = relationshipService;
        this.userService = userService;
        this.navParams = navParams;
        this.friends = [];
        this.sessionID = navParams.get("sessionId");
        this.numberNotifications = 0;
        this.retrieveRelationships();
    }
    FriendsPage.prototype.retrieveRelationships = function () {
        var _this = this;
        this.friends = [];
        this.relationshipService.getRelationships()
            .subscribe(function (relationships) {
            var _loop_1 = function (i) {
                if (relationships[i].userA === _this.sessionID) {
                    _this.userService.getUser(relationships[i].userB)
                        .subscribe(function (friend) {
                        var rel = {
                            id_rel: relationships[i]._id,
                            id_friend: relationships[i].userB,
                            avatar: friend.avatar,
                            email: friend.email,
                            firstname: friend.firstname,
                            lastname: friend.lastname,
                            status: relationships[i].status
                        };
                        if (rel.status === 'received') {
                            _this.numberNotifications++;
                        }
                        _this.friends.push(rel);
                    });
                }
            };
            for (var i = 0; i < relationships.length; i++) {
                _loop_1(i);
            }
        });
    };
    FriendsPage.prototype.onInput = function (ev) {
        var _this = this;
        // Set val to the value of the searchbar
        var val = ev.target.value;
        this.friends = [];
        this.relationshipService.getRelationships()
            .subscribe(function (relationships) {
            var _loop_2 = function (i) {
                if (relationships[i].userA === _this.sessionID) {
                    _this.userService.getUser(relationships[i].userB)
                        .subscribe(function (friend) {
                        if (friend.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                            friend.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                            friend.email.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                            var rel = {
                                id_rel: relationships[i]._id,
                                id_friend: relationships[i].userB,
                                avatar: friend.avatar,
                                email: friend.email,
                                firstname: friend.firstname,
                                lastname: friend.lastname,
                                status: relationships[i].status
                            };
                            _this.friends.push(rel);
                        }
                    });
                }
            };
            for (var i = 0; i < relationships.length; i++) {
                _loop_2(i);
            }
        });
    };
    FriendsPage.prototype.doRefresh = function (refresher) {
        this.retrieveRelationships();
        refresher.complete();
    };
    FriendsPage.prototype.deleteFriend = function (friend) {
        var _this = this;
        console.log(friend);
        this.relationshipService.getRelationships()
            .subscribe(function (relationships) { return __awaiter(_this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < relationships.length)) return [3 /*break*/, 6];
                        if (!(relationships[i].userA === this.sessionID && relationships[i].userB === friend.id_friend)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.relationshipService.updateRelationship(relationships[i]._id, { rev: relationships[i]._rev })];
                    case 2:
                        _a.sent();
                        if (friend.status === 'received') {
                            this.numberNotifications--;
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(relationships[i].userB === this.sessionID && relationships[i].userA === friend.id_friend)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.relationshipService.updateRelationship(relationships[i]._id, { rev: relationships[i]._rev })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    FriendsPage.prototype.acceptFriendRequest = function (friend) {
        var _this = this;
        this.relationshipService.getRelationships()
            .subscribe(function (relationships) {
            for (var i = 0; i < relationships.length; i++) {
                if (relationships[i].userA === _this.sessionID && relationships[i].userB === friend.id_friend && relationships[i].status === 'received') {
                    _this.relationshipService.updateRelationship(relationships[i]._id, {
                        rev: relationships[i]._rev,
                        userA: _this.sessionID,
                        userB: friend.id_friend,
                        status: 'accepted'
                    });
                }
                else if (relationships[i].userB === _this.sessionID && relationships[i].userA === friend.id_friend && relationships[i].status === 'pending') {
                    _this.relationshipService.updateRelationship(relationships[i]._id, {
                        rev: relationships[i]._rev,
                        userA: friend.id_friend,
                        userB: _this.sessionID,
                        status: 'accepted'
                    });
                }
            }
        });
        this.numberNotifications--;
    };
    FriendsPage.prototype.promptAddFriend = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Add a new friend',
            message: "Enter your friend's email to send him/her a request.",
            inputs: [
                {
                    name: 'friendEmail',
                    placeholder: 'McMaster email'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        _this.addFriend(data.friendEmail);
                    }
                }
            ]
        });
        prompt.present();
    };
    FriendsPage.prototype.promptConfirmSent = function () {
        var prompt = this.alertCtrl.create({
            title: 'Request Sent Successfully!',
            message: 'Friend request should appear in list of added friends.',
            buttons: [
                {
                    text: 'Great!'
                }
            ]
        });
        prompt.present();
    };
    FriendsPage.prototype.addFriend = function (email) {
        var _this = this;
        // Check if the person is registered and if no relationship exist between them
        this.userService.getUsers()
            .subscribe(function (users) {
            for (var i = 0; i < users.length; i++) {
                if (email === users[i].email) {
                    // Email registered ==> check for some existing relationships
                    for (var i_1 = 0; i_1 < _this.friends.length; i_1++) {
                        if (_this.friends[i_1].email === email) {
                            // ERROR relationship exist
                            console.log("ERROR relationship exists");
                            _this.alertRelationshipExists(email);
                            return;
                        }
                    }
                    // OK
                    // Create a A -> B pending AND a B -> A received
                    var pending = {
                        userA: _this.sessionID,
                        userB: users[i]._id,
                        status: 'pending'
                    };
                    var received = {
                        userA: users[i]._id,
                        userB: _this.sessionID,
                        status: 'received'
                    };
                    _this.relationshipService.createRelationship(pending);
                    _this.relationshipService.createRelationship(received);
                    _this.retrieveRelationships();
                    _this.promptConfirmSent();
                    return;
                }
            }
            // ERROR if no match ==> person not registered
            _this.alertNoMatch(email);
            return;
        });
    };
    FriendsPage.prototype.alertRelationshipExists = function (email) {
        var alert = this.alertCtrl.create({
            title: 'Already connected!',
            subTitle: 'You and ' + email + ' are already connected... don\'t push it!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        alert.present();
    };
    FriendsPage.prototype.alertNoMatch = function (email) {
        var alert = this.alertCtrl.create({
            title: 'No match',
            subTitle: email + ' is not yet registered :(',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        alert.present();
    };
    return FriendsPage;
}());
FriendsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-friends',template:/*ion-inline-start:"/root/Downloads/MaraudersMap/src/pages/friends/friends.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      My Friends\n      <ion-badge color="danger" *ngIf="numberNotifications > 0">{{ numberNotifications }}</ion-badge>\n    </ion-title>\n    <ion-buttons end><button ion-button round icon-only color="primary" (click)="promptAddFriend()">Add <ion-icon name="person-add"></ion-icon></button></ion-buttons>\n  </ion-navbar>\n  <ion-searchbar type="search" animated="true"\n                 placeholder="Search"\n                 [(ngModel)]="userInput"\n                 [showCancelButton]="shouldShowCancel"\n                 (ionInput)="onInput($event)">\n  </ion-searchbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content\n      pullingIcon="arrow-dropdown"\n      pullingText="Cast a spell to find new friends"\n      refreshingSpinner="dots"\n      refreshingText="Letting the magic happen">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list *ngIf="friends.length > 0">\n    <ion-item-sliding *ngFor="let friend of friends">\n      <ion-item>\n        <ion-avatar item-start *ngIf="friend.status !== \'pending\'">\n          <img src="../../assets/avatars/{{friend.avatar}}.png">\n        </ion-avatar>\n        <ion-avatar item-start *ngIf="friend.status === \'pending\'">\n          <img src="../../assets/avatars/pending.png">\n        </ion-avatar>\n\n        <h2 *ngIf="friend.status !== \'pending\'">{{friend.firstname}} {{friend.lastname}}</h2>\n        <h3 *ngIf="friend.status === \'pending\'">{{friend.email}}</h3>\n\n        <button *ngIf="friend.status === \'received\'" item-end ion-button color="secondary" (click)="acceptFriendRequest(friend)">Accept</button>\n        <ion-note *ngIf="friend.status === \'pending\'" item-end>Invitation sent</ion-note>\n        <ion-icon *ngIf="friend.status === \'accepted\'" item-end name="pin"></ion-icon>\n        <ion-note *ngIf="friend.status === \'accepted\'" item-end style="margin: 20px 8px 0px 0px">2.3km</ion-note>\n      </ion-item>\n      <ion-item-options>\n        <button ion-button color="danger" icon-start (click)="deleteFriend(friend)">\n          <ion-icon name="trash"></ion-icon>\n          Delete\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <div *ngIf="friends.length == 0" padding>\n    <p>There is nothing to display here...</p>\n    <img src="../../assets/loader/harry_snitch.gif"/>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/root/Downloads/MaraudersMap/src/pages/friends/friends.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_relationship_service_relationship_service__["a" /* RelationshipServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], FriendsPage);

//# sourceMappingURL=friends.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapServiceProvider = (function () {
    function MapServiceProvider(http) {
        this.http = http;
        //private localUrl = 'mongodb://root:root2017@ds129066.mlab.com:29066/marauders-map';  // URL to web api
        this.localUrl = 'http://localhost:3000'; // URL to web api
    }
    /*
    {
      address: string || location: LatLng || placeId: string
    }
    */
    MapServiceProvider.prototype.geocode = function (data) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "address=" + data.address;
        return this.http.post(this.localUrl + '/geocode', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("Geocode"); });
    };
    MapServiceProvider.prototype.reverse_geocode = function (data) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "location=" + data.location;
        return this.http.post(this.localUrl + '/geocode/reverse', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("Reverse geocode"); });
    };
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
    MapServiceProvider.prototype.directions = function (data) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "origin=" + data.origin +
            "&destination=" + data.destination +
            "&travelMode=" + data.travelMode +
            "&transitOptions=" + data.transitOptions +
            "&unitSystem=" + data.unitSystem +
            "&waypoints=" + data.waypoints +
            "&optimizeWaypoints=" + data.optimizeWaypoints +
            "&provideRouteAlternative=" + data.provideRouteAlternative;
        return this.http.post(this.localUrl + '/directions', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("Directions"); });
    };
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
    MapServiceProvider.prototype.places_search = function (data) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "query=" + data.query +
            "&location=" + data.location +
            "&radius=" + data.radius +
            "&minprice=" + data.minprice +
            "&maxprice=" + data.maxprice +
            "&opennow=" + data.opennow +
            "&type=" + data.type;
        return this.http.post(this.localUrl + '/places/search', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("Search place"); });
    };
    /*
    {
      lccation: LatLng,
      rankby: prominence | distance,
      type: https://developers.google.com/places/web-service/supported_types
    }
    */
    MapServiceProvider.prototype.places_nearby = function (data) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "location=" + data.location +
            "&rankby=" + data.rankby +
            "&type=" + data.type;
        return this.http.post(this.localUrl + '/places/nearby', body, options)
            .map(function (res) { return res.json().json.results; });
    };
    /*
    {
      placeid: String
    }
    */
    MapServiceProvider.prototype.places_details = function (data) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "placeid=" + data.placeid;
        return this.http.post(this.localUrl + '/places/details', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("Places details"); });
    };
    /*
    {
      photoreference: String,
      maxheight: Int,
      maxwidth: Int
    }
    */
    MapServiceProvider.prototype.places_photos = function (data) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "photoreference=" + data.photoreference +
            "&maxheight=" + data.maxheight +
            "&maxwidth=" + data.maxwidth;
        return this.http.post(this.localUrl + '/places/photos', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("Places photos"); });
    };
    /*
    https://google-developers.appspot.com/maps/documentation/javascript/places-autocomplete
    */
    MapServiceProvider.prototype.places_predictions = function (data) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "";
        return this.http.post(this.localUrl + '/places/predictions', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("Places predictions"); });
    };
    return MapServiceProvider;
}());
MapServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], MapServiceProvider);

//# sourceMappingURL=map-service.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators_matchPasswordsValidator__ = __webpack_require__(279);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { User } from "../../models/user";
var SignUpPage = (function () {
    function SignUpPage(navCtrl, formBuilder, alertCtrl, userService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.submitAttempt = false;
        this.email = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("^[_a-z0-9-]+(.[a-z0-9-]+)@mcmaster\\.ca$")
        ]);
        this.password = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("^[a-zA-Z]\\w{3,14}$")
        ]);
        this.conf_password = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("^[a-zA-Z]\\w{3,14}$"),
            Object(__WEBPACK_IMPORTED_MODULE_5__validators_matchPasswordsValidator__["a" /* matchPasswordsValidator */])('password')
        ]);
        this.signup = this.formBuilder.group({
            email: this.email,
            password: this.password,
            conf_password: this.conf_password
        });
    }
    SignUpPage.prototype.process_signup = function () {
        this.submitAttempt = true;
        if (this.signup.valid) {
            var email = this.signup.value.email;
            var password = this.signup.value.password;
            this.checkCredentials(email, password);
        }
    };
    SignUpPage.prototype.presentAlert = function (email) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Bad credentials',
            subTitle: 'This McMaster email is already used. Please login to access the app!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: 'Login',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */], { email: email });
                    }
                }
            ]
        });
        alert.present();
    };
    SignUpPage.prototype.checkCredentials = function (email, password) {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) {
            for (var i = 0; i < users.length; i++) {
                if (email === users[i].email) {
                    _this.presentAlert(email);
                    return;
                }
            }
            var user = {
                email: email,
                password: password
            };
            _this.userService.createUser(user);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */], { email: email });
            return;
        });
    };
    SignUpPage.prototype.goLogin = function () {
        this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    return SignUpPage;
}());
SignUpPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"/root/Downloads/MaraudersMap/src/pages/signup/signup.html"*/'<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <div text-center>\n          <img width="280" heigh="280" src="../assets/imgs/logo.png" />\n        </div>\n      </ion-col>\n    </ion-row>\n\n    <form [formGroup]="signup" (ngSubmit)="process_signup()">\n\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-input type="text" placeholder="McMaster email" formControlName="email" clearInput\n                       [class.invalid]="!signup.controls.email.valid && (signup.controls.email.dirty || submitAttempt)">\n            </ion-input>\n          </ion-item>\n          <ion-item *ngIf="!signup.controls.email.valid && (signup.controls.email.dirty || submitAttempt)">\n            <p>Please enter a valid McMaster email!</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-input type="password" placeholder="Password" formControlName="password" clearInput\n                       [class.invalid]="!signup.controls.password.valid && (signup.controls.password.dirty || submitAttempt)">\n            </ion-input>\n          </ion-item>\n          <ion-item *ngIf="!signup.controls.password.valid && (signup.controls.password.dirty || submitAttempt)">\n            <p>Please enter a valid password!</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-input type="password" placeholder="Confirm Password" formControlName="conf_password" clearInput\n                       [class.invalid]="!signup.controls.conf_password.valid && (signup.controls.conf_password.dirty || submitAttempt)">\n            </ion-input>\n          </ion-item>\n          <ion-item *ngIf="!signup.controls.conf_password.valid && signup.controls.conf_password.errors.matchPasswords && (signup.controls.conf_password.dirty || submitAttempt)">\n            <p>Please re-enter the same password!</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col text-center>\n          <button type="submit" ion-button round full large\n                  color="signup" style="color: #333333"\n                  [disabled]="!signup.valid">\n            Register &nbsp;&nbsp; <ion-icon name="arrow-dropright-circle"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n\n    <ion-row>\n      <ion-col text-center>\n        <p>\n          Already registered?<br><br>\n          <button ion-button round outline (click)="goLogin()">Login</button>\n        </p>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/root/Downloads/MaraudersMap/src/pages/signup/signup.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */]])
], SignUpPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(226);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_map_map__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_friends_friends__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_user_service_user_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_connectivity_service_connectivity_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__refreshers_friendRefresher__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_relationship_service_relationship_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_map_service_map_service__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MaraudersMap */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignUpPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_friends_friends__["a" /* FriendsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["b" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_17__refreshers_friendRefresher__["a" /* FriendRefresher */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* HelpPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_map_map__["b" /* NearbyPopoverPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MaraudersMap */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_12__angular_http__["c" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MaraudersMap */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignUpPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_friends_friends__["a" /* FriendsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["b" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_17__refreshers_friendRefresher__["a" /* FriendRefresher */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* HelpPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_map_map__["b" /* NearbyPopoverPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_13__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_connectivity_service_connectivity_service__["a" /* ConnectivityServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_18__providers_relationship_service_relationship_service__["a" /* RelationshipServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_19__providers_map_service_map_service__["a" /* MapServiceProvider */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaraudersMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MaraudersMap = (function () {
    function MaraudersMap(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MaraudersMap;
}());
MaraudersMap = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/root/Downloads/MaraudersMap/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/root/Downloads/MaraudersMap/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MaraudersMap);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = matchPasswordsValidator;
function matchPasswordsValidator(otherControlName) {
    var thisControl;
    var otherControl;
    return function matchPasswordsValidate(control) {
        if (!control.parent) {
            return null;
        }
        // Initializing the validator.
        if (!thisControl) {
            thisControl = control;
            otherControl = control.parent.get(otherControlName);
            if (!otherControl) {
                throw new Error('matchOtherValidator(): other control is not found in parent group');
            }
            otherControl.valueChanges.subscribe(function () {
                thisControl.updateValueAndValidity();
            });
        }
        if (!otherControl) {
            return null;
        }
        if (otherControl.value !== thisControl.value) {
            return {
                matchPasswords: true
            };
        }
        return null;
    };
}
//# sourceMappingURL=matchPasswordsValidator.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/root/Downloads/MaraudersMap/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Marauder\'s Map\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  The world is your oyster.\n  <p>\n    If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.\n  </p>\n</ion-content>\n'/*ion-inline-end:"/root/Downloads/MaraudersMap/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendRefresher; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FriendRefresher = (function () {
    function FriendRefresher(r, _config) {
        this.r = r;
        this._config = _config;
    }
    /**
     * @hidden
     */
    FriendRefresher.prototype.ngOnInit = function () {
        if (!this.pullingIcon) {
            this.pullingIcon = this._config.get('ionPullIcon', 'arrow-down');
        }
        if (!this.refreshingSpinner) {
            this.refreshingSpinner = this._config.get('ionRefreshingSpinner', this._config.get('spinner', 'ios'));
        }
    };
    return FriendRefresher;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], FriendRefresher.prototype, "pullingIcon", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], FriendRefresher.prototype, "pullingText", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], FriendRefresher.prototype, "refreshingSpinner", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], FriendRefresher.prototype, "refreshingText", void 0);
FriendRefresher = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'friend-refresher',
        template: '<div class="refresher-pulling">' +
            '<div class="refresher-pulling-icon" *ngIf="pullingIcon">' +
            '<ion-icon [name]="pullingIcon"></ion-icon>' +
            '</div>' +
            '<div class="refresher-pulling-text" [innerHTML]="pullingText" *ngIf="pullingText"></div>' +
            '</div>' +
            '<div class="refresher-refreshing">' +
            '<div class="refresher-refreshing-icon">' +
            // '<ion-img src="../assets/loader/harry_snitch.gif"></ion-img>' +
            '</div>' +
            '<div class="refresher-refreshing-text" [innerHTML]="refreshingText" *ngIf="refreshingText"></div>' +
            '</div>',
        host: {
            '[attr.state]': 'r.state'
        },
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewEncapsulation */].None,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Refresher */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Config */]])
], FriendRefresher);

//# sourceMappingURL=friendRefresher.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserServiceProvider = (function () {
    function UserServiceProvider(http) {
        this.http = http;
        //private userUrl = 'mongodb://root:root2017@ds129066.mlab.com:29066/marauders-map/users';  // URL to web api
        this.userUrl = 'http://localhost:3000/users'; // URL to web api
    }
    UserServiceProvider.prototype.getUsers = function () {
        return this.http.get(this.userUrl)
            .map(function (res) {
            return res.json();
        });
    };
    ;
    UserServiceProvider.prototype.createUser = function (user) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "email=" + user.email + "&password=" + user.password + "&" +
            "avatar=pending&" +
            "firstname=Firstname&lastname=Lastname&" +
            "distanceUnit=km&accessibility=false&" +
            "posLat=0&posLng=0";
        return this.http.post(this.userUrl, body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("New user registered"); });
    };
    UserServiceProvider.prototype.getUser = function (id) {
        return this.http.get(this.userUrl + '/' + id)
            .map(function (response) {
            return response.json();
        });
    };
    UserServiceProvider.prototype.updateUser = function (id, new_user) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var body = "_id=" + id + "&_rev=" + new_user.rev + "&" +
            "email=" + new_user.email + "&password=" + new_user.password + "&" +
            "avatar=" + new_user.avatar + "&" +
            "firstname=" + new_user.firstname + "&lastname=" + new_user.lastname + "&" +
            "distanceUnit=" + new_user.distanceUnit + "&accessibility=" + new_user.accessibility + "&" +
            "posLat=" + new_user.posLat + "&posLng=" + new_user.posLng;
        return this.http.post(this.userUrl + '/' + id, body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log("User updated"); });
    };
    return UserServiceProvider;
}());
UserServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], UserServiceProvider);

//# sourceMappingURL=user-service.js.map

/***/ })

},[208]);
//# sourceMappingURL=main.js.map