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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.memberService.addMember({ name } as Member)
      .subscribe(mem => {
        this.members.push(mem);
      });
  }

  delete(mem: Member): void {
    this.members = this.members.filter(h => h !== mem);
    this.memberService.deleteMember(mem.id).subscribe();
  }

  private getMembers():void{
    this.memberService.getMembers()
                      .subscribe(
                        mems => this.members = mems
                      );
  }
}
