webpackJsonp([0],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_home__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_service__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = (function () {
    function TabsPage(tabService) {
        this.tabService = tabService;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__dashboard_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__dashboard_home__["a" /* HomePage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__dashboard_home__["a" /* HomePage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_1__dashboard_home__["a" /* HomePage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_1__dashboard_home__["a" /* HomePage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"c:\xampp\htdocs\intro_app\ionic\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="{{ tabService.getSection(\'HOME\') | translate }}" class="disable-ripple" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="{{ tabService.getSection(\'CONTACTS\') | translate }}" class="disable-ripple" tabIcon="contacts"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="{{ tabService.getSection(\'INTROS\') | translate }}" class="disable-ripple" tabIcon="intros"></ion-tab>\n\n  <ion-tab [root]="tab4Root" tabTitle="{{ tabService.getSection(\'MESSAGES\') | translate }}" class="disable-ripple" tabIcon="messages"></ion-tab>\n\n  <ion-tab [root]="tab5Root" tabTitle="{{ tabService.getSection(\'SETTINGS\') | translate }}" class="disable-ripple" tabIcon="settings"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"c:\xampp\htdocs\intro_app\ionic\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__tabs_service__["a" /* TabService */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 176;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_config_data__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ConfigService = (function () {
    function ConfigService() {
        this.section = '';
    }
    ConfigService.prototype.setSection = function (section) {
        this.section = section;
    };
    ConfigService.prototype.getSection = function () {
        return this.section;
    };
    ConfigService.prototype.getAllConfig = function () {
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */];
    };
    ConfigService.prototype.getGeneral = function () {
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL;
    };
    ConfigService.prototype.getDomainAPI = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].ROUTES.DOMAIN_API === undefined || typeof __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].ROUTES.DOMAIN_API != 'string')
            return '';
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].ROUTES.DOMAIN_API;
    };
    ConfigService.prototype.getDomainImages = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].ROUTES.FOLDER_IMAGES === undefined || typeof __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].ROUTES.FOLDER_IMAGES != 'string')
            return '';
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].ROUTES.FOLDER_IMAGES;
    };
    ConfigService.prototype.getLanguage = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.LANGUAGE === undefined || typeof __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.LANGUAGE != 'string')
            return 'ES';
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.LANGUAGE;
    };
    ConfigService.prototype.getQuantity = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.QUANTITY === undefined || typeof __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.QUANTITY !== 'number')
            return 0;
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.QUANTITY;
    };
    ConfigService.prototype.getGoogleApiKey = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.GOOGLE_APIKEY === undefined || typeof __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.GOOGLE_APIKEY !== 'string')
            return '';
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.GOOGLE_APIKEY;
    };
    ConfigService.prototype.getPlayList = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.CURRENT_PLAY_LIST === undefined || typeof __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.CURRENT_PLAY_LIST !== 'string')
            return '';
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.CURRENT_PLAY_LIST;
    };
    ConfigService.prototype.getChannel = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.CHANNEL === undefined || typeof __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.CHANNEL !== 'string')
            return '';
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.CHANNEL;
    };
    ConfigService.prototype.getLimitLetters = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.MAX_LETTERS === undefined || typeof __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.MAX_LETTERS !== 'object')
            return {
                titles: 20,
                descriptions: 40
            };
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL.MAX_LETTERS;
    };
    ConfigService.prototype.getGeneralDetail = function (element) {
        if (element === undefined || element === null || __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL[element] === undefined)
            return false;
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].GENERAL[element];
    };
    ConfigService.prototype.getLogo = function (element) {
        if (element === undefined || element === null || __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].LOGOS[element] === undefined)
            return false;
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].LOGOS[element];
    };
    ConfigService.prototype.getProfileImage = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].PROFILE_IMAGE === undefined || __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].PROFILE_IMAGE === null || __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].PROFILE_IMAGE === '')
            return false;
        return __WEBPACK_IMPORTED_MODULE_1__config_config_data__["a" /* CONFIG */].PROFILE_IMAGE;
    };
    return ConfigService;
}());
ConfigService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], ConfigService);

//# sourceMappingURL=config.service.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UtilService = (function () {
    function UtilService() {
    }
    UtilService.prototype.getCropName = function (name) {
        var finalName = '';
        if (typeof name == 'string' && name !== '') {
            finalName = name.replace(/ /g, '_').replace(/_/g, '-').toLowerCase();
        }
        return finalName;
    };
    return UtilService;
}());
UtilService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], UtilService);

