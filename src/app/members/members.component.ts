import { Component, OnInit } from '@angular/core';

import { Member } from '../member';

import {MemberService} from '../services/member.service'

@Component({
  selector: 'app-members',  //  コンポーネントのCSS要素セレクター
  templateUrl: './members.component.html', //コンポーネントのテンプレートファイルの場所
  styleUrls: ['./members.component.css'] // コンポーネントのプライベートCSSスタイルの場所
})
export class MembersComponent implements OnInit {
  members :Member[] =[];

  constructor(private memberService:MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  private getMembers():void{
    this.memberService.getMembers()
                      .subscribe(
                        mems => this.members = mems
                      );
  }
}
