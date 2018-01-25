import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { SERVER_API_URL } from '../../app.constants';
import { ProfileInfo } from './profile-info.model';

@Injectable()
export class ProfileService {

    private profileInfoUrl = SERVER_API_URL + 'api/profile-info';
    private profileInfo: Promise<ProfileInfo>;

    constructor(private http: Http) { }

    getProfileInfo(): Promise<ProfileInfo> {
        if (!this.profileInfo) {
            this.profileInfo = this.http.get(this.profileInfoUrl)
                .map((res: Response) => {
                    const data = res.json();
                    const pi = new ProfileInfo();
                    pi.activeProfiles = data.activeProfiles;
                    pi.ribbonEnv = data.ribbonEnv;
                    pi.nativeSearchLocation = data.nativeSearchLocation;
                    pi.gitSearchLocation = data.gitSearchLocation;
                    pi.inProduction = data.activeProfiles.indexOf('prod') !== -1;
                    pi.swaggerEnabled = data.activeProfiles.indexOf('swagger') !== -1;
                    console.log(pi);
                    return pi;
            }).toPromise();
        }
        return this.profileInfo;
    }
}