//# sourceMappingURL=utils.service.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_linkedin__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_config_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_messages_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_session_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__tabs_tabs__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__user_user_register__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var LoginPage = (function () {
    function LoginPage(navCtrl, app, formBuilder, configService, httpService, translateService, facebook, sessionService, platform, messages, googlePlus, linkedin) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.app = app;
        this.formBuilder = formBuilder;
        this.configService = configService;
        this.httpService = httpService;
        this.translateService = translateService;
        this.facebook = facebook;
        this.sessionService = sessionService;
        this.platform = platform;
        this.messages = messages;
        this.googlePlus = googlePlus;
        this.linkedin = linkedin;
        this.loadingMessage = '';
        this.buildValidations();
        this.translateService.get('LOGIN').subscribe(function (value) {
            console.log(value);
            _this.configService.setSection(value);
        });
        this.logo = this.configService.getLogo('BIGGER');
        this.facebookLogo = this.configService.getLogo('FACEBOOK_BUTTON');
        this.sessionService.getSessionStatus().then(function (result) {
            var _this = this;
            if (result !== false) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]);
            }
            else {
                this.translateService.get('LOADING').subscribe(function (value) {
                    _this.loadingMessage = value;
                });
            }
        }.bind(this));
        this.initElementsByVersion();
    }
    LoginPage.prototype.initElementsByVersion = function () {
        if (this.platform.is('ios')) {
        }
        else {
        }
    };
    LoginPage.prototype.buildValidations = function () {
        this.loginForm = this.formBuilder.group({
            user: ['renshocontact@gmail.com', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['2f6W9MPSo7', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
    };
    LoginPage.prototype.login = function () {
        this.errorLogin = '';
        this.submitted = true;
        var data = {
            email: this.loginForm.value.user,
            password: this.loginForm.value.password
        };
        this.messages.showMessage({
            content: this.loadingMessage
        });
        this.httpService.post({
            url: 'login/authenticate',
            urlParams: [
                this.translateService.getDefaultLang()
            ],
            app: this.app,
            inputs: data,
            success: this.callBackLogin,
            context: this,
        });
    };
    LoginPage.prototype.callBackLogin = function (response) {
        this.messages.closeMessage();
        this.submitted = false;
        if (response !== undefined && response.status !== undefined && response.status === 'error') {
            this.errorLogin = response.data.message;
        }
        else {
            this.sessionService.initSession({
                'token': response.data.token,
                'mode_facebook': false,
                'mode_linkedin': false,
                'mode_google_plus': false
            });
            this.httpService.setTokenProvider(response.data.token);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]);
        }
    };
    LoginPage.prototype.forgotPassword = function () {
        //this.navCtrl.push(ForgotPasswordPage);
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__user_user_register__["a" /* RegisterUserPage */]);
    };
    LoginPage.prototype.loginFacebook = function () {
        this.submitted = true;
        this.sessionService.loginByFacebook().then(function () {
            this.getFacebookInfo();
        }.bind(this), function (error) {
            this.errorLogin = error;
            this.submitted = false;
            //cerramos sesion en facebook y cerramos sesion en la app
            this.sessionService.closeSession();
        }.bind(this));
    };
    LoginPage.prototype.getFacebookInfo = function () {
        var _this = this;
        this.messages.showMessage({
            content: this.loadingMessage
        });
        this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender', ['public_profile', 'email'])
            .then(function (data) {
            console.log(data);
            var info = {
                external_id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                platform: 'facebook'
            };
            _this.httpService.post({
                url: 'user',
                urlParams: [
                    'external',
                    _this.translateService.getDefaultLang()
                ],
                app: _this.app,
                inputs: info,
                success: _this.callBackFacebook,
                error: _this.errorCallBack,
                context: _this,
            });
        })
            .catch(function (error) {
            console.error(error);
            _this.submitted = false;
            //cerramos sesion en facebook y cerramos sesion en la app
            _this.sessionService.closeSession();
        });
    };
    LoginPage.prototype.errorCallBack = function (response) {
        this.messages.closeMessage();
        this.errorLogin = response.data.message;
        this.submitted = false;
        //cerramos sesion
        this.sessionService.closeSession();
    };
    LoginPage.prototype.callBackFacebook = function (response) {
        this.submitted = false;
        this.messages.closeMessage();
        if (response !== undefined && response.status !== undefined && response.status === 'error') {
            this.errorLogin = response.data.message;
            console.log('error', response);
        }
        else {
            console.log('good', response);
            this.sessionService.initSession({
                'token': response.data.token.token,
                'mode_facebook': true,
                'mode_linkedin': false,
                'mode_google_plus': false
            });
            this.httpService.setTokenProvider(response.data.token.token);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]);
        }
    };
    LoginPage.prototype.loginLinkedin = function () {
        this.submitted = true;
        this.sessionService.loginByLinkedin().then(function () {
            this.getLinkedinInfo();
        }.bind(this), function (error) {
            this.errorLogin = error;
            this.submitted = false;
            //cerramos sesion en facebook y cerramos sesion en la app
            this.sessionService.closeSession();
        }.bind(this));
    };
    LoginPage.prototype.getLinkedinInfo = function () {
        var _this = this;
        this.messages.showMessage({
            content: this.loadingMessage
        });
        //https://api.linkedin.com/v1/people/~:(id,first-name,last-name)
        this.linkedin.getRequest('people/~:(id,first-name,last-name,positions,email-address)?format=json')
            .then(function (data) {
            console.log(data);
            var info = {
                external_id: data.id,
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.emailAddress,
                full_name: data.firstName + ' ' + data.lastName,
                platform: 'linkedin'
            };
            if (data.positions !== undefined && data.positions.values !== undefined && data.positions.values.length > 0) {
                if (data.positions.values[0].company !== undefined && data.positions.values[0].company.name !== undefined)
                    info['company_name'] = data.positions.values[0].company.name;
                if (data.positions.values[0].title !== undefined)
                    info['job_title'] = data.positions.values[0].title;
                if (data.positions.values[0].summary !== undefined)
                    info['job_description'] = data.positions.values[0].summary;
            }
            _this.httpService.post({
                url: 'user',
                urlParams: [
                    'external',
                    _this.translateService.getDefaultLang()
                ],
                app: _this.app,
                inputs: info,
                success: _this.callBackLikedin,
                error: _this.errorCallBack,
                context: _this,
            });
        })
            .catch(function (error) {
            console.error(error);
            _this.submitted = false;
            //cerramos sesion en facebook y cerramos sesion en la app
            _this.sessionService.closeSession();
        });
    };
    LoginPage.prototype.callBackLikedin = function (response) {
        this.submitted = false;
        this.messages.closeMessage();
        if (response !== undefined && response.status !== undefined && response.status === 'error') {
            this.errorLogin = response.data.message;
            console.log('error', response);
        }
        else {
            console.log('good', response);
            this.sessionService.initSession({
                'token': response.data.token.token,
                'mode_facebook': false,
                'mode_linkedin': true,
                'mode_google_plus': false
            });
            this.httpService.setTokenProvider(response.data.token.token);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]);
        }
    };
    LoginPage.prototype.loginGooglePlus = function () {
        this.submitted = true;
        this.sessionService.loginByGooglePlus().then(function (result) {
            var names = result.displayName.split(' ');
            var first_name = '';
            var last_name = '';
            if (names.length > 0)
                first_name = names[0];
            if (names.length > 1)
                last_name = names[1];
            var info = {
                external_id: result.userId,
                first_name: first_name,
                last_name: last_name,
                email: result.email,
                platform: 'google_plus'
            };
            this.httpService.post({
                url: 'user',
                urlParams: [
                    'external',
                    this.translateService.getDefaultLang()
                ],
                app: this.app,
                inputs: info,
                success: this.callBackGooglePlus,
                error: this.errorCallBack,
                context: this,
            });
        }.bind(this), function (error) {
            this.errorLogin = error;
            this.submitted = false;
            //cerramos sesion en facebook y cerramos sesion en la app
            this.sessionService.closeSession();
        }.bind(this));
    };
    LoginPage.prototype.callBackGooglePlus = function (response) {
        this.submitted = false;
        this.messages.closeMessage();
        if (response !== undefined && response.status !== undefined && response.status === 'error') {
            this.errorLogin = response.data.message;
            console.log('error', response);
        }
        else {
            console.log('good', response);
            this.sessionService.initSession({
                'token': response.data.token.token,
                'mode_facebook': false,
                'mode_linkedin': false,
                'mode_google_plus': true
            });
            this.httpService.setTokenProvider(response.data.token.token);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]);
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"c:\xampp\htdocs\intro_app\ionic\src\pages\login\login.html"*/'<ion-header>\n\n  <header [options]="{backEnabled:false, showTab:false, showHeader:true, logoEnabled:false, menuEnabled:true, sectionEnabled:true}"></header>\n\n</ion-header>\n\n<ion-content>\n\n  <content class="form-style">\n\n    <ion-row>\n\n      <ion-col offset-4 col-4 class="center logo-main">\n\n        <img class="logo-bigger" src="{{logo}}">\n\n      </ion-col>\n\n    </ion-row>\n\n    <form [formGroup]="loginForm">\n\n      <ion-row>\n\n        <ion-col col-12 class="center">\n\n          <span class="error center" [innerHTML]="errorLogin"></span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-icon item-left name="ios-contact-outline"></ion-icon>\n\n            <ion-input md-input formControlName="user" type="email" placeholder = "{{\'USERNAME\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!loginForm.controls.user.valid  && (loginForm.controls.user.dirty || submitted)">\n\n            {{\'INVALID_USERNAME\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-icon class="flip-icon" item-left name="ios-unlock-outline"></ion-icon>\n\n            <ion-input md-input formControlName="password" type="password" placeholder="{{\'PASSWORD\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!loginForm.controls.password.valid  && (loginForm.controls.password.dirty || submitted)">\n\n            {{\'INVALID_PASSWORD\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <button ion-button color="light" (click)="forgotPassword()" [disabled]="submitted">{{\'FORGOT_PASSWORD\' | translate}}</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center big-label">\n\n          {{\'OR\' | translate}}\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <ion-row>\n\n            <ion-col col-3 class="center in-table">\n\n              <button ion-fab (click)="loginFacebook()" [disabled]="submitted" class="login-facebook"><img src="assets/logos/facebook.svg" name="logo-facebook"/></button>\n\n            </ion-col>\n\n            <ion-col col-6 class="center in-table">\n\n              <button ion-fab (click)="loginLinkedin()" [disabled]="submitted" class="login-linkedin"><img src="assets/logos/linkedin.svg" name="logo-linkedin"/></button>\n\n            </ion-col>\n\n            <ion-col col-3 class="center in-table">\n\n              <button ion-fab (click)="loginGooglePlus()" [disabled]="submitted" class="login-google-plus"><img src="assets/logos/google-plus.svg" name="logo-google-plus"/></button>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-12 class="center middle bottom-space">\n\n            <span class=\'black\'>{{\'NOT_MEMBER\' | translate}}</span>&nbsp;&nbsp;<button ion-button color="light" class="button-link" [disabled]="submitted" (click) = "register()">{{\'CREATE_ACCOUNT\' | translate}}</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <button ion-button class="next-login" (click)="login()" [disabled]="!loginForm.valid || submitted">{{\'NEXT\' | translate}}</button>\n\n\n\n    </form>\n\n  </content>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\xampp\htdocs\intro_app\ionic\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__lib_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_8__lib_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_9__lib_session_service__["a" /* SessionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__lib_messages_service__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_linkedin__["a" /* LinkedIn */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_config_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_messages_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_utils_service__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_tabs_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(app, navCtrl, httpService, configService, utilService, tabService, translateService, loadingCtrl, messages) {
        this.app = app;
        this.navCtrl = navCtrl;
        this.httpService = httpService;
        this.configService = configService;
        this.utilService = utilService;
        this.tabService = tabService;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.messages = messages;
        this.introductions = [];
        this.loadingMessage = '';
    }
    HomePage.prototype.ngOnInit = function () {
        /*
        this.translateService.get('LOADING').subscribe(
          value=>{
            this.loadingMessage = value;
            this.messages.showMessage({
               content:this.loadingMessage
            });
            this.quantity = this.configService.getQuantity();
            this.page = 1;
          //  this.getCountIntroductions();
          }
        );
        */
    };
    HomePage.prototype.getCountIntroductions = function () {
        /*
        this.httpService.get({
          url: 'introductions',
          urlParams: [
            this.translateService.getDefaultLang(),
            'count'
          ],
          app: this.app,
          success: this.callBackCountIntroductions,
          context: this
        });
        */
    };
    HomePage.prototype.callBackCountIntroductions = function (response) {
        this.maxIntroductions = response.data.Introductions_count;
        //si los Introductionos son mayores a 1, cambiamos el nombre del tab
        if (this.maxIntroductions != 0)
            this.getIntroductions();
    };
    HomePage.prototype.getMoreIntroductions = function (infiniteScroll) {
        if (this.maxIntroductions > this.introductions.length) {
            this.infiniteScroll = infiniteScroll;
            this.messages.showMessage({
                content: this.loadingMessage
            });
            this.getIntroductions();
        }
        else {
            this.disableScroll();
        }
    };
    HomePage.prototype.getIntroductions = function () {
        /*
        this.httpService.get({
          url: 'introductions',
          app: this.app,
          urlParams: [
            this.translateService.getDefaultLang(),
            { page: this.page },
            { quantity: this.quantity },
          ],
          success: this.callBackIntroductions,
          context: this
        });
        */
    };
    HomePage.prototype.callBackIntroductions = function (response) {
        this.messages.closeMessage();
        this.page++;
    };
    HomePage.prototype.refreshScroll = function () {
        if (this.infiniteScroll !== undefined)
            this.infiniteScroll.complete();
    };
    HomePage.prototype.disableScroll = function () {
        if (this.infiniteScroll !== undefined)
            this.infiniteScroll.enable(false);
    };
    HomePage.prototype.gotoDetail = function (id) {
        //this.navCtrl.push(DetailAboutPage, { id: id });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'home',template:/*ion-inline-start:"c:\xampp\htdocs\intro_app\ionic\src\pages\dashboard\home.html"*/'<ion-header>\n\n  <header [options]="{backEnabled:false, showTab:true, showHeader:true, logoEnabled:false, menuEnabled:true, sectionEnabled:true}"></header>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n\n   <ion-item class="clear-style list" *ngFor="let introduction of introductions" (click)="gotoDetail(introduction.id)">\n\n       <img class="images-collage-small" src="{{introduction.images}}" />\n\n       <img class="images-collage title" *ngIf=" introduction.type_title == \'image\'"  src="{{introduction.title_image}}" />\n\n       <h2 class="images-collage title" *ngIf=" introduction.type_title == \'text\'">{{introduction.name}}</h2>\n\n   </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-infinite-scroll (ionInfinite)="getMoreintroductions($event)">\n\n   <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="{{\'MORE_introductionS\' | translate}}"\n\n    ></ion-infinite-scroll-content>\n\n </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\xampp\htdocs\intro_app\ionic\src\pages\dashboard\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__lib_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3__lib_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_5__lib_utils_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_6__tabs_tabs_service__["a" /* TabService */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__lib_messages_service__["a" /* MessageService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_config_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_messages_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_session_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_user_setting__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RegisterUserPage = (function () {
    function RegisterUserPage(navCtrl, app, formBuilder, configService, httpService, translateService, sessionService, loadingCtrl, platform, messages) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.app = app;
        this.formBuilder = formBuilder;
        this.configService = configService;
        this.httpService = httpService;
        this.translateService = translateService;
        this.sessionService = sessionService;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.messages = messages;
        this.loadingMessage = '';
        this.buildValidations();
        this.configService.setSection('');
        this.translateService.get('SIGNUP').subscribe(function (value) {
            console.log(value);
            _this.configService.setSection(value);
        });
        this.translateService.get('LOADING').subscribe(function (value) {
            _this.loadingMessage = value;
            _this.logo = _this.configService.getLogo('BIGGER');
        });
    }
    RegisterUserPage.prototype.ngAfterViewChecked = function () { };
    RegisterUserPage.prototype.buildValidations = function () {
        this.registerForm = this.formBuilder.group({
            first_name: ['JUAN', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            last_name: ['gonzales', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            email: ['renshocontact@gmail.com', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['12345678', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            confirm_password: ['12345678', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    };
    RegisterUserPage.prototype.back = function () {
        this.app.getRootNav().popToRoot();
    };
    RegisterUserPage.prototype.register = function () {
        var _this = this;
        this.errorRegister = '';
        this.submitted = true;
        if (this.registerForm.value.password !== this.registerForm.value.confirm_password) {
            this.translateService.get('PASSWORD_NOT_MATCH').subscribe(function (value) {
                _this.errorRegister = value;
            });
            this.submitted = false;
            return;
        }
        var data = {
            first_name: this.registerForm.value.first_name,
            last_name: this.registerForm.value.last_name,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
        };
        this.messages.showMessage({
            content: this.loadingMessage
        });
        //number_phones : this.registerForm.value.number_phones,
        this.httpService.post({
            url: 'user',
            urlParams: [
                this.translateService.getDefaultLang()
            ],
            app: this.app,
            inputs: data,
            success: this.callBackRegister,
            error: this.callBackError,
            context: this,
        });
    };
    RegisterUserPage.prototype.callBackRegister = function (response) {
        this.submitted = false;
        this.messages.closeMessage();
        if (response !== undefined && response.status !== undefined && response.status === 'error') {
            this.errorRegister = response.data.message;
        }
        else {
            var id = response.data.user_id;
            if (id !== 0)
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__user_user_setting__["a" /* SettingUserPage */], { email: this.registerForm.value.email, password: this.registerForm.value.password, user_id: id });
        }
    };
    RegisterUserPage.prototype.callBackError = function (response) {
        this.messages.closeMessage();
    };
    return RegisterUserPage;
}());
RegisterUserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-register',template:/*ion-inline-start:"c:\xampp\htdocs\intro_app\ionic\src\pages\user\user_register.html"*/'<ion-header>\n\n  <header [options]="{backEnabled:true, showTab:false, showHeader:true, logoEnabled:false,menuEnabled:true, sectionEnabled:true}"></header>\n\n</ion-header>\n\n<ion-content>\n\n  <content class="form-style">\n\n    <ion-row>\n\n      <ion-col offset-4 col-4 class="center logo-main">\n\n        <img class="logo-bigger" src="{{logo}}">\n\n      </ion-col>\n\n    </ion-row>\n\n    <form [formGroup]="registerForm">\n\n      <ion-row>\n\n        <ion-col col-12 class="center">\n\n          <span class="error center" [innerHTML]="errorRegister"></span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-icon item-left name="ios-contact-outline"></ion-icon>\n\n            <ion-input md-input formControlName="first_name" type="text" placeholder="{{\'FIRST_NAME\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerForm.controls.first_name.valid  && (registerForm.controls.first_name.dirty || submitted)">\n\n            {{\'INVALID_FIRST_NAME\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n              <ion-icon item-left name="ios-contact-outline"></ion-icon>\n\n              <ion-input md-input formControlName="last_name" type="text" placeholder="{{\'LAST_NAME\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerForm.controls.last_name.valid  && (registerForm.controls.last_name.dirty || submitted)">\n\n            {{\'INVALID_LAST_NAME\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-icon item-left name="ios-mail-outline"></ion-icon>\n\n            <ion-input md-input formControlName="email" type="email" placeholder="{{\'EMAIL\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerForm.controls.email.valid  && (registerForm.controls.email.dirty || submitted)">\n\n            {{\'INVALID_EMAIL\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-icon class="flip-icon" item-left name="ios-unlock-outline"></ion-icon>\n\n            <ion-input md-input formControlName="password" type="password" placeholder="{{\'PASSWORD\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerForm.controls.password.valid  && (registerForm.controls.password.dirty || submitted)">\n\n            {{\'INVALID_PASSWORD\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-icon class="flip-icon" item-left name="ios-unlock-outline"></ion-icon>\n\n            <ion-input md-input formControlName="confirm_password" type="password" placeholder="{{\'CONFIRM_PASSWORD\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerForm.controls.confirm_password.valid  && (registerForm.controls.confirm_password.dirty || submitted)">\n\n            {{\'INVALID_CONFIRM_PASSWORD\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row class="form-container-buttons">\n\n        <ion-col col-12 class="center">\n\n          <button  ion-button class="button-form shadow" (click)="back()" [disabled]="submitted">{{\'LOG_IN\' | translate}}</button>\n\n\n\n          <button outline  ion-button class="button-form shadow" (click)="register()" [disabled]="!registerForm.valid || submitted">{{\'ACCEPT\' | translate}}</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </form>\n\n  </content>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\xampp\htdocs\intro_app\ionic\src\pages\user\user_register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__lib_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_6__lib_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__lib_session_service__["a" /* SessionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__lib_messages_service__["a" /* MessageService */]])
], RegisterUserPage);

//# sourceMappingURL=user_register.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_config_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_messages_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_session_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tabs_tabs__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SettingUserPage = (function () {
    function SettingUserPage(navCtrl, app, formBuilder, configService, httpService, translateService, sessionService, navParams, platform, messages, camera) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.app = app;
        this.formBuilder = formBuilder;
        this.configService = configService;
        this.httpService = httpService;
        this.translateService = translateService;
        this.sessionService = sessionService;
        this.navParams = navParams;
        this.platform = platform;
        this.messages = messages;
        this.camera = camera;
        this.loadingMessage = '';
        this.imageTaken = false;
        this.ios = false;
        this.params = { 'email': this.navParams.get('email'), 'password': this.navParams.get('password'), 'user_id': this.navParams.get('user_id') };
        this.buildValidations();
        this.configService.setSection('');
        this.translateService.get('SETTINGS').subscribe(function (value) {
            _this.configService.setSection(value);
        });
        this.translateService.get('LOADING').subscribe(function (value) {
            _this.loadingMessage = value;
            _this.logo = _this.configService.getLogo('BIGGER');
        });
        if (this.params !== undefined && typeof this.params !== 'object') {
            this.submitted = true;
        }
        if (this.platform.is('ios')) {
            this.ios = true;
        }
        else {
            this.ios = false;
        }
    }
    SettingUserPage.prototype.ngAfterViewChecked = function () { };
    SettingUserPage.prototype.buildValidations = function () {
        this.registerSetting = this.formBuilder.group({
            full_name: ['jajajaj', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            job_title: ['jejejeje', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            company_name: ['jijijij', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            job_description: ['jojojjoj', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3)])],
            //email: [  this.params['email'], Validators.compose([Validators.minLength(5), Validators.email,
            email: ['jua@gmail.com', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])]
        });
    };
    SettingUserPage.prototype.makeImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.CAMERA,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: this.camera.Direction.BACK,
            targetWidth: 200,
            targetHeight: 200
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageTaken = true;
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.imageProfile = base64Image;
        }, function (err) {
            // Handle error
        });
    };
    SettingUserPage.prototype.back = function () {
        this.app.getRootNav().pop();
    };
    SettingUserPage.prototype.register = function () {
        this.errorSetting = '';
        this.submitted = true;
        var data = {
            full_name: this.registerSetting.value.full_name,
            job_title: this.registerSetting.value.job_title,
            company_name: this.registerSetting.value.commpany_name,
            job_description: this.registerSetting.value.job_description,
            email: this.registerSetting.value.email
        };
        var paramsPut = {
            url: 'user/setting',
            urlParams: [
                this.params['user_id'],
                this.translateService.getDefaultLang()
            ],
            app: this.app,
            inputs: data,
            success: this.callBackRegister,
            error: this.callBackError,
            context: this,
        };
        if (this.imageTaken === true && this.imageProfile !== undefined && this.imageProfile != null && this.imageProfile !== '')
            paramsPut['files'] = { 'image_profile': this.imageProfile };
        this.messages.showMessage({
            content: this.loadingMessage
        });
        this.httpService.put(paramsPut);
    };
    SettingUserPage.prototype.callBackRegister = function (response) {
        this.submitted = false;
        if (response !== undefined && response.status !== undefined && response.status === 'error') {
            this.messages.closeMessage();
            this.errorSetting = response.data.message;
        }
        else {
            //aqui deberia ir un toast
            var data = {
                email: this.registerSetting.value.email,
                password: this.params['password']
            };
            this.httpService.post({
                url: 'login/authenticate',
                urlParams: [
                    this.translateService.getDefaultLang()
                ],
                app: this.app,
                inputs: data,
                success: this.callBackLogin,
                context: this,
            });
        }
    };
    SettingUserPage.prototype.callBackError = function (response) {
        this.messages.closeMessage();
    };
    SettingUserPage.prototype.callBackLogin = function (response) {
        this.messages.closeMessage();
        this.submitted = false;
        if (response !== undefined && response.status !== undefined && response.status === 'error') {
            this.errorSetting = response.data.message;
        }
        else {
            this.sessionService.initSession({
                'token': response.data.token,
                'mode_facebook': false,
                'mode_linkedin': false,
                'mode_google_plus': false
            });
            this.httpService.setTokenProvider(response.data.token);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__tabs_tabs__["a" /* TabsPage */]);
        }
    };
    return SettingUserPage;
}());
SettingUserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-setting',template:/*ion-inline-start:"c:\xampp\htdocs\intro_app\ionic\src\pages\user\user_setting.html"*/'<ion-header>\n\n  <header [options]="{backEnabled:true, showTab:false, showHeader:true, logoEnabled:false,menuEnabled:true, sectionEnabled:true}"></header>\n\n</ion-header>\n\n<ion-content>\n\n  <content class="form-style">\n\n    <ion-row *ngIf="ios">\n\n      <ion-col col-12 class="center image-setting">\n\n        <ion-icon class="big-icon" *ngIf="imageProfile==null" item-left name="md-person"></ion-icon>\n\n        <img *ngIf="imageProfile!=null" src="{{imageProfile}}">\n\n        <ion-fab bottom right>\n\n         <button (click) = "makeImage()" ion-fab>\n\n           <ion-icon  name="md-camera"></ion-icon>\n\n         </button>\n\n       </ion-fab>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row *ngIf="!ios">\n\n      <ion-col offset-4 col-4 class="center logo-main">\n\n        <img class="logo-bigger" src="{{logo}}">\n\n      </ion-col>\n\n    </ion-row>\n\n    <form [formGroup]="registerSetting">\n\n      <ion-row>\n\n        <ion-col col-12 class="center">\n\n          <span class="error center" [innerHTML]="errorSetting"></span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <div *ngIf="!ios" (click) = "makeImage()" class="image-setting">\n\n        <div *ngIf="imageProfile==null" class="photo">\n\n          <span>{{\'PROFILE_PHOTO\' | translate}}</span>\n\n        </div>\n\n        <img *ngIf="imageProfile!=null" src="{{imageProfile}}">\n\n      </div>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-input md-input formControlName="full_name" type="text" placeholder="{{\'FULL_NAME\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerSetting.controls.full_name.valid  && (registerSetting.controls.full_name.dirty || submitted)">\n\n            {{\'INVALID_FULL_NAME\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n              <ion-input md-input formControlName="job_title" type="text" placeholder="{{\'JOB_TITLE\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerSetting.controls.job_title.valid  && (registerSetting.controls.job_title.dirty || submitted)">\n\n            {{\'INVALID_JOB_TITLE\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-input md-input formControlName="company_name" type="text" placeholder="{{\'COMPANY_NAME\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerSetting.controls.company_name.valid  && (registerSetting.controls.company_name.dirty || submitted)">\n\n            {{\'INVALID_COMPANY_NAME\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-input md-input formControlName="job_description" type="text" placeholder="{{\'JOB_DESCRIPTION\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerSetting.controls.job_description.valid  && (registerSetting.controls.job_description.dirty || submitted)">\n\n            {{\'INVALID_JOB_DESCRIPTION\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-11 class="center">\n\n          <ion-item>\n\n            <ion-input md-input formControlName="email" type="email" placeholder="{{\'EMAIL\' | translate}}"></ion-input>\n\n          </ion-item>\n\n          <span class="error" *ngIf="!registerSetting.controls.email.valid  && (registerSetting.controls.email.dirty || submitted)">\n\n            {{\'INVALID_EMAIL\' | translate}}\n\n          </span>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row class="form-container-buttons">\n\n        <ion-col col-12 class="center">\n\n          <button  ion-button class="button-form shadow" (click)="back()" [disabled]="submitted">{{\'SIGNUP\' | translate}}</button>\n\n\n\n          <button outline  ion-button class="button-form shadow" (click)="register()" [disabled]="!registerSetting.valid || submitted">{{\'ACCEPT\' | translate}}</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </form>\n\n  </content>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\xampp\htdocs\intro_app\ionic\src\pages\user\user_setting.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__lib_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_7__lib_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__lib_session_service__["a" /* SessionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__lib_messages_service__["a" /* MessageService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */]])
], SettingUserPage);

