import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";
import { Relationship } from "../../models/relationship";
import "rxjs/add/operator/filter";

@Injectable()
export class RelationshipServiceProvider {

  //private relationshipUrl = 'mongodb://root:root2017@ds129066.mlab.com:29066/marauders-map/relationships';  // URL to web api
  private relationshipUrl = 'http://localhost:3000/relationships';  // URL to web api

  constructor(private http: Http) { }

  getRelationships() {
    return this.http.get(this.relationshipUrl)
      .map((response: Response) => {
        return response.json() as Relationship[];
      });
  };

  createRelationship(rel: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body = "userA="+rel.userA+"&userB="+rel.userB+"&status="+rel.status;

    return this.http.post(this.relationshipUrl, body, options)
      .map(res => res.json())
      .subscribe(data => console.log("New relationship registered"));
  }

  getRelationship(id: any) {
    return this.http.get(this.relationshipUrl+'/'+id)
      .map((response: Response) => {
        return response.json() as Relationship;
      });
  }

  updateRelationship(id: any, new_rel: any) {
    let options = new RequestOptions();
    options.headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

    let body = "_id="+id+"&_rev="+new_rel.rev+"&"+
      "userA="+new_rel.userA+"&"+
      "userB="+new_rel.userB+"&"+
      "status="+new_rel.status;

    return this.http.post(this.relationshipUrl+'/'+id, body, options)
      .map(res => res.json())
      .subscribe(data => console.log("Relationship updated"));
  }
}
