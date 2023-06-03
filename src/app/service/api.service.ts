import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from './toastr.service';
import { PaginatedData } from '../utils/PaginatedData';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiEndPoint = environment.apiEndpoint;

    constructor(private http: HttpClient, private toastr: ToastrService) {
    }


    export(url: any, list : any) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });        
        const options = { headers: headers, responseType: 'text' as 'json' };
    
        return this.http.post<PaginatedData<any>>(`${this.apiEndPoint}${url}/export`, list, options)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    if (res.status == 'FAILURE') {
                        this.toastr.open('error', `Failure`, 'Something went wrong!');                        
                    }
                    return resData;
                }),
                catchError((error: any) => {
                    this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    return throwError(error)
                })
            )
    }

    getPage(url: any, pageNumber: number, pageSize: number, isPaged: boolean) {
        return this.http.get<PaginatedData<any>>(`${this.apiEndPoint}${url}/paginate?isPaged=${isPaged}&page=${pageNumber}&size=${pageSize}`)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    if (res.status == 'FAILURE') {
                        this.toastr.open('error', `Failure`, 'Something went wrong!');                        
                    }
                    return resData;
                }),
                catchError((error: any) => {
                    this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    return throwError(error)
                })
            )
    }

    objToSearchParams(obj: any): HttpParams {
        const param = new HttpParams();
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                param.set(key, obj[key]);
        }
        return param;
    }

    getSearchResult(url: any, object: any, isPaged: boolean, pageNumber : number, pageSize : number) {

        let attributeNameArray = Object.keys(object);
        // const param =  this.objToSearchParams(object);
        const param = new HttpParams();
        let queryParam: string = '?';
        for (let index = 0; index < attributeNameArray.length; index++) {
            param.set(attributeNameArray[index], object[attributeNameArray[index]]);
            let value: string = object[attributeNameArray[index]] != '' ? object[attributeNameArray[index]] : null;
            if (object[attributeNameArray[index]] != '') {
                queryParam = queryParam + attributeNameArray[index] + "=" + object[attributeNameArray[index]] + "&";
            }
        }
        queryParam = queryParam + `isPaged=${isPaged}&page=${pageNumber}&size=${pageSize}`;
        return this.http.get<any>(`${this.apiEndPoint}${url}/search` + queryParam, {
            params: param
        }).pipe(
            map((res: any) => {
                const resData: { error: any, data: any } = res;
                if (res.status == 'FAILURE') {
                    this.toastr.open('error', `Failure`, 'Something went wrong!');
                    return resData
                }
                return resData;
            }),
            catchError((error: any) => {
                this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                return throwError(error)
            })
        )
    }

    httpPost(url: any, reqData: any) {
        return this.http.post(`${this.apiEndPoint}${url}`, reqData)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    if (res.status == 'FAILURE') {
                        this.toastr.open('error', `Failure`, res.message);
                        // return throwError(res.status)
                    } else if (res.status == 'SUCCESS'){
                        this.toastr.open('success', `SUCCESS`, res.message);
                    }
                    return resData;
                }),
                catchError((error: any) => {
                    this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    return throwError(error)
                })
            )
    };

    httpPut(url: any, reqData: any) {
        return this.http.put(`${this.apiEndPoint}${url}`, reqData)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    if (res.status == 'FAILURE') {
                        this.toastr.open('error', `Failure`, res.message);
                        return resData;
                    } else if (res.status == 'SUCCESS'){
                        this.toastr.open('success', `SUCCESS`, res.message);
                    }
                    return resData;
                }),
                catchError((error: any) => {
                    this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    return throwError(error)
                })
            )
    };

    // Get Method
    httpGet(url: any) {
        return this.http.get(`${this.apiEndPoint}${url}`)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    return resData;
                }),
                catchError((error: any) => {
                    this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    return throwError(error)
                })
            )
    };

    httpPostFile(url: any, reqData: any) {
        return this.http.post(`${this.apiEndPoint}${url}`, reqData)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    return resData;
                }),
                catchError((error: any) => {
                    this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    return throwError(error)
                })
            )
    };
}
