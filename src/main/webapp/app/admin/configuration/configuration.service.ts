import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Route } from '../../shared';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class JhiConfigurationService {

    constructor(private http: Http) {
    }

    getConfigs(prefix: String = ''): Observable<any> {
        return this.http.get(SERVER_API_URL + 'management/configprops').map((res: Response) => {
            const properties: any[] = [];

            const propertiesObject = res.json();

            for (const key in propertiesObject) {
                if (propertiesObject.hasOwnProperty(key)) {
                    properties.push(propertiesObject[key]);
                }
            }

            return properties.sort((propertyA, propertyB) => {
                return (propertyA.prefix === propertyB.prefix) ? 0 :
                    (propertyA.prefix < propertyB.prefix) ? -1 : 1;
            });
        });
    }

    getInstanceConfigs(instance: Route): Observable<any> {
        if (instance && instance.prefix && instance.prefix.length > 0) {
            return this.getConfigs(instance.prefix + '/');
        }
        return this.getConfigs();
    }

    getEnv(prefix: String = ''): Observable<any> {
        return this.http.get(SERVER_API_URL + 'management/env').map((res: Response) => {
            const properties: any = {};

            const propertiesObject = res.json();

            for (const key in propertiesObject) {
                if (propertiesObject.hasOwnProperty(key)) {
                    const valsObject = propertiesObject[key];
                    const vals: any[] = [];

                    for (const valKey in valsObject) {
                        if (valsObject.hasOwnProperty(valKey)) {
                            vals.push({key: valKey, val: valsObject[valKey]});
                        }
                    }
                    properties[key] = vals;
                }
            }

            return properties;
        });
    }

    getInstanceEnv(instance: Route): Observable<any> {
        if (instance && instance.prefix && instance.prefix.length > 0) {
            return this.getEnv(instance.prefix + '/');
        }
        return this.getEnv();
    }
}
