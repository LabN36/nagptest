import { Component } from '@angular/core';
import { Http, Headers, } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Component({
    templateUrl: 'app/home/comment.component.html'
})
export class CommentComponent {
    public pageTitle: string = 'Comment Managment';
    public comment: string = '';
    public comments: any;
    addComment() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('charset', 'utf-8');
        this.http.post('http://localhost:5000/addComment', { comment: this.comment })
            .map(res => res.json())
            .subscribe(
            data => {
                console.log(data);
                this.comment = '';
                this.comments = data.data;
            },
            error => {
                this.comment = '';
                console.log('Error', error);
            });
    }
    ngOnInit() {
        this.fetchComment();
    }
    fetchComment() {
        this.http.get('http://localhost:5000/fetchComment')
            .map(res => res.json())
            .subscribe(
            data => {
                console.log(data.data);
                this.comments = data.data;
            },
            error => {
                console.log('Error', error);
            });
    }
    constructor(public http: Http) { }
}
