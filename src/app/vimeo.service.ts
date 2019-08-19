import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VimeoConfig } from '../VimeoConfig';

@Injectable({
    providedIn: 'root'
})
export class VimeoService {

    constructor(private http: HttpClient) { }

    vimeoAuth() {
        // const clientID = VimeoConfig.clientID;
        // const secret = VimeoConfig.secret;
        // const headers = new HttpHeaders();
        // headers.set('Authorization', `basic ${clientID}:${secret}`);
        // headers.set('Content-Type', 'application/json');
        // headers.set('Accept', 'application/vnd.vimeo.*+json;version=3.4');
        // const body = {
        //     "grant_type": "client_credentials",
        //     "scope": "public"
        // }
        // this.http.post('https://api.vimeo.com/oauth/authorize/client', body, { headers }).subscribe(res => {
        //     console.log(`first res: `, res);
        //     const token = res['access_token'];
        //     const newHeaders = new HttpHeaders({
        //         Authorization: `bearer ${token}`
        //     })
        //     this.http.get('https://api.vimeo.com/me/videos', { headers }).subscribe(res => {
        //         console.log(res);
        //     })
        // },
        //     (err) => {
        //         console.log('Error received: ', err);
        //     }
        // )
        const token = '9ce9ab52dd575cfd97167a0f95885b9c'
        const headers = new HttpHeaders({
            Authorization: `bearer ${token}`
        });
        this.http.get('https://api.vimeo.com/me/videos', { headers }).subscribe(res => {
            // console.log(res);
        });
    }

    getVideo() {
        const token = VimeoConfig.token;
        const headers = new HttpHeaders({
            Authorization: `bearer ${token}`
        });
        return this.http.get('https://vimeo.com/api/oembed.json?url=https://vimeo.com/353694514', { headers });
    }
}
