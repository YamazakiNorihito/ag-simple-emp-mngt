import { Component, OnInit } from '@angular/core';

import { Member } from '../member';

import {MemberService} from '../services/member.service'
import {MessageService} from './../services/message.service'

@Component({
  selector: 'app-members',  //  コンポーネントのCSS要素セレクター
  templateUrl: './members.component.html', //コンポーネントのテンプレートファイルの場所
  styleUrls: ['./members.component.css'] // コンポーネントのプライベートCSSスタイルの場所
})
export class MembersComponent implements OnInit {
  members :Member[] =[];

  selectedMember?: Member;

  constructor(private memberService:MemberService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  private getMembers():void{
    this.memberService.getMember()
                      .subscribe(
                        mems => this.members = mems
                      );
  }

  onSelect(mem: Member): void {
    this.selectedMember = mem;
    this.messageService.add(`MembersComponent: Selected hero id=${mem.id}`);
  }
}