//# sourceMappingURL=user_setting.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_config_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_messages_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { FileChooser } from '@ionic-native/file-chooser';





var UpdateUserPage = (function () {
    function UpdateUserPage(navCtrl, app, formBuilder, configService, httpService, translateService, camera, loadingCtrl, platform, actionSheetCtrl, imagePicker, messages) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.formBuilder = formBuilder;
        this.configService = configService;
        this.httpService = httpService;
        this.translateService = translateService;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.imagePicker = imagePicker;
        this.messages = messages;
        this.oldImage = '';
        this.imageTaken = false;
        this.loadingMessage = '';
        //menu
        this.optionsLabel = '';
        this.cameraLabel = '';
        this.galleryLabel = '';
        this.cancelLabel = '';
        this.buildValidations();
        this.logo = this.configService.getLogo('BIGGER');
        this.facebookLogo = this.configService.getLogo('FACEBOOK_BUTTON');
        this.image = this.configService.getProfileImage();
        this.ready = false;
    }
    UpdateUserPage.prototype.ngAfterViewChecked = function () {
        //console.log("ngAfterViewChecked");
        var html = document.querySelector('page-user-update .background-1');
        html.style.backgroundSize = this.platform.width() + 'px ' + this.platform.height() + 'px';
    };
    UpdateUserPage.prototype.buildValidations = function () {
        var _this = this;
        this.updateForm = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            last_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(15)])],
            confirm_password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(15)])],
            number_phones: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(7)])],
            facebookId: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }]
        });
        this.translateService.get('OPTIONS').subscribe(function (value) { _this.optionsLabel = value; });
        this.translateService.get('FROM_CAMERA').subscribe(function (value) { _this.cameraLabel = value; });
        this.translateService.get('FROM_GALLERY').subscribe(function (value) { _this.galleryLabel = value; });
        this.translateService.get('CANCEL').subscribe(function (value) { _this.cancelLabel = value; });
        this.translateService.get('LOADING').subscribe(function (value) {
            _this.loadingMessage = value;
            _this.messages.showMessage({
                content: _this.loadingMessage
            });
            _this.getUser();
        });
    };
    UpdateUserPage.prototype.getUser = function () {
        //consultamos los datos del usuario
        this.httpService.get({
            url: 'user',
            urlParams: [
                this.translateService.getDefaultLang()
            ],
            app: this.app,
            success: function (response) {
                var _this = this;
                this.messages.closeMessage();
                console.log(response.data.user);
                var data = response.data.user;
                this.updateForm.controls['name'].patchValue(data.name);
                this.updateForm.controls['name'].setValue(data.name);
                this.updateForm.controls['last_name'].patchValue(data.last_name);
                this.updateForm.controls['last_name'].setValue(data.last_name);
                this.updateForm.controls['number_phones'].patchValue(data.number_phones);
                this.updateForm.controls['number_phones'].setValue(data.number_phones);
                this.updateForm.controls['email'].patchValue(data.email);
                this.updateForm.controls['email'].setValue(data.email);
                if (data.image_profile !== undefined && data.image_profile !== null && data.image_profile !== '') {
                    this.image = this.configService.getDomainImages() + '/profiles/' + data.image_profile;
                    this.oldImage = data.image_profile;
                }
                if (data.facebookId === '' || data.facebookId === undefined || data.facebookId === null) {
                    this.translateService.get('NOT_FACEBOOK').subscribe(function (value) {
                        _this.updateForm.controls['facebookId'].patchValue(value);
                        _this.updateForm.controls['facebookId'].setValue(value);
                    });
                }
                else {
                    this.updateForm.controls['facebookId'].patchValue(data.facebookId);
                    this.updateForm.controls['facebookId'].setValue(data.facebookId);
                }
                this.ready = true;
            },
            context: this,
        });
    };
    UpdateUserPage.prototype.update = function () {
        var _this = this;
        this.errorUpdate = '';
        this.submitted = true;
        this.updateForm.value.password = this.updateForm.value.password.replace('"', '').replace('\'', '');
        if (this.updateForm.value.password !== this.updateForm.value.confirm_password) {
            this.translateService.get('PASSWORD_NOT_MATCH').subscribe(function (value) {
                _this.errorUpdate = value;
            });
            this.submitted = false;
            return;
        }
        this.messages.showMessage({
            content: this.loadingMessage
        });
        var data = {
            name: this.updateForm.value.name,
            last_name: this.updateForm.value.last_name,
            number_phones: this.updateForm.value.number_phones
        };
        if (this.imageTaken === true && this.oldImage !== undefined && this.oldImage != null && this.oldImage !== '')
            data['old_image_profile'] = this.oldImage;
        if (this.updateForm.value.password.trim() !== '')
            data['password'] = this.updateForm.value.password;
        //number_phones : this.updateForm.value.number_phones,
        var paramsPut = {
            url: 'user',
            urlParams: [
                this.translateService.getDefaultLang()
            ],
            app: this.app,
            inputs: data,
            success: this.callBackUpdate,
            error: this.callBackError,
            context: this,
        };
        if (this.imageTaken === true && this.image !== undefined && this.image != null && this.image !== '')
            paramsPut['files'] = { 'image_profile': this.image };
        this.httpService.put(paramsPut);
    };
    UpdateUserPage.prototype.callBackUpdate = function (response) {
        this.messages.closeMessage();
        this.submitted = false;
        if (response !== undefined && response.status !== undefined && response.status === 'error') {
            this.errorUpdate = response.data.message;
        }
        else {
            this.navCtrl.pop(); //hacemos pop ya que no debemo sadherirlo con puhs, ya esta en controller eso genera error de navegacion
        }
    };
    UpdateUserPage.prototype.callBackError = function (response) {
        this.messages.closeMessage();
    };
    UpdateUserPage.prototype.makeOptions = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.optionsLabel,
            buttons: [
                {
                    text: this.cameraLabel,
                    handler: function () {
                        console.log('Destructive clicked');
                        _this.takePicture();
                    }
                }, {
                    text: this.galleryLabel,
                    handler: function () {
                        _this.choosePicture();
                    }
                }, {
                    text: this.cancelLabel,
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        actionSheet.present();
    };
    UpdateUserPage.prototype.choosePicture = function () {
        var _this = this;
        this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 }).then(function (imageData) {
            _this.imageTaken = true;
            console.log(imageData);
            var canvas = document.createElement("canvas");
            var context = canvas.getContext('2d');
            var base_image = new Image();
            base_image.src = imageData[0].toString();
            base_image.onload = function () {
                var ratio = 0;
                if (base_image.naturalWidth >= base_image.naturalHeight)
                    ratio = (this.platform.width() / base_image.naturalWidth);
                else
                    ratio = (this.platform.height() / base_image.naturalHeight);
                console.log(ratio);
                var scaledImage = this.downScaleImage(base_image, ratio);
                canvas.width = scaledImage.width;
                canvas.height = scaledImage.height;
                context.drawImage(scaledImage, 0, 0, scaledImage.width, scaledImage.height);
                this.image = canvas.toDataURL();
            }.bind(_this);
        }, function (err) { });
    };
    // scales the image by (float) scale < 1
    // returns a canvas containing the scaled image.
    UpdateUserPage.prototype.downScaleImage = function (img, scale) {
        var imgCV = document.createElement('canvas');
        imgCV.width = img.width;
        imgCV.height = img.height;
        var imgCtx = imgCV.getContext('2d');
        imgCtx.drawImage(img, 0, 0);
        return this.downScaleCanvas(imgCV, scale);
    };
    // scales the canvas by (float) scale < 1
    // returns a new canvas containing the scaled image.
    UpdateUserPage.prototype.downScaleCanvas = function (cv, scale) {
        if (!(scale < 1) || !(scale > 0))
            throw ('scale must be a positive number <1 ');
        scale = this.normaliseScale(scale);
        var sqScale = scale * scale; // square scale =  area of a source pixel within target
        var sw = cv.width; // source image width
        var sh = cv.height; // source image height
        var tw = Math.floor(sw * scale); // target image width
        var th = Math.floor(sh * scale); // target image height
        var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
        var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
        var tX = 0, tY = 0; // rounded tx, ty
        var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
        // weight is weight of current source point within target.
        // next weight is weight of current source point within next target's point.
        var crossX = false; // does scaled px cross its current px right border ?
        var crossY = false; // does scaled px cross its current px bottom border ?
        var sBuffer = cv.getContext('2d').
            getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
        var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
        var sR = 0, sG = 0, sB = 0; // source's current point r,g,b
        for (sy = 0; sy < sh; sy++) {
            ty = sy * scale; // y src position within target
            tY = 0 | ty; // rounded : target pixel's y
            yIndex = 3 * tY * tw; // line index within target array
            crossY = (tY !== (0 | (ty + scale)));
            if (crossY) {
                wy = (tY + 1 - ty); // weight of point within target pixel
                nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
            }
            for (sx = 0; sx < sw; sx++, sIndex += 4) {
                tx = sx * scale; // x src position within target
                tX = 0 | tx; // rounded : target pixel's x
                tIndex = yIndex + tX * 3; // target pixel index within target array
                crossX = (tX !== (0 | (tx + scale)));
                if (crossX) {
                    wx = (tX + 1 - tx); // weight of point within target pixel
                    nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
                }
                sR = sBuffer[sIndex]; // retrieving r,g,b for curr src px.
                sG = sBuffer[sIndex + 1];
                sB = sBuffer[sIndex + 2];
                if (!crossX && !crossY) {
                    // just add components weighted by squared scale.
                    tBuffer[tIndex] += sR * sqScale;
                    tBuffer[tIndex + 1] += sG * sqScale;
                    tBuffer[tIndex + 2] += sB * sqScale;
                }
                else if (crossX && !crossY) {
                    w = wx * scale;
                    // add weighted component for current px
                    tBuffer[tIndex] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // add weighted component for next (tX+1) px
                    nw = nwx * scale;
                    tBuffer[tIndex + 3] += sR * nw;
                    tBuffer[tIndex + 4] += sG * nw;
                    tBuffer[tIndex + 5] += sB * nw;
                }
                else if (!crossX && crossY) {
                    w = wy * scale;
                    // add weighted component for current px
                    tBuffer[tIndex] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // add weighted component for next (tY+1) px
                    nw = nwy * scale;
                    tBuffer[tIndex + 3 * tw] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                }
                else {
                    // add weighted component for current px
                    w = wx * wy;
                    tBuffer[tIndex] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // for tX + 1; tY px
                    nw = nwx * wy;
                    tBuffer[tIndex + 3] += sR * nw;
                    tBuffer[tIndex + 4] += sG * nw;
                    tBuffer[tIndex + 5] += sB * nw;
                    // for tX ; tY + 1 px
                    nw = wx * nwy;
                    tBuffer[tIndex + 3 * tw] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                    // for tX + 1 ; tY +1 px
                    nw = nwx * nwy;
                    tBuffer[tIndex + 3 * tw + 3] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 4] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 5] += sB * nw;
                }
            } // end for sx
        } // end for sy
        // create result canvas
        var resCV = document.createElement('canvas');
        resCV.width = tw;
        resCV.height = th;
        var resCtx = resCV.getContext('2d');
        var imgRes = resCtx.getImageData(0, 0, tw, th);
        var tByteBuffer = imgRes.data;
        // convert float32 array into a UInt8Clamped Array
        var pxIndex = 0; //
        for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
            tByteBuffer[tIndex] = 0 | (tBuffer[sIndex]);
            tByteBuffer[tIndex + 1] = 0 | (tBuffer[sIndex + 1]);
            tByteBuffer[tIndex + 2] = 0 | (tBuffer[sIndex + 2]);
            tByteBuffer[tIndex + 3] = 255;
        }
        // writing result to canvas.
        resCtx.putImageData(imgRes, 0, 0);
        return resCV;
    };
    UpdateUserPage.prototype.log2 = function (v) {
        // taken from http://graphics.stanford.edu/~seander/bithacks.html
        var b = [0x2, 0xC, 0xF0, 0xFF00, 0xFFFF0000];
        var S = [1, 2, 4, 8, 16];
        var i = 0, r = 0;
        for (i = 4; i >= 0; i--) {
            if (v & b[i]) {
                v >>= S[i];
                r |= S[i];
            }
        }
        return r;
    };
    // normalize a scale <1 to avoid some rounding issue with js numbers
    UpdateUserPage.prototype.normaliseScale = function (s) {
        if (s > 1)
            throw ('s must be <1');
        s = 0 | (1 / s);
        var l = this.log2(s);
        var mask = 1 << l;
        var accuracy = 4;
        while (accuracy && l) {
            l--;
            mask |= 1 << l;
            accuracy--;
        }
        return 1 / (s & mask);
    };
    UpdateUserPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.CAMERA,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: this.camera.Direction.BACK,
            targetWidth: 170,
            targetHeight: 170
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageTaken = true;
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.image = base64Image;
        }, function (err) {
            // Handle error
        });
    };
    return UpdateUserPage;
}());
UpdateUserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-update',template:/*ion-inline-start:"c:\xampp\htdocs\intro_app\ionic\src\pages\user\user_update.html"*/'<ion-header>\n\n  <header class = "header-clean" [options]="{backEnabled:true, showTab:false, showHeader:true, logoEnabled:false}"></header>\n\n</ion-header>\n\n<ion-content class="background-1">\n\n  <content class="form-style" >\n\n    <ion-row>\n\n      <ion-col offset-2 col-8 class="center">\n\n        <img (click) = "makeOptions()" src="{{image}}">\n\n        <span (click) = "makeOptions()" *ngIf="image==null">{{\'TAKE_PHOTO\' | translate}}</span>\n\n      </ion-col>\n\n    </ion-row>\n\n    <form [formGroup]="updateForm">\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <ion-row>\n\n            <ion-col offset-1 col-10 class="center">\n\n              <span class="error center" *ngIf="errorUpdate!=\'\'" [innerHTML]="errorUpdate"></span>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <ion-row>\n\n            <ion-col offset-1 col-10 class="center">\n\n              <ion-item>\n\n                <ion-label floating class="small-label" floating primary>{{\'EMAIL\' | translate}}</ion-label>\n\n                <ion-input formControlName="email" md-input type="text"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <ion-row>\n\n            <ion-col offset-1 col-10 class="center">\n\n              <ion-item>\n\n                <ion-label class="small-label" floating primary>{{\'NAME\' | translate}}</ion-label>\n\n                <ion-input md-input formControlName="name" type="text"></ion-input>\n\n              </ion-item>\n\n              <span class="error" *ngIf="ready && !updateForm.controls.name.valid  && (updateForm.controls.name.dirty || submitted)">\n\n                {{\'INVALID_NAME\' | translate}}\n\n              </span>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <ion-row>\n\n            <ion-col offset-1 col-10 class="center">\n\n              <ion-item>\n\n                <ion-label floating class="small-label" floating primary>{{\'LAST_NAME\' | translate}}</ion-label>\n\n                <ion-input md-input formControlName="last_name" type="text"></ion-input>\n\n              </ion-item>\n\n              <span class="error" *ngIf="ready && !updateForm.controls.last_name.valid  && (updateForm.controls.last_name.dirty || submitted)">\n\n                {{\'INVALID_LAST_NAME\' | translate}}\n\n              </span>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <ion-row>\n\n            <ion-col offset-1 col-10 class="center">\n\n              <ion-item>\n\n                <ion-label floating class="small-label" floating primary>{{\'PHONE_NUMBERS\' | translate}}</ion-label>\n\n                <ion-input md-input formControlName="number_phones" type="text"></ion-input>\n\n              </ion-item>\n\n              <span class="error" *ngIf="ready && !updateForm.controls.number_phones.valid  && (updateForm.controls.number_phones.dirty || submitted)">\n\n                {{\'INVALID_NUMBER_PHONES\' | translate}}\n\n              </span>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <ion-row>\n\n            <ion-col offset-1 col-10 class="center">\n\n              <ion-item>\n\n                <ion-label floating class="small-label" floating primary>{{\'PASSWORD\' | translate}}</ion-label>\n\n                <ion-input md-input formControlName="password" type="password"></ion-input>\n\n              </ion-item>\n\n              <span class="error" *ngIf="ready && !updateForm.controls.password.valid  && (updateForm.controls.password.dirty || submitted)">\n\n                {{\'INVALID_PASSWORD\' | translate}}\n\n              </span>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <ion-row>\n\n            <ion-col offset-1 col-10 class="center">\n\n              <ion-item>\n\n                <ion-label floating class="small-label" floating primary>{{\'CONFIRM_PASSWORD\' | translate}}</ion-label>\n\n                <ion-input md-input formControlName="confirm_password" type="password"></ion-input>\n\n              </ion-item>\n\n              <span class="error" *ngIf="ready && !updateForm.controls.confirm_password.valid  && (updateForm.controls.confirm_password.dirty || submitted)">\n\n                {{\'INVALID_CONFIRM_PASSWORD\' | translate}}\n\n              </span>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">\n\n          <button outline ion-button class="large-red margin-top" (click)="update()" [disabled]="!updateForm.valid">{{\'UPDATE\' | translate}}</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col offset-1 col-10 class="center">&nbsp;</ion-col>\n\n      </ion-row>\n\n    </form>\n\n  </content>\n\n</ion-content>\n\n'/*ion-inline-end:"c:\xampp\htdocs\intro_app\ionic\src\pages\user\user_update.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5__lib_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_7__lib_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_6__lib_messages_service__["a" /* MessageService */]])
], UpdateUserPage);

