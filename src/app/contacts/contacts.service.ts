import { Injectable, Inject, Optional } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { IContact, Contact } from './contact'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class ContactsService {

  private contactsUrl = 'api/contacts'

  constructor( private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) { 
      if (origin) this.contactsUrl = `${origin}${this.contactsUrl}`
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

  getContacts(): Observable<IContact[]> {
  	return this.http.get<IContact[]>(this.contactsUrl)
      .pipe(
        catchError(this.handleError('getContacts', []))
       )
  }

  getContactNo404<Data>(id: string): Observable<IContact> {
    const url = `${this.contactsUrl}/?id=${id}`
    return this.http.get<IContact[]>(url).pipe(
      map(contacts => contacts[0]),
      catchError(this.handleError<IContact>(`getContact id=${id}`))
    )
  }

  getContactById(id: string): Observable<IContact> {
    const url = `${this.contactsUrl}/${id}`
    return this.http.get<IContact>(url).pipe(
      catchError(this.handleError<IContact>(`getContact id=${id}`))
    )
  }

  createContact(item): Observable<IContact> {
    const id = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now()
    const model = Object.assign({}, item, {id: id})
    return this.http.post<IContact>(this.contactsUrl, model, httpOptions).pipe(
      catchError(this.handleError<IContact>('createContact'))
    )
  }

  updateContact(item, id): Observable<IContact>{
    const url = `${this.contactsUrl}/${id}`
    const contact = Object.assign({}, item, {id: id})
    return this.http.put(url, contact, httpOptions).pipe(
      catchError(this.handleError<any>('updateContact')))
  }

  inactivateContact(contact) {
    const url = `${this.contactsUrl}/${contact.id}`
    contact['status'] = 'inactive'
    return this.http.put(url, contact, httpOptions).pipe(
      catchError(this.handleError<any>('inactivateContact')))
  }

  deleteContact(contact: IContact| string): Observable<IContact> {
    const id = typeof contact === 'string' ? contact: contact.id
    const url = `${this.contactsUrl}/${id}`
    return this.http.delete<IContact>(url, httpOptions).pipe(catchError(this.handleError<IContact>('deleteContact')))
  }
}
