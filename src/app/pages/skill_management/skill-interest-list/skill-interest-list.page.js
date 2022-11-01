"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var moment = require("moment");
var select_column_popover_page_1 = require("../../../my-component/select-column-popover/select-column-popover.page");
var environment_1 = require("../../../../environments/environment");
/* tslint:disable */
var SkillInterestListPage = /** @class */ (function () {
    function SkillInterestListPage(plt, pagerService, popoverController, alertController, modalController, storage, router, http, menuCtrl, commonUtils // common functionlity come here
    ) {
        this.plt = plt;
        this.pagerService = pagerService;
        this.popoverController = popoverController;
        this.alertController = alertController;
        this.modalController = modalController;
        this.storage = storage;
        this.router = router;
        this.http = http;
        this.menuCtrl = menuCtrl;
        this.commonUtils = commonUtils;
        this.main_url = environment_1.environment.apiUrl;
        this.file_url = environment_1.environment.fileUrl;
        // variable declartion section
        this.model = {};
        this.isListLoading = false;
        this.page = 1;
        this.noDataFound = true;
        // ......check uncheck start....
        this.itemcheckClick = false;
        this.checkedList = [];
        // api parms
        this.api_parms = {};
        this.urlIdentifire = '';
        // pager object
        this.pager = {};
        // -------- pagination -------------
        this.pageNo = 1;
        // pagination end
        // ----------- table header sorting start ----------------
        this.sortColumnName = '';
        this.sortOrderName = '';
        // popover select table header column end
        // ------- display record start-------
        this.displayRecord = this.commonUtils.displayRecord;
        this.displayRecords = this.commonUtils.displayRecords;
        // getlist data fetch end
        // ------------searchbar start------------------
        this.searchTerm = '';
        // searchbar end
        // ------------cherecter search start------------------
        this.cherecterSearchTerm = '';
        // cherecter search end
        //------- advance search -------
        this.advanceSearchParms = '';
        // advance search end
        // -----datepicker start------
        this.curentDate = new Date();
        this.datePickerObj = {
            dateFormat: 'DD/MM/YYYY',
            closeOnSelect: true
        };
        // custom refresh page end
        // ---------------- Click Delete Item start ---------------------
        this.deleteLodershow = false;
        this.alldeleteLoaderShow = false;
    }
    // ------ init function call start -------
    SkillInterestListPage.prototype.commonFunction = function () {
        var _this = this;
        // get active url name
        this.current_url_path_name = this.router.url.split('/')[1] + 'ColumnSelect';
        this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
        // table header data url name
        this.headerUrlapi = 'skill_degree/header';
        // table list data url name
        this.listing_url = 'skill_degree/return_index';
        this.onHeaderData(this.headerUrlapi);
        // getlist data url name
        // this.getlist('skill_degree/getlist');
        /* this.api_parms = {
          type:'gggggg',
          id:'5'
        } */
        this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);
        //(api_url, display_record, page, apiParms, search, cherecterSearch, orderBy, order, advanceSearch, identifire)
        var curentDate = new Date();
        this.setStartdate = moment(curentDate).format('DD/MM/YYYY');
        // menu show
        this.menuCtrl.enable(true);
        setInterval(function () {
            _this.curentDate = new Date();
        }, 1);
    };
    // init
    SkillInterestListPage.prototype.ngOnInit = function () {
        // this.commonFunction();
    };
    // init function call end
    SkillInterestListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // menu show
        this.menuCtrl.enable(true);
        // this.commonFunction();
        // this.permissionArray = true;
        //----- menu permission data start-----
        this.itemsSubscribe = this.commonUtils.menuPermissionObservable.subscribe(function (data) {
            if (data) {
                var getpermissionArray = data[_this.router.url];
                // console.log('permissionAccessData (all Data )>>>>>>>>>>>>', data);
                // console.log('permissionAccessData >>>>>>>>>>>>', getpermissionArray);
                if (getpermissionArray) {
                    if (getpermissionArray.page_permissions != undefined) {
                        for (var _i = 0, _a = getpermissionArray.page_permissions; _i < _a.length; _i++) {
                            var permission = _a[_i];
                            // if(something_wrong) break;
                            if (permission.permission_name == 'access' && permission.permission_access > 0) {
                                _this.permissionArray = getpermissionArray.page_permissions;
                                _this.loggedin_user_id = getpermissionArray.loggedin_id;
                                // console.log('this.permissionArray >', this.permissionArray);
                                // console.log('=== HAVE Permission ===');
                                _this.commonFunction();
                                break;
                            }
                            else {
                                console.log('-------No Permission--------');
                                _this.router.navigateByUrl('/error');
                            }
                        }
                    }
                    else {
                        console.log('-------No Permission--------');
                        _this.router.navigateByUrl('/error');
                    }
                }
            }
        });
        //menu permission data end-----
    };
    // --------- table header function -----------
    SkillInterestListPage.prototype.onHeaderData = function (_header_url) {
        var _this = this;
        this.plt.ready().then(function () {
            _this.itemsHeaderSubscribe = _this.commonUtils.headerListData(_header_url).subscribe(function (resData) {
                _this.tableHeaderData = resData[0];
                _this.tableheaderDropdownChecked = resData[1];
                _this.tableHeaderDataDropdown = resData[2];
                // ---- get stroage value for select dropdown start----
                _this.storage.get("" + _this.current_url_path_name).then(function (_stroageVal) {
                    if (_stroageVal != null) {
                        _this.tableHeaderData = _stroageVal;
                        _this.tableHeaderDataDropdown.forEach(function (value, index) {
                            _stroageVal.forEach(function (value2, index2) {
                                if (value.column_name === value2.column_name) {
                                    if (value2.is_checked == true) {
                                        value.is_checked = true;
                                    }
                                }
                            });
                        });
                    }
                    else {
                        _this.tableheaderDropdownChecked.forEach(function (value, index) {
                            value.is_checked = true;
                        });
                    }
                });
            }, function (errRes) {
                // this.isLoading = false;
            });
        });
    };
    // --------- table list data function ---------
    SkillInterestListPage.prototype.onListData = function (_list_url, _displayRecord, _page, _apiParms, _search, _cherecterSearch, _orderBy, _order, _advSearchParms, _identifire) {
        var _this = this;
        this.plt.ready().then(function () {
            _this.isListLoading = true;
            _this.itemsSubscribe = _this.commonUtils.fetchList(_list_url, _displayRecord, _page, _apiParms, _search, _cherecterSearch, _orderBy, _order, _advSearchParms, _identifire).subscribe(function (resData) {
                _this.isListLoading = false;
                _this.fetchItems = resData[0];
                _this.listAlldata = resData[1];
                //---------  check item show start ----------
                if (_this.fetchItems && _this.checkedList) {
                    for (var i = 0; i < _this.fetchItems.length; i++) {
                        for (var j = 0; j < _this.checkedList.length; j++) {
                            if (_this.checkedList[j].id == _this.fetchItems[i].id) {
                                _this.fetchItems[i].isSelected = true;
                                // console.log('this.fetchItems[i] >>', this.fetchItems[i]);
                            }
                        }
                    }
                }
                // check item show end
                // show pager 
                if (resData[1] != undefined || resData[1] != null) {
                    _this.pager = _this.pagerService.getPager(resData[1].total, _page, _displayRecord);
                }
            }, function (errRes) {
                _this.isListLoading = false;
            });
        });
    };
    SkillInterestListPage.prototype.setPage = function (page) {
        // get pager object from service
        this.pageNo = page;
        this.pager = this.pagerService.getPager(this.listAlldata.total, page, this.displayRecord);
        this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);
    };
    SkillInterestListPage.prototype.isSortTableHeader = function (_tableHeaderData, _headerItem) {
        // all field reset first
        _tableHeaderData.forEach(function (val) {
            val.sortingButtonName = '';
        });
        _headerItem.orederShow = !_headerItem.orederShow;
        if (_headerItem.orederShow) {
            _headerItem.sortingButtonName = "asc";
        }
        else {
            _headerItem.sortingButtonName = "desc";
        }
        this.sortColumnName = _headerItem.column_name;
        this.sortOrderName = _headerItem.sortingButtonName;
        this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);
    };
    // table header sorting end
    // ------ popover select table header column start--------
    SkillInterestListPage.prototype.openColumnselection = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: select_column_popover_page_1.SelectColumnPopoverPage,
                            componentProps: {
                                popover_header_data: this.tableHeaderData,
                                popover_header_data_dropdown: this.tableHeaderDataDropdown,
                                current_url_name: this.current_url_path_name
                            },
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        // dismiss link fire
                        popover.onDidDismiss()
                            .then(function (getdata) {
                            if (getdata.role == 'resetPopover') {
                                // table header data url name
                                _this.onHeaderData(_this.headerUrlapi);
                            }
                        });
                        popover.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SkillInterestListPage.prototype.displayRecordChange = function (_record) {
        this.displayRecord = _record;
        this.onListData(this.listing_url, this.displayRecord, '', this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);
    };
    SkillInterestListPage.prototype.onChange = function (_item) {
        console.log("dropdown selected item >", _item);
    };
    SkillInterestListPage.prototype.getlist = function (_getlistUrl) {
        var _this = this;
        this.plt.ready().then(function () {
            _this.selectLoading = true;
            _this.getListSubscribe = _this.commonUtils.getlistCommon(_getlistUrl).subscribe(function (resData) {
                _this.selectLoading = false;
            }, function (errRes) {
                _this.selectLoading = false;
            });
        });
    };
    SkillInterestListPage.prototype.searchList = function (event) {
        this.searchTerm = event.target.value;
        this.onListData(this.listing_url, this.displayRecord, 1, this.api_parms, this.searchTerm, '', this.sortColumnName, this.sortOrderName, '', this.urlIdentifire);
    };
    SkillInterestListPage.prototype.searchByCherecter = function (event) {
        this.cherecterSearchTerm = event.target.value;
        this.onListData(this.listing_url, this.displayRecord, 1, this.api_parms, '', this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, '', this.urlIdentifire);
    };
    SkillInterestListPage.prototype.onSubmitAdvanceForm = function (form) {
        // console.log('adv form.value >>', form.value);
        this.advanceSearchParms = form.value;
        if (!form.valid) {
            return;
        }
        else {
            // this.searchTerm = ''; //search data empty set
            this.onListData(this.listing_url, this.displayRecord, 1, this.api_parms, '', '', this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);
        }
    };
    SkillInterestListPage.prototype.myFunction = function () {
        console.log('get seleted date');
    };
    // datepicker end
    //------------  custom refresh page start ----------
    SkillInterestListPage.prototype.onRefreshPage = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.checkedList = [];
        this.allselectModel = false;
        this.advanceSearchParms = '';
        this.searchTerm = '';
        // this.displayRecord =this.commonUtils.displayRecord;
        this.sortColumnName = '';
        this.sortOrderName = '';
        // shorting reset
        this.tableHeaderData.forEach(function (val) {
            val.sortingButtonName = '',
                val.orederShow = false;
        });
        this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, '', '', '', '', '', this.urlIdentifire);
    };
    SkillInterestListPage.prototype.onClickDeleteItem = function (_identifire, _item, _items, _index) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Delete',
                            message: 'Do you really want to delete selected item ?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'popup-cancel-btn',
                                    handler: function (blah) {
                                        // console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Ok',
                                    cssClass: 'popup-ok-btn',
                                    handler: function () {
                                        // ------------ single item delete start ------------
                                        if (_identifire == 'single') {
                                            // console.log('Confirm Okay');
                                            var fd = new FormData();
                                            fd.append('_method', 'DELETE');
                                            _item.deleteLodershow = true;
                                            _this.deleteListSubscribe = _this.http.post(_this.listing_url + '/' + _item.id, fd).subscribe(function (res) {
                                                _item.deleteLodershow = false;
                                                if (res.return_status > 0) {
                                                    _items.splice(_index, 1);
                                                    _this.commonUtils.presentToast('success', res.return_message);
                                                    if (_items.length == 0) {
                                                        _this.allselectModel = false;
                                                    }
                                                }
                                                else {
                                                    _this.commonUtils.presentToast('error', res.return_message);
                                                }
                                            });
                                            // ------------ single item delete end ------------
                                        }
                                        else {
                                            var checkItemIdArray_1 = [];
                                            if (_this.checkedList) {
                                                _this.checkedList.forEach(function (element) {
                                                    checkItemIdArray_1.push(element.id);
                                                });
                                            }
                                            if (_items) {
                                                _items.forEach(function (element) {
                                                    _this.checkedList.forEach(function (element1) {
                                                        if (element.id == element1.id) {
                                                            element.deleteLodershow = true; //loader show
                                                            _this.alldeleteLoaderShow = true;
                                                        }
                                                    });
                                                });
                                            }
                                            _this.deleteListSubscribe = _this.http.get(_this.listing_url + '_actionall?action=delete&' + _this.listing_url + '_id=' + checkItemIdArray_1.join()).subscribe(function (res) {
                                                if (res.return_status > 0) {
                                                    if (_items) {
                                                        for (var i = 0; i < _items.length; i++) {
                                                            for (var j = 0; j < _this.checkedList.length; j++) {
                                                                if (_items[i].id == _this.checkedList[j].id) {
                                                                    // _items.splice(i, i);
                                                                    _this.checkedList = [];
                                                                    // _items.splice(_items.indexOf(_items[i]), 1);
                                                                    _this.deleteLodershow = false; //loader hide
                                                                    _this.alldeleteLoaderShow = false;
                                                                    // console.log('delete items >>', _items);
                                                                    // console.log('delete this.checkedList >>', this.checkedList);
                                                                    _this.allselectModel = false;
                                                                    _this.onListData(_this.listing_url, _this.displayRecord, _this.pageNo, _this.api_parms, _this.searchTerm, _this.cherecterSearchTerm, _this.sortColumnName, _this.sortOrderName, _this.advanceSearchParms, _this.urlIdentifire);
                                                                }
                                                            }
                                                        }
                                                        ;
                                                        if (_items.length == 0) {
                                                            _this.allselectModel = false;
                                                            _this.checkedList = [];
                                                            checkItemIdArray_1 = [];
                                                        }
                                                    }
                                                    _this.commonUtils.presentToast('success', res.return_message);
                                                }
                                                else {
                                                    _this.commonUtils.presentToast('error', res.return_message);
                                                }
                                            });
                                        }
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SkillInterestListPage.prototype.enabledDisabled = function (_identifire, _item, _items) {
        var _this = this;
        //if _status is 0 then its set to 1 and vice versa
        // _status = _status ? 0 : 1;
        var getStatus;
        var set_api;
        if (_identifire == 'single') {
            if (_item.status == '0') {
                getStatus = '1';
            }
            else {
                getStatus = '0';
            }
            set_api = this.listing_url + '_status/' + _item.id + '?status=' + getStatus;
        }
        else {
            var checkItemIdArray_2 = [];
            if (this.checkedList) {
                this.checkedList.forEach(function (element) {
                    checkItemIdArray_2.push(element.id);
                });
            }
            set_api = this.listing_url + '_actionall?action=statuschange&status=' + _item + '&' + this.listing_url + '_id=' + checkItemIdArray_2.join();
        }
        this.statusChangeLoading = true;
        this.itemsSubscribe = this.http.get(set_api).subscribe(function (res) {
            if (res.return_status > 0) {
                _this.statusChangeLoading = false;
                _this.commonUtils.presentToast('success', res.return_message);
                if (_identifire == 'single') {
                    if (_item.status == '0') {
                        _item.status = '1';
                    }
                    else {
                        _item.status = '0';
                    }
                }
                else {
                    if (_item == '0') {
                        for (var i = 0; i < _this.fetchItems.length; i++) {
                            for (var j = 0; j < _this.checkedList.length; j++) {
                                if (_this.fetchItems[i].id == _this.checkedList[j].id) {
                                    _this.fetchItems[i].status = '0';
                                    _this.fetchItems[i].isSelected = false;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < _this.fetchItems.length; i++) {
                            for (var j = 0; j < _this.checkedList.length; j++) {
                                if (_this.fetchItems[i].id == _this.checkedList[j].id) {
                                    _this.fetchItems[i].status = '1';
                                    _this.fetchItems[i].isSelected = false;
                                    break;
                                }
                            }
                        }
                    }
                    _this.checkedList = [];
                }
                // console.log("enabledDisabled ... res >", res);
            }
            else {
                _this.statusChangeLoading = false;
                _this.commonUtils.presentToast('error', res.return_message);
            }
        }, function (errRes) {
            _this.statusChangeLoading = false;
        });
    };
    // enable disable call end
    // ================== select checkbox start =====================
    SkillInterestListPage.prototype.onCheckboxSelect = function (option, event) {
        if (event.target.checked) {
            if (this.checkedList.indexOf(option) === -1) {
                this.checkedList.push(option);
            }
        }
        else {
            for (var i = 0; i < this.fetchItems.length; i++) {
                if (this.checkedList[i] == option) {
                    this.checkedList.splice(i, 1);
                }
            }
        }
        if (this.fetchItems.length <= this.checkedList.length) {
            this.allselectModel = true;
            console.log('length 4');
        }
        else {
            console.log('length 0');
            this.allselectModel = false;
            this.itemcheckClick = true;
        }
        console.log('checked item single >>', this.checkedList);
    };
    SkillInterestListPage.prototype.allSelectItem = function (event) {
        if (event.target.checked) {
            this.itemcheckClick = false;
            // console.log('check item selkectedddddddddddddd');
            for (var i = 0; i < this.fetchItems.length; i++) {
                // if(this.checkedList.includes(this.items[i].id) === false)
                if (this.checkedList.indexOf(this.fetchItems[i]) === -1 && this.fetchItems[i] !== null) {
                    this.checkedList.push(this.fetchItems[i]);
                    this.fetchItems[i].isSelected = true;
                }
            }
        }
        else if (this.itemcheckClick == false) {
            // console.log('not check item selectionnnnnnnnnnn')
            this.checkedList = [];
            for (var i = 0; i < this.fetchItems.length; i++) {
                if (this.checkedList.indexOf(this.fetchItems[i]) === -1) {
                    this.fetchItems[i].isSelected = false;
                }
            }
        }
        console.log('checked item all @@ >>', this.checkedList);
    };
    SkillInterestListPage.prototype.clickItemHighlight = function (index) {
        this.activeHighlightIndex = index;
    };
    //click item hilight back end 
    // ----------- destroy subscription start ---------
    SkillInterestListPage.prototype.ngOnDestroy = function () {
        if (this.itemsSubscribe !== undefined) {
            this.itemsSubscribe.unsubscribe();
        }
        if (this.itemsHeaderSubscribe !== undefined) {
            this.itemsHeaderSubscribe.unsubscribe();
        }
        if (this.getListSubscribe !== undefined) {
            this.getListSubscribe.unsubscribe();
        }
        if (this.deleteListSubscribe !== undefined) {
            this.deleteListSubscribe.unsubscribe();
        }
    };
    SkillInterestListPage = __decorate([
        core_1.Component({
            selector: 'app-skill-interest-list',
            templateUrl: './skill-interest-list.page.html',
            styleUrls: ['./skill-interest-list.page.scss']
        })
        // End here
    ], SkillInterestListPage);
    return SkillInterestListPage;
}());
exports.SkillInterestListPage = SkillInterestListPage;
