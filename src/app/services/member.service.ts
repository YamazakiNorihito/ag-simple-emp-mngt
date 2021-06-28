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

  getMembers() :Observable<Member[]>{
    this.messageService.add('MemberService: fetched heroes');
    return of(MEMBERS);
  }


  getMember(id:Number):Observable<Member>{
    let mem = MEMBERS.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);

    return of(mem);
  }
}