//# sourceMappingURL=user_update.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(241);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export createTranslateLoader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_http_loader__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_globalization__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_linkedin__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_local_notifications__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_date_picker__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lib_config_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__lib_messages_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__lib_utils_service__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__lib_navigation_service__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__lib_http_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__lib_session_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__app_component__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_tabs_tabs_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_header_header__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_dashboard_home__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_tabs_tabs__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_login_login__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_user_user_register__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_user_user_setting__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_user_user_update__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_22__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_24__pages_header_header__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_27__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_user_user_register__["a" /* RegisterUserPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_user_user_setting__["a" /* SettingUserPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_user_user_update__["a" /* UpdateUserPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_dashboard_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_22__app_component__["a" /* MyApp */], {
                tabsPlacement: 'bottom',
                scrollAssist: true,
                autoFocusAssist: true,
                scrollPadding: true,
                platforms: {
                    android: { tabsPlacement: 'bottom' },
                    ios: { tabsPlacement: 'bottom' },
                    windows: { tabsPlacement: 'bottom' }
                }
            }),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]]
                }
            }),
            __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_22__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_24__pages_header_header__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_27__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_user_user_register__["a" /* RegisterUserPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_user_user_setting__["a" /* SettingUserPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_user_user_update__["a" /* UpdateUserPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_dashboard_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__lib_config_service__["a" /* ConfigService */],
            __WEBPACK_IMPORTED_MODULE_17__lib_messages_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_23__pages_tabs_tabs_service__["a" /* TabService */],
            __WEBPACK_IMPORTED_MODULE_18__lib_utils_service__["a" /* UtilService */],
            __WEBPACK_IMPORTED_MODULE_19__lib_navigation_service__["a" /* NavigationService */],
            __WEBPACK_IMPORTED_MODULE_20__lib_http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_21__lib_session_service__["a" /* SessionService */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_globalization__["a" /* Globalization */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_linkedin__["a" /* LinkedIn */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_date_picker__["a" /* DatePicker */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//para el translate
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_2__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageService = (function () {
    function MessageService(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.isLoading = false;
    }
    MessageService.prototype.showMessage = function (params) {
        var config = {
            spinner: 'crescent',
            content: ''
        };
        if (params.content !== undefined)
            config['content'] = params.content;
        if (params.duration !== undefined)
            config['duration'] = params.duration;
        this.closeMessage();
        this.loading = this.loadingCtrl.create(config);
        if (params.onDisMiss !== undefined && typeof params.onDisMiss == 'function')
            this.loading.onDidDismiss = params.onDismiss;
        this.loading.present();
        this.isLoading = true;
    };
    MessageService.prototype.closeMessage = function () {
        if (this.isLoading) {
            this.loading.dismiss();
            this.isLoading = false;
        }
    };
    return MessageService;
}());
MessageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], MessageService);

//# sourceMappingURL=messages.service.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONFIG; });
var CONFIG = {
    ROUTES: {
        DOMAIN_API: 'http://192.168.1.126/intro_app/api/public',
        FOLDER_IMAGES: 'http://192.168.1.126/intro_app/api/public/images',
    },
    PROFILE_IMAGE: 'assets/images/profile-picture.png',
    LOGOS: {
        BIGGER: 'assets/logos/intro_bigger.png',
        SMALL: 'assets/logos/intro_small.png',
        FACEBOOK_BUTTON: 'assets/logos/facebook_button.png',
    },
    ICONS: {},
    GENERAL: {
        QUANTITY: 5,
        LANGUAGE: 'en',
        FACEBOOK_ID: '1456822774399383',
        GOOGLE_APIKEY: 'AIzaSyBz_QsRxbAr9SOf0djzPQSaK7HAfHs9o0I',
        CURRENT_PLAY_LIST: 'PLpOqH6AE0tNiPHU2BCm_ei3C2BmjN9IGt',
        CHANNEL: 'UCsfWVdGe5Gggv9U2YqXo5Dw',
        MAX_LETTERS: {
            titles: 45,
            descriptions: 50
        },
    }
};
//# sourceMappingURL=config.data.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavigationService = (function () {
    function NavigationService() {
    }
    NavigationService.prototype.navigateExternal = function (route) {
        if (typeof route == 'object' && route.url !== undefined && route.url !== null) {
            if (route.target !== undefined && route.target !== null && route.target !== 'self')
                window.open(route.url);
            else
                document.location.href = route.url;
        }
    };
    return NavigationService;
}());
NavigationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], NavigationService);

