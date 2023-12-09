import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Subject } from "rxjs";
import { Contact, Response } from "../models";

const URL = "https://secret-mesa-42107.herokuapp.com/api"

@Injectable()
export class ContactService{

    loadContacts = new Subject<Contact[]>()
    constructor(private http: HttpClient) {}

    addContact(contact: Contact): Promise<Response> {
        return firstValueFrom(
            this.http.post<Response>(URL + '/addContact', contact)
        )
    }

    deleteContact(email: string): Promise<Response> {
        // Manually creates JSON object for payload
        // It is NOT params/headers
        return firstValueFrom(
            this.http.post<Response>(URL + '/deleteContact', {'email': email})
        )
    }

    getContacts(): Promise<Contact[]>{
        return firstValueFrom(
            this.http.get<Response>(URL + '/getContacts')
            .pipe(
                map(result => {
                    const data = JSON.parse(result.data)
                    return data.map((v: any) => v as Contact)
                })
            ))
    }
}