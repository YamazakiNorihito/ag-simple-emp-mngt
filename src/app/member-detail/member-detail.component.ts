import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MemberService } from '../services/member.service';

import { Member } from '../member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;

  /*
    ActivatedRouteは、このHeroDetailComponentのインスタンスへのルートに関する情報を保持します。 このコンポーネントは、URLから抽出されたルートのパラメータに関心があります。 "id"パラメータは、表示するヒーローのidです。

    HeroServiceは、リモートサーバーからヒーローのデータを取得し、 このコンポーネントはそれを使用して表示するヒーローを取得します。

    locationは、ブラウザと対話するためのAngularサービスです。 ここへナビゲートしたビューに戻るために、後で使うことになるでしょう。
  */
  constructor(
    private route: ActivatedRoute,
    private memService: MemberService,
    private location: Location) { }

  ngOnInit(): void {
    this.getMember();
  }


  /*
    route.snapshotは、コンポーネントが作成された直後のルート情報の静的イメージです。
    paramMapは、URL から抽出されたルートパラメータ値の辞書です。 "id"キーは、フェッチするヒーローのidを返します。
  */
  private getMember() : void{
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.memService.getMember(id)
    .subscribe(mems => this.member = mems)
  }

  goBack(): void {
    this.location.back();
  }

}
