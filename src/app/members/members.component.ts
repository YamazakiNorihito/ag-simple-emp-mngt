import { Component, OnInit } from '@angular/core';

import { Member } from '../member';

@Component({
  selector: 'app-members',  //  コンポーネントのCSS要素セレクター
  templateUrl: './members.component.html', //コンポーネントのテンプレートファイルの場所
  styleUrls: ['./members.component.css'] // コンポーネントのプライベートCSSスタイルの場所
})
export class MembersComponent implements OnInit {

  member: Member = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