//# sourceMappingURL=navigation.service.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_globalization__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_user_user_update__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_config_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_session_service__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, translateService, globalization, configService, sessionService, app, menuCtrl) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translateService = translateService;
        this.globalization = globalization;
        this.configService = configService;
        this.sessionService = sessionService;
        this.app = app;
        this.menuCtrl = menuCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.platform.ready().then(function () {
            //Language
            if (_this.platform.is('cordova')) {
                _this.globalization.getPreferredLanguage().then(function (result) {
                    var language = result.value.split('-')[0]; //evitamos cosas como -US
                    _this.translateService.setDefaultLang(language);
                    _this.runDevice();
                });
            }
            else {
                // You're testing in browser, do nothing or mock the plugins' behaviour.
                //
                // var url: string = 'assets/mock-images/image.jpg';
                _this.translateService.setDefaultLang(_this.configService.getLanguage());
                _this.runDevice();
            }
        });
    }
    MyApp.prototype.gotoUser = function () {
        this.menuCtrl.close();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__pages_user_user_update__["a" /* UpdateUserPage */]);
    };
    MyApp.prototype.closeSession = function () {
        this.menuCtrl.close();
        this.sessionService.closeSession();
        //console.log(this.app.getRootNav());
        this.app.getRootNav().popToRoot();
    };
    MyApp.prototype.runDevice = function () {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        //this.statusBar.styleDefault();
        this.statusBar.styleBlackOpaque();
        this.splashScreen.hide();
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('rootNavController'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"c:\xampp\htdocs\intro_app\ionic\src\app\app.html"*/'<ion-menu side="right" [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar color="secondary">\n\n      <ion-title>{{\'MENU\' | translate}}</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <ion-list>\n\n      <button ion-item (click)="closeSession()">{{\'LOGOUT\' | translate}}</button>\n\n    </ion-list>\n\n\n\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav #content [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"c:\xampp\htdocs\intro_app\ionic\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_globalization__["a" /* Globalization */], __WEBPACK_IMPORTED_MODULE_8__lib_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_9__lib_session_service__["a" /* SessionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_config_service__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeaderComponent = (function () {
    function HeaderComponent(tabService, configService, app, menuCtrl, platform) {
        this.tabService = tabService;
        this.configService = configService;
        this.app = app;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.options = { showTab: null, backEnabled: null, showHeader: null, logoEnabled: null, sectionEnabled: null, menuEnabled: null };
        this.menuIcon = '';
        this.initElementsByVersion();
    }
    HeaderComponent.prototype.ngOnInit = function () { };
    HeaderComponent.prototype.initElementsByVersion = function () {
        if (this.platform.is('ios')) {
            this.menuIcon = 'ios-information-circle-outline';
        }
        else {
            this.menuIcon = 'md-more';
        }
    };
    HeaderComponent.prototype.setTab = function () {
        if (this.tabService.getShowTab() !== this.options['showTab']) {
            if (this.options !== undefined && this.options['showTab'] !== undefined)
                this.tabService.setShowTab(this.options['showTab']);
            else
                this.tabService.setShowTab(true); //cada vez que se cambie de pagina y no se indico showtab, conviene poerlo true para que lo ponga visible
        }
    };
    HeaderComponent.prototype.openUserMenu = function (event) {
        this.menuCtrl.open();
    };
    HeaderComponent.prototype.ngDoCheck = function () {
        this.setTab();
    };
    HeaderComponent.prototype.ngAfterContentInit = function () {
        //  console.log("ngAfterContentInit");
    };
    HeaderComponent.prototype.ngAfterContentChecked = function () {
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        //console.log("ngAfterViewInit");
    };
    HeaderComponent.prototype.ngAfterViewChecked = function () {
        //console.log("ngAfterViewChecked");
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        //  console.log("ngOnDestroy");
    };
    return HeaderComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "options", void 0);
HeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'header',template:/*ion-inline-start:"c:\xampp\htdocs\intro_app\ionic\src\pages\header\header.html"*/'<ion-toolbar *ngIf="options.showHeader!==false">\n\n  <ion-buttons  left>\n\n    <div *ngIf="!options.backEnabled" class="empty-back-button"></div>\n\n    <ion-navbar *ngIf="options.backEnabled"></ion-navbar>\n\n  </ion-buttons>\n\n\n\n  <ion-title *ngIf="!(options.sectionEnabled==false)" class="section">\n\n    {{configService.getSection()}}\n\n  </ion-title>\n\n\n\n  <ion-buttons end>\n\n    <button ion-button icon-only (click)="openUserMenu($event)">\n\n      <ion-icon *ngIf="options.menuEnabled" name="{{menuIcon}}"></ion-icon>\n\n    </button>\n\n  </ion-buttons>\n\n</ion-toolbar>\n\n'/*ion-inline-end:"c:\xampp\htdocs\intro_app\ionic\src\pages\header\header.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__tabs_tabs_service__["a" /* TabService */], __WEBPACK_IMPORTED_MODULE_3__lib_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
], HeaderComponent);

//# sourceMappingURL=header.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
this.httpService.get({
    url:'http://localhost/fasttrack/api/public/login/token',
    success: function(res){
        console.log(res);
        this.myData = res;
    },
    context:this
});

this.httpService.delete({
    url:'http://localhost/fasttrack/api/public/payment-methods',
    urlParams:[
        8,
        {id:4}
    ],
    urlAltParams:{
        id:4
    },
    success: function(res){
        console.log(res);
    },
    context:this
});

this.httpService.put({
    url:'http://localhost/fasttrack/api/public/destino',
    urlParams:[
        4
    ],
    inputs:{uno:'1',dos:'2'},
    success: function(res){
        console.log(res);
    },
    context:this,
    files:this.files //opcional
});


this.httpService.post({
    url:'http://localhost/fasttrack/api/public/destino',
    urlParams:[
        4
    ],
    inputs:data,
    success: function(res){
        console.log(res);
    },
    context:this,
    files:this.files //opcional
});
*/
var HttpService = (function () {
    function HttpService(http, configService, storage, messages) {
        this.http = http;
        this.configService = configService;
        this.storage = storage;
        this.messages = messages;
        this.context = this;
    }
    HttpService.prototype.setParams = function (params) {
        this.success = params.success;
        var isExternal = params.url.indexOf("http");
        if (isExternal === -1)
            this.url = this.configService.getDomainAPI() + '/' + params.url;
        else
            this.url = params.url;
        this.error = function () { };
        this.finally = function () { };
        if (params.error !== undefined && typeof params.error == 'function')
            this.error = params.error;
        if (params.app !== undefined)
            this.app = params.app;
        if (params.finally !== undefined && typeof params.finally == 'function')
            this.finally = params.finally;
        if (params.context !== undefined)
            this.context = params.context;
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.search = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
        if (this.getTokenProvider() !== '' && isExternal === -1) {
            this.headers.append('Authorization', ' Bearer ' + this.getTokenProvider());
        }
        this.options.headers = this.headers;
        if (params.urlParams !== undefined && params.urlParams instanceof Array) {
            var max_length = params.urlParams.length;
            for (var i = 0; i < max_length; i++) {
                var current = params.urlParams[i];
                if (typeof current == 'object') {
                    for (var key in current) {
                        if (key !== '')
                            this.url = this.url + '/' + key + '/' + current[key];
                        else
                            this.url = this.url + '/' + current[key];
                    }
                }
                else {
                    this.url = this.url + '/' + current;
                }
                this.options.search = this.search;
            }
        }
        if (params.urlAltParams !== undefined && typeof params.urlAltParams == 'object') {
            for (var key in params.urlAltParams) {
                this.search.set(key, params.urlAltParams[key]);
            }
            this.options.search = this.search;
        }
    };
    HttpService.prototype.get = function (params) {
        if (typeof params == 'object' && params.url !== undefined && typeof params.url == 'string' && params.url !== '' && params.success !== undefined && typeof params.success == 'function') {
            this.storage.get('token').then(function (token) {
                this.setTokenProvider(token);
                this.setParams(params);
                this.sendGet();
            }.bind(this));
        }
    };
    HttpService.prototype.sendGet = function () {
        this.http.get(this.url, this.options)
            .map(function (response) { return response.json(); })
            .subscribe(this.successCallBack.bind({
            success: this.success.bind(this.context)
        }), this.errorCallBack.bind({
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages
        }), this.finallyCallBack.bind({
            finally: this.finally
        }));
    };
    HttpService.prototype.post = function (params) {
        if (typeof params == 'object' && params.url !== undefined && typeof params.url == 'string' && params.url !== '' && params.success !== undefined && typeof params.success == 'function') {
            this.storage.get('token').then(function (token) {
                this.setTokenProvider(token);
                this.setParams(params);
                var data = new FormData();
                if (params.inputs !== undefined && typeof params.inputs == 'object') {
                    for (var key in params.inputs) {
                        data.append(key, params.inputs[key]);
                    }
                }
                if (params.files !== undefined && typeof params.files == 'object') {
                    var maxFiles = Object.keys(params.files).length;
                    var countFiles = 0;
                    for (var key in params.files) {
                        //hay que evaluar si es dataurl o es un binario de una vez
                        data.append(key, this.dataURItoBlob(params.files[key]));
                        countFiles++;
                        if (maxFiles === countFiles)
                            this.sendPost(data);
                    }
                }
                else {
                    this.sendPost(data);
                }
            }.bind(this));
        }
    };
    HttpService.prototype.sendPost = function (data) {
        this.http.post(this.url, data, this.options)
            .map(function (response) { return response.json(); })
            .subscribe(this.successCallBack.bind({
            success: this.success.bind(this.context)
        }), this.errorCallBack.bind({
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages
        }), this.finallyCallBack.bind({
            finally: this.finally
        }));
    };
    HttpService.prototype.put = function (params) {
        if (typeof params == 'object' && params.url !== undefined && typeof params.url == 'string' && params.url !== '' && params.success !== undefined && typeof params.success == 'function') {
            this.storage.get('token').then(function (token) {
                this.setTokenProvider(token);
                this.setParams(params);
                if (params.files !== undefined && typeof params.files == 'object') {
                    var data = new FormData();
                    if (params.inputs !== undefined && typeof params.inputs == 'object') {
                        for (var key in params.inputs) {
                            data.append(key, params.inputs[key]);
                        }
                    }
                    var maxFiles = Object.keys(params.files).length;
                    var countFiles = 0;
                    for (var key in params.files) {
                        data.append(key, this.dataURItoBlob(params.files[key]));
                        countFiles++;
                        if (maxFiles === countFiles)
                            this.sendFilePut(data);
                    }
                }
                else {
                    var data = {};
                    if (params.inputs !== undefined && typeof params.inputs == 'object')
                        data = params.inputs;
                    this.sendPut(data);
                }
            }.bind(this));
        }
    };
    HttpService.prototype.sendPut = function (data) {
        this.http.put(this.url, data, this.options)
            .map(function (response) { return response.json(); })
            .subscribe(this.successCallBack.bind({
            success: this.success.bind(this.context)
        }), this.errorCallBack.bind({
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages
        }), this.finallyCallBack.bind({
            finally: this.finally
        }));
    };
    HttpService.prototype.sendFilePut = function (data) {
        //NOTA EN CHROME Y ALGUNOS NAVEGADORES NO SIRVE PUT, POR ESO HACEMOS UN HACK Y USAMOS POST
        data.append('_method', 'PUT');
        this.http.post(this.url, data, this.options)
            .map(function (response) { return response.json(); })
            .subscribe(this.successCallBack.bind({
            success: this.success.bind(this.context)
        }), this.errorCallBack.bind({
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages
        }), this.finallyCallBack.bind({
            finally: this.finally
        }));
    };
    HttpService.prototype.delete = function (params) {
        if (typeof params == 'object' && params.url !== undefined && typeof params.url == 'string' && params.url !== '' && params.success !== undefined && typeof params.success == 'function') {
            this.storage.get('token').then(function (token) {
                this.setTokenProvider(token);
                this.setParams(params);
                this.sendDelete();
            }.bind(this));
        }
    };
    HttpService.prototype.sendDelete = function () {
        this.http.delete(this.url, this.options)
            .map(function (response) { return response.json(); })
            .subscribe(this.successCallBack.bind({
            success: this.success.bind(this.context)
        }), this.errorCallBack.bind({
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages
        }), this.finallyCallBack.bind({
            finally: this.finally
        }));
    };
    //esta funcion e spara cuando la imagen que se tiene se accede es desde la url, no base 64
    HttpService.prototype.prepareFile = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = resolve;
            reader.readAsDataURL(file);
        });
    };
    //para convertir el archivo a blob, requiere que sea una cadena codificada, anidad con  el mime, DATAURI  base64
    HttpService.prototype.dataURItoBlob = function (dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var bb = new Blob([ab], { "type": mimeString });
        return bb;
    };
    HttpService.prototype.successCallBack = function (response) {
        this.success(response);
    };
    HttpService.prototype.errorCallBack = function (error) {
        console.log(error);
        var errorDetail;
        try {
            errorDetail = JSON.parse(error._body);
        }
        catch (e) { }
        if ((errorDetail !== null && errorDetail !== undefined && (errorDetail.status === 'error' && errorDetail.data.type === 'session')) || errorDetail === undefined) {
            this.storage.remove('token');
            this.messages.closeMessage();
            this.app.getRootNav().popToRoot();
        }
        this.error(error);
    };
    HttpService.prototype.finallyCallBack = function () {
        this.finally();
    };
    HttpService.prototype.setTokenProvider = function (token) {
        this.tokenProvider = token;
    };
    HttpService.prototype.getTokenProvider = function () {
        if (this.tokenProvider === undefined || this.tokenProvider === null || this.tokenProvider === '')
            return '';
        return this.tokenProvider;
    };
    return HttpService;
}());
HttpService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__messages_service__["a" /* MessageService */]])
], HttpService);

