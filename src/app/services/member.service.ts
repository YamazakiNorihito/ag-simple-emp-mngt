import { Injectable } from '@angular/core';

import {Member} from './../member'
import {MEMBERS} from './../mock-members'

import { Observable,of } from 'rxjs';

import {MessageService} from './message.service'


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private messageService: MessageService) { }

  getMember() :Observable<Member[]>{
    this.messageService.add('MemberService: fetched heroes');
    return of(MEMBERS);
  }
}
