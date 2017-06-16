"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var CommentComponent = (function () {
    function CommentComponent(http) {
        this.http = http;
        this.pageTitle = 'Comment Managment';
        this.comment = '';
    }
    CommentComponent.prototype.addComment = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('charset', 'utf-8');
        this.http.post('http://localhost:5000/addComment', { comment: this.comment })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            _this.comment = '';
            _this.comments = data.data;
        }, function (error) {
            _this.comment = '';
            console.log('Error', error);
        });
    };
    CommentComponent.prototype.ngOnInit = function () {
        this.fetchComment();
    };
    CommentComponent.prototype.fetchComment = function () {
        var _this = this;
        this.http.get('http://localhost:5000/fetchComment')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data.data);
            _this.comments = data.data;
        }, function (error) {
            console.log('Error', error);
        });
    };
    return CommentComponent;
}());
CommentComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/home/comment.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], CommentComponent);
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map