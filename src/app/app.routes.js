"use strict";
var router_1 = require('@angular/router');
var auth_guard_1 = require('./auth-guard');
var login_component_1 = require('./login.component');
var other_component_1 = require('./other.component');
exports.appRoutes = [
    {
        path: '',
        component: login_component_1.login
    },
    {
        path: 'login',
        component: login_component_1.login,
    },
    {
        path: 'posts',
        canActivate: [auth_guard_1.AuthGuard],
        component: other_component_1.OtherApp
    }
];
// export const routing = RouterModule.forRoot(appRoutes);
exports.APP_ROUTER_PROVIDER = router_1.provideRoutes(exports.appRoutes);
//# sourceMappingURL=app.routes.js.map