//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__messages_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_linkedin__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SessionService = (function () {
    function SessionService(storage, facebook, googlePlus, linkedin, messages) {
        this.storage = storage;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.linkedin = linkedin;
        this.messages = messages;
    }
    //this.storage.set('name', 'Maddddx');
    //this.storage.remove('name');
    //this.storage.get('name');
    //verificamos si hay token para que no entremosen esta pantalla
    SessionService.prototype.getSessionStatus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //verificamos si hay sesion por medio de la existencia del token en local storage
            _this.storage.get('token').then(function (data) {
                if (data !== null && data !== undefined && data !== '') {
                    //ahora vamos  a analizar el tipo de sesion, o es una sesiónnormal o es con facebook, tiene mecanismo sde control distintos
                    this.storage.get('mode_facebook').then(function (data) {
                        var _this = this;
                        if (data !== null && data !== undefined && data !== false) {
                            //una sesión usando facebook, vemos si hubo sesión
                            this.facebook.getLoginStatus()
                                .then(function (rta) {
                                if (rta.status === 'connected') {
                                    resolve('facebook'); // hay sesion en la app y en facebook
                                }
                                else {
                                    //hubo sesión previa por facebook (mode_facebook no los indica) pero ya no lo está enconces debemos quitar el token y todas las variables del storage
                                    _this.storage.remove('token');
                                    _this.storage.remove('mode_facebook');
                                    _this.storage.remove('mode_linkedin');
                                    _this.storage.remove('mode_google_plus');
                                    resolve(false); //no hay sesion facebook, ya no hay variables de sesion de la app
                                }
                            }, function (error) {
                                console.error(error); //cuando se cancela
                                resolve(false);
                            })
                                .catch(function (error) {
                                console.error(error); //cuando se cancela
                                resolve(false);
                            });
                        }
                        else {
                            //verificamos linkedin
                            this.storage.get('mode_linkedin').then(function (data) {
                                var _this = this;
                                if (data !== null && data !== undefined && data !== false) {
                                    //una sesión usando linkedin, vemos si hubo sesión
                                    this.linkedin.getActiveSession()
                                        .then(function (session) {
                                        if (session) {
                                            resolve('linkedin'); // hay sesion en la app y en linkedin
                                        }
                                        else {
                                            //hubo sesión previa por facebook (mode_facebook no los indica) pero ya no lo está enconces debemos quitar el token y todas las variables del storage
                                            _this.storage.remove('token');
                                            _this.storage.remove('mode_facebook');
                                            _this.storage.remove('mode_linkedin');
                                            _this.storage.remove('mode_google_plus');
                                            resolve(false); //no hay sesion facebook, ya no hay variables de sesion de la app
                                        }
                                    }, function (error) {
                                        console.error(error); //cuando se cancela
                                        resolve(false);
                                    })
                                        .catch(function (error) {
                                        console.error(error); //cuando se cancela
                                        resolve(false);
                                    });
                                }
                                else {
                                    //verificamos google plus
                                    this.storage.get('mode_google_plus').then(function (data) {
                                        console.log("googleplus");
                                        console.log(data);
                                        if (data !== null && data !== undefined && data !== false) {
                                            //una sesión usando facebook, vemos si hubo sesión
                                            this.googlePlus.login({ 'scopes': 'profile email' })
                                                .then(function (result) {
                                                resolve('google_plus'); // hay sesion en la app y en google_plus
                                            }, function (error) {
                                                console.error(error); //cuando se cancela
                                                this.storage.remove('token');
                                                this.storage.remove('mode_facebook');
                                                this.storage.remove('mode_linkedin');
                                                this.storage.remove('mode_google_plus');
                                                resolve(false);
                                            }.bind(this))
                                                .catch(function (error) {
                                                console.error(error); //cuando se cancela
                                                resolve(false);
                                            });
                                        }
                                        else {
                                            //una sesión tradicional
                                            resolve('normal'); // sesion tradicional
                                        }
                                    }.bind(this));
                                }
                            }.bind(this));
                        }
                    }.bind(this));
                }
                else {
                    resolve(false); // no hay sesion en la app
                }
            }.bind(_this));
        });
    };
    SessionService.prototype.loginByFacebook = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.facebook.login(['public_profile', 'email'])
                .then(function (rta) {
                console.log(rta);
                if (rta.status == 'connected') {
                    _this.initSession({
                        'token': '',
                        'mode_facebook': true,
                        'mode_linkedin': false,
                        'mode_google_plus': false
                    });
                    resolve('normal');
                }
                ;
            })
                .catch(function (error) {
                console.error(error); //cuando se cancela
                resolve(false);
            });
        });
    };
    SessionService.prototype.loginByLinkedin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.linkedin.login(['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'], false)
                .then(function (result) {
                console.log(result);
                _this.initSession({
                    'token': '',
                    'mode_facebook': false,
                    'mode_linkedin': true,
                    'mode_google_plus': false
                });
                resolve('normal');
            })
                .catch(function (error) {
                console.error(error); //cuando se cancela
                resolve(false);
            });
        });
    };
    SessionService.prototype.loginByGooglePlus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.googlePlus.login({ 'scopes': 'profile email' })
                .then(function (result) {
                _this.initSession({
                    'token': '',
                    'mode_facebook': false,
                    'mode_linkedin': false,
                    'mode_google_plus': true
                });
                resolve(result);
            })
                .catch(function (error) {
                console.error(error); //cuando se cancela
                resolve(false);
            });
        });
    };
    SessionService.prototype.initSession = function (params) {
        this.storage.set('token', params.token);
        this.storage.set('mode_facebook', params.mode_facebook);
        this.storage.set('mode_linkedin', params.mode_linkedin);
        this.storage.set('mode_google_plus', params.mode_google_plus);
    };
    SessionService.prototype.closeSession = function () {
        this.messages.closeMessage();
        this.storage.remove('token');
        this.storage.remove('mode_facebook');
        this.storage.remove('mode_linkedin');
        this.storage.remove('mode_google_plus');
        this.facebookLogOut();
        this.linkedinLogOut();
        this.googlePlusLogOut();
    };
    SessionService.prototype.facebookLogOut = function () {
        var _this = this;
        this.facebook.getLoginStatus()
            .then(function (rta) {
            console.log(rta.status);
            if (rta.status === 'connected')
                _this.facebook.logout();
        }, function (error) {
            console.error(error);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    SessionService.prototype.linkedinLogOut = function () {
        var _this = this;
        this.linkedin.getActiveSession()
            .then(function (session) {
            console.log('linkedin ', session);
            if (session)
                _this.linkedin.logout();
        }, function (error) {
            console.error(error);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    SessionService.prototype.googlePlusLogOut = function () {
        this.googlePlus.logout()
            .then(function (success) {
            console.log('googlePlus ', success);
        }, function (error) {
            console.error(error);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    return SessionService;
}());
SessionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_linkedin__["a" /* LinkedIn */], __WEBPACK_IMPORTED_MODULE_2__messages_service__["a" /* MessageService */]])
], SessionService);

//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TabService = (function () {
    function TabService() {
        this.tabsMenu = { 'HOME': 'HOME', 'CONTACTS': 'CONTACTS', 'INTROS': 'INTROS', 'MESSAGES': 'MESSAGES', 'SETTINGS': 'SETTINGS' };
    }
    TabService.prototype.getSection = function (section) {
        if (this.tabsMenu[section] !== undefined)
            return this.tabsMenu[section];
        else
            return '';
    };
    TabService.prototype.setMedia = function (section, value) {
        if (this.tabsMenu[section] !== undefined)
            this.tabsMenu[section] = value;
    };
    TabService.prototype.getShowTab = function () {
        return this.showTab;
    };
    TabService.prototype.setShowTab = function (value) {
        this.showTab = value;
        this.changeShowBar();
    };
    TabService.prototype.changeShowBar = function () {
        var tabBarElement = document.querySelector('.tabbar');
        if (tabBarElement !== undefined && tabBarElement !== null) {
            tabBarElement.className = tabBarElement.className.replace(' hide', ''); //borramos las clases para evitar una anidacion y asegurar que solo haya 1 show o 1 hide y no ambos a la vez
            if (!this.getShowTab()) {
                tabBarElement.className = tabBarElement.className + ' hide';
            }
        }
    };
    return TabService;
}());
TabService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], TabService);

//# sourceMappingURL=tabs.service.js.map

/***/ })

},[226]);
//# sourceMappingURL=main.js.map