import { Component, OnInit } from '@angular/core';

import { Member } from '../member';

import {MEMBERS} from '../mock-members'

@Component({
  selector: 'app-members',  //  コンポーネントのCSS要素セレクター
  templateUrl: './members.component.html', //コンポーネントのテンプレートファイルの場所
  styleUrls: ['./members.component.css'] // コンポーネントのプライベートCSSスタイルの場所
})
export class MembersComponent implements OnInit {
  members = MEMBERS;

  selectedMember?: Member;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(mem: Member): void {
    this.selectedMember = mem;
  }
}
