import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

	public url: string = "https://localhost:5001";

	constructor(public http?: HttpClient) { }

	post(url: string, params: any): Observable<any> {

		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
			})
		};

		return this.http.post<any>(this.url + url, JSON.stringify(params), httpOptions);
	}

	get(url: string) {

		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			})
		};

		return this.http.get<any>(this.url + url, httpOptions);
	}
}
