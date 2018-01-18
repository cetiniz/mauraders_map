import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "../../models/user";
import "rxjs/add/operator/toPromise";

@Injectable()
export class UserServiceProvider {

  //private userUrl = 'mongodb://root:root2017@ds129066.mlab.com:29066/marauders-map/users';  // URL to web api
  private userUrl = 'http://localhost:3000/users';  // URL to web api

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(this.userUrl)
      .map((res: Response) => {
        return res.json() as User[];
      });
  };

  createUser(user: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body = "email="+user.email+"&password="+user.password+"&"+
      "avatar=pending&"+
      "firstname=Firstname&lastname=Lastname&"+
      "distanceUnit=km&accessibility=false&"+
      "posLat=0&posLng=0";

    return this.http.post(this.userUrl, body, options)
      .map(res => res.json())
      .subscribe(data => console.log("New user registered"));
  }

  getUser(id: any) {
    return this.http.get(this.userUrl+'/'+id)
      .map((response: Response) => {
        return response.json() as User;
      });
  }

  updateUser(id: any, new_user: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body = "_id="+id+"&_rev="+new_user.rev+"&"+
      "email="+new_user.email+"&password="+new_user.password+"&"+
      "avatar="+new_user.avatar+"&"+
      "firstname="+new_user.firstname+"&lastname="+new_user.lastname+"&"+
      "distanceUnit="+new_user.distanceUnit+"&accessibility="+new_user.accessibility+"&"+
      "posLat="+new_user.posLat+"&posLng="+new_user.posLng;

    return this.http.post(this.userUrl+'/'+id, body, options)
      .map(res => res.json())
      .subscribe(data => console.log("User updated"));
  }
}
