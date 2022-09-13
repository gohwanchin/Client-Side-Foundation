import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom} from "rxjs";
import { Registration, Response } from "../models";

const URL = "https://afternoon-plateau-18438.herokuapp.com/api/registration"

@Injectable()
export class RegistrationService {
    constructor(private http: HttpClient) { }

    newRegistration(reg: Registration): Promise<Response> {
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        return firstValueFrom(
            this.http.post<Response>(URL, reg, { headers }))
    }
}