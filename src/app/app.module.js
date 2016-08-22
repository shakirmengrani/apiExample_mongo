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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var other_component_1 = require('./other.component');
var login_component_1 = require('./login.component');
var hero_service_1 = require('./services/hero.service');
var app_routes_1 = require('./app.routes');
var auth_guard_1 = require('./auth-guard');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var angular2_jwt_1 = require('angular2-jwt');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.App, other_component_1.OtherApp, login_component_1.login],
            providers: [
                app_routes_1.APP_ROUTER_PROVIDER,
                hero_service_1.HeroService,
                http_1.HTTP_PROVIDERS,
                core_1.bind(common_1.LocationStrategy).toClass(common_1.HashLocationStrategy),
                core_1.provide(angular2_jwt_1.AuthConfig, { useFactory: function () { return new angular2_jwt_1.AuthConfig(); } }),
                angular2_jwt_1.AuthHttp,
                auth_guard_1.AuthGuard
            ],
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(app_routes_1.appRoutes), http_1.HttpModule, forms_1.FormsModule],
            bootstrap: [app_component_1.App]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map