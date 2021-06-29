import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {MessageService} from './message.service'
import {Member} from './../member'


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private membersUrl = 'api/members'; // Web APIのURL

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getMembers() :Observable<Member[]>{
    return this.http.get<Member[]>(this.membersUrl)
          .pipe(
            tap(members => this.log('fetched members')),
            catchError(this.handleError<Member[]>('getHeroes', []))
          );
  }

  /** IDによりヒーローを取得する。idが見つからない場合は`undefined`を返す。 */
  getHeroNo404<Data>(id: number): Observable<Member> {
    const url = `${this.membersUrl}/?id=${id}`;
    return this.http.get<Member[]>(url)
      .pipe(
        map(heroes => heroes[0]), // {0|1} 要素の配列を返す
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Member id=${id}`);
        }),
        catchError(this.handleError<Member>(`getMember id=${id}`))
      );
  }

  getMember(id:Number):Observable<Member>{
    let url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url)
                    .pipe(
                      tap(_ => this.log(`fetched Member id=${id}`)),
                      catchError(this.handleError<Member>(`getMember id=${id}`))
                    );
  }
  /* 検索語を含むヒーローを取得する */
  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      // 検索語がない場合、空のヒーロー配列を返す
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found Members matching "${term}"`)),
      catchError(this.handleError<Member[]>('searchMembers', []))
    );
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいヒーローを登録する */
  addMember(mem: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, mem, this.httpOptions).pipe(
      tap((newHero: Member) => this.log(`added mem w/ id=${newHero.id}`)),
      catchError(this.handleError<Member>('addHero'))
    );
  }

  /** DELETE: サーバーからヒーローを削除 */
  deleteMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Member id=${id}`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }


  /** PUT: サーバー上でヒーローを更新 */
  updateMember(mem: Member): Observable<any> {
    return this.http.put(this.membersUrl, mem, this.httpOptions).pipe(
      tap(_ => this.log(`updated mem id=${mem.id}`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }
  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
  /** HeroServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`MemerService: ${message}`);
  }
}
