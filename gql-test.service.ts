import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class GraphService {

  baseURL:any = 'https://jsonplaceholder.ir/graphql';
  httpHeaders = {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTQzMGQxNWFjZGFjYjQ4NThjMTIwZTEiLCJlbWFpbCI6Im5hc2lybm93MjBAZ21haWwuY29tIiwiaWF0IjoxNjM3NjgzMjcyfQ.yxO3LGVLdR_8coVErQxqgnU-M5la41fwXaKqKXL3vSA"
        }
    }
    
  constructor(private http: HttpClient) {}

  public query<T>(options: {
    query: string;
    variables?: { [key: string]: any };
  }): Observable<T> {
    return this.http
      .post<{ data: T }>(this.baseURL, {
        query: options.query,
        variables: options.variables,
      }, this.httpHeaders //--------- attach headers if need
      )
      .pipe(map((d) => d.data));
  }

  public mutate<T>(options: {
    mutation: string;
    variables?: { [key: string]: any };
  }): Observable<any> {
    return this.http
      .post<{ data: T }>(this.baseURL, {
        query: options.mutation,
        variables: options.variables,
      }, this.httpHeaders //--------- attach headers if need
      )
      .pipe(map((d) => d.data));
  }
}