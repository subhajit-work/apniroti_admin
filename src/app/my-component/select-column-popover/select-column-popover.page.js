"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
/* tslint:disable */
var SelectColumnPopoverPage = /** @class */ (function () {
    function SelectColumnPopoverPage(popoverController, navParams, storage) {
        this.popoverController = popoverController;
        this.navParams = navParams;
        this.storage = storage;
    }
    SelectColumnPopoverPage.prototype.ngOnInit = function () {
        this.tableheaderDataPop = this.navParams.get('popover_header_data');
        this.tableheaderDataDropdown = this.navParams.get('popover_header_data_dropdown');
        this.current_url_name = this.navParams.get('current_url_name');
        console.log('this.tableheaderDataPop >', this.tableheaderDataPop);
        console.log('this.current_url_name>', this.current_url_name);
    };
    SelectColumnPopoverPage.prototype.isColumnSelection = function (option, event) {
        console.log('option >>', option);
        // console.log('event >>', event);
        if (event.target.checked) {
            console.log('event.target.checked if 1111111111111111');
            if (this.tableheaderDataPop.indexOf(option) == -1) {
                option.is_default = 1;
                option.is_display = 1;
                this.tableheaderDataPop.push(option);
            }
            else {
                option.is_default = 1;
                option.is_display = 1;
            }
        }
        else {
            console.log('event.target.checked else 22222222222222222');
            for (var i = 0; i < this.tableheaderDataPop.length; i++) {
                if (this.tableheaderDataPop[i].column_name == option.column_name) {
                    this.tableheaderDataPop.splice(i, 1);
                }
            }
        }
        // this.tableheaderData = this.tableheaderDataPop;
        // set stroage value
        this.storage.set("" + this.current_url_name, this.tableheaderDataPop);
        console.log('checked item >>', this.tableheaderDataPop);
    };
    // close select column popover
    SelectColumnPopoverPage.prototype.closeSelectColumnPopover = function () {
        console.log('modal dismiss');
        this.popoverController.dismiss();
    };
    // reset select column popover
    SelectColumnPopoverPage.prototype.resetSelectColumnPopover = function () {
        this.popoverController.dismiss('', 'resetPopover');
        console.log('this.tableheaderData >>>>>>>>', this.tableheaderDataPop);
        // set stroage value
        // this.storage.set(`${this.current_url_name}`, this.tableheaderData);
        this.storage.remove("" + this.current_url_name);
        // this.storage.remove(`${ this.current_url_name }`);
    };
    SelectColumnPopoverPage = __decorate([
        core_1.Component({
            selector: 'app-select-column-popover',
            templateUrl: './select-column-popover.page.html',
            styleUrls: ['./select-column-popover.page.scss']
        })
    ], SelectColumnPopoverPage);
    return SelectColumnPopoverPage;
}());
exports.SelectColumnPopoverPage = SelectColumnPopoverPage;
