(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["aspnetValidation"] = factory();
	else
		root["aspnetValidation"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MvcValidationProviders: () => (/* binding */ MvcValidationProviders),
/* harmony export */   ValidationService: () => (/* binding */ ValidationService),
/* harmony export */   isValidatable: () => (/* binding */ isValidatable)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var nullLogger = new (/** @class */ (function () {
    function class_1() {
        this.warn = globalThis.console.warn;
    }
    class_1.prototype.log = function (_) {
        var _args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _args[_i - 1] = arguments[_i];
        }
    };
    return class_1;
}()))();
/**
 * Checks if `element` is validatable (`input`, `select`, `textarea`).
 * @param element The element to check.
 * @returns `true` if validatable, otherwise `false`.
 */
var isValidatable = function (element) {
    return element instanceof HTMLInputElement
        || element instanceof HTMLSelectElement
        || element instanceof HTMLTextAreaElement;
};
var validatableElementTypes = ['input', 'select', 'textarea'];
/**
 * Generates a selector to match validatable elements (`input`, `select`, `textarea`).
 * @param selector An optional selector to apply to the valid input types, e.g. `[data-val="true"]`.
 * @returns The validatable elements.
 */
var validatableSelector = function (selector) {
    return validatableElementTypes.map(function (t) { return "".concat(t).concat(selector || ''); }).join(',');
};
/**
 * Resolves and returns the element referred by original element using ASP.NET selector logic.
 * @param element - The input to validate
 * @param selector - Used to find the field. Ex. *.Password where * replaces whatever prefixes asp.net might add.
 */
function getRelativeFormElement(element, selector) {
    // example elementName: Form.PasswordConfirm, Form.Email
    // example selector (dafuq): *.Password, *.__RequestVerificationToken
    // example result element name: Form.Password, __RequestVerificationToken
    var elementName = element.name;
    var selectedName = selector.substring(2); // Password, __RequestVerificationToken
    var objectName = '';
    var dotLocation = elementName.lastIndexOf('.');
    if (dotLocation > -1) {
        // Form
        objectName = elementName.substring(0, dotLocation);
        // Form.Password
        var relativeElementName = objectName + '.' + selectedName;
        var relativeElement = document.getElementsByName(relativeElementName)[0];
        if (isValidatable(relativeElement)) {
            return relativeElement;
        }
    }
    // __RequestVerificationToken
    return element.form.querySelector(validatableSelector("[name=".concat(selectedName, "]")));
}
/**
 * Contains default implementations for ASP.NET Core MVC validation attributes.
 */
var MvcValidationProviders = /** @class */ (function () {
    function MvcValidationProviders() {
        /**
         * Validates whether the input has a value.
         */
        this.required = function (value, element, params) {
            // Handle single and multiple checkboxes/radio buttons.
            var elementType = element.type.toLowerCase();
            if (elementType === "checkbox" || elementType === "radio") {
                var allElementsOfThisName = Array.from(element.form.querySelectorAll(validatableSelector("[name='".concat(element.name, "'][type='").concat(elementType, "']"))));
                for (var _i = 0, allElementsOfThisName_1 = allElementsOfThisName; _i < allElementsOfThisName_1.length; _i++) {
                    var element_1 = allElementsOfThisName_1[_i];
                    if (element_1 instanceof HTMLInputElement && element_1.checked === true) {
                        return true;
                    }
                }
                // Checkboxes do not submit a value when unchecked. To work around this, platforms such as ASP.NET render a
                // hidden input with the same name as the checkbox so that a value ("false") is still submitted even when
                // the checkbox is not checked. We check this special case here.
                if (elementType === "checkbox") {
                    var checkboxHiddenInput = element.form.querySelector("input[name='".concat(element.name, "'][type='hidden']"));
                    if (checkboxHiddenInput instanceof HTMLInputElement && checkboxHiddenInput.value === "false") {
                        return true;
                    }
                }
                return false;
            }
            // Default behavior otherwise (trim ensures whitespace only is not seen as valid).
            return Boolean(value === null || value === void 0 ? void 0 : value.trim());
        };
        /**
         * Validates whether the input value satisfies the length contstraint.
         */
        this.stringLength = function (value, element, params) {
            if (!value) {
                return true;
            }
            if (params.min) {
                var min = parseInt(params.min);
                if (value.length < min) {
                    return false;
                }
            }
            if (params.max) {
                var max = parseInt(params.max);
                if (value.length > max) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Validates whether the input value is equal to another input value.
         */
        this.compare = function (value, element, params) {
            if (!params.other) {
                return true;
            }
            var otherElement = getRelativeFormElement(element, params.other);
            if (!otherElement) {
                return true;
            }
            return (otherElement.value === value);
        };
        /**
         * Validates whether the input value is a number within a given range.
         */
        this.range = function (value, element, params) {
            if (!value) {
                return true;
            }
            var val = parseFloat(value);
            if (isNaN(val)) {
                return false;
            }
            if (params.min) {
                var min = parseFloat(params.min);
                if (val < min) {
                    return false;
                }
            }
            if (params.max) {
                var max = parseFloat(params.max);
                if (val > max) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Validates whether the input value satisfies a regular expression pattern.
         */
        this.regex = function (value, element, params) {
            if (!value || !params.pattern) {
                return true;
            }
            var r = new RegExp(params.pattern);
            return r.test(value);
        };
        /**
         * Validates whether the input value is an email in accordance to RFC822 specification, with a top level domain.
         */
        this.email = function (value, element, params) {
            if (!value) {
                return true;
            }
            // RFC822 email address with .TLD validation
            // (c) Richard Willis, Chris Ferdinandi, MIT Licensed
            // https://gist.github.com/badsyntax/719800
            // https://gist.github.com/cferdinandi/d04aad4ce064b8da3edf21e26f8944c4
            var r = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
            return r.test(value);
        };
        /**
         * Validates whether the input value is a credit card number, with Luhn's Algorithm.
         */
        this.creditcard = function (value, element, params) {
            if (!value) {
                return true;
            }
            // (c) jquery-validation, MIT Licensed
            // https://github.com/jquery-validation/jquery-validation/blob/master/src/additional/creditcard.js
            // based on https://en.wikipedia.org/wiki/Luhn_algorithm
            // Accept only spaces, digits and dashes
            if (/[^0-9 \-]+/.test(value)) {
                return false;
            }
            var nCheck = 0, nDigit = 0, bEven = false, n, cDigit;
            value = value.replace(/\D/g, "");
            // Basing min and max length on https://developer.ean.com/general_info/Valid_Credit_Card_Types
            if (value.length < 13 || value.length > 19) {
                return false;
            }
            for (n = value.length - 1; n >= 0; n--) {
                cDigit = value.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9) {
                        nDigit -= 9;
                    }
                }
                nCheck += nDigit;
                bEven = !bEven;
            }
            return (nCheck % 10) === 0;
        };
        /**
         * Validates whether the input value is a URL.
         */
        this.url = function (value, element, params) {
            if (!value) {
                return true;
            }
            var lowerCaseValue = value.toLowerCase();
            // Match the logic in `UrlAttribute`
            return lowerCaseValue.indexOf('http://') > -1
                || lowerCaseValue.indexOf('https://') > -1
                || lowerCaseValue.indexOf('ftp://') > -1;
        };
        /**
         * Validates whether the input value is a phone number.
         */
        this.phone = function (value, element, params) {
            if (!value) {
                return true;
            }
            // Allows whitespace or dash as number separator because some people like to do that...
            var consecutiveSeparator = /[\+\-\s][\-\s]/g;
            if (consecutiveSeparator.test(value)) {
                return false;
            }
            var r = /^\+?[0-9\-\s]+$/;
            return r.test(value);
        };
        /**
         * Asynchronously validates the input value to a JSON GET API endpoint.
         */
        this.remote = function (value, element, params) {
            if (!value) {
                return true;
            }
            // params.additionalfields: *.Email,*.Username
            var fieldSelectors = params.additionalfields.split(',');
            var fields = {};
            for (var _i = 0, fieldSelectors_1 = fieldSelectors; _i < fieldSelectors_1.length; _i++) {
                var fieldSelector = fieldSelectors_1[_i];
                var fieldName = fieldSelector.substr(2);
                var fieldElement = getRelativeFormElement(element, fieldSelector);
                var hasValue = Boolean(fieldElement && fieldElement.value);
                if (!hasValue) {
                    continue;
                }
                if (fieldElement instanceof HTMLInputElement &&
                    (fieldElement.type === 'checkbox' || fieldElement.type === 'radio')) {
                    fields[fieldName] = fieldElement.checked ? fieldElement.value : '';
                }
                else {
                    fields[fieldName] = fieldElement.value;
                }
            }
            var url = params['url'];
            var encodedParams = [];
            for (var fieldName in fields) {
                var encodedParam = encodeURIComponent(fieldName) + '=' + encodeURIComponent(fields[fieldName]);
                encodedParams.push(encodedParam);
            }
            var payload = encodedParams.join('&');
            return new Promise(function (ok, reject) {
                var request = new XMLHttpRequest();
                if (params.type && params.type.toLowerCase() === 'post') {
                    var postData = new FormData();
                    for (var fieldName in fields) {
                        postData.append(fieldName, fields[fieldName]);
                    }
                    request.open('post', url);
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    request.send(payload);
                }
                else {
                    request.open('get', url + '?' + payload);
                    request.send();
                }
                request.onload = function (e) {
                    if (request.status >= 200 && request.status < 300) {
                        var data = JSON.parse(request.responseText);
                        ok(data);
                    }
                    else {
                        reject({
                            status: request.status,
                            statusText: request.statusText,
                            data: request.responseText
                        });
                    }
                };
                request.onerror = function (e) {
                    reject({
                        status: request.status,
                        statusText: request.statusText,
                        data: request.responseText
                    });
                };
            });
        };
    }
    return MvcValidationProviders;
}());

/**
 * Responsible for managing the DOM elements and running the validation providers.
 */
var ValidationService = /** @class */ (function () {
    function ValidationService(logger) {
        var _this = this;
        /**
         * A key-value collection of loaded validation plugins.
         */
        this.providers = {};
        /**
         * A key-value collection of form UIDs and their <span> elements for displaying validation messages for an input (by DOM name).
         */
        this.messageFor = {};
        /**
         * A list of managed elements, each having a randomly assigned unique identifier (UID).
         */
        this.elementUIDs = [];
        /**
         * A key-value collection of UID to Element for quick lookup.
         */
        this.elementByUID = {};
        /**
         * A key-value collection of input UIDs for a <form> UID.
         */
        this.formInputs = {};
        /**
         * A key-value map for input UID to its validator factory.
         */
        this.validators = {};
        /**
         * A key-value map for form UID to its trigger element (submit event for <form>).
         */
        this.formEvents = {};
        /**
         * A key-value map for element UID to its trigger element (input event for <textarea> and <input>, change event for <select>).
         */
        this.inputEvents = {};
        /**
         * A key-value map of input UID to its validation error message.
         */
        this.summary = {};
        /**
         * In milliseconds, the rate of fire of the input validation.
         */
        this.debounce = 300;
        /**
         * Allow hidden fields validation
         */
        this.allowHiddenFields = false;
        /**
         * Fires off validation for elements within the provided form and then calls the callback
         * @param form The form to validate.
         * @param callback Receives true or false indicating validity after all validation is complete.
         * @returns Promise that resolves to true or false indicating validity after all validation is complete.
         */
        this.validateForm = function (form, callback) { return __awaiter(_this, void 0, void 0, function () {
            var formUID, formValidationEvent, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(form instanceof HTMLFormElement)) {
                            throw new Error('validateForm() can only be called on <form> elements');
                        }
                        formUID = this.getElementUID(form);
                        formValidationEvent = this.formEvents[formUID];
                        _a = !formValidationEvent;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, formValidationEvent(undefined, callback)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2: return [2 /*return*/, _a];
                }
            });
        }); };
        /**
         * Fires off validation for the provided element and then calls the callback
         * @param field The element to validate.
         * @param callback Receives true or false indicating validity after all validation is complete.
         * @returns Promise that resolves to true or false indicating validity after all validation is complete
         */
        this.validateField = function (field, callback) { return __awaiter(_this, void 0, void 0, function () {
            var fieldUID, fieldValidationEvent, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fieldUID = this.getElementUID(field);
                        fieldValidationEvent = this.inputEvents[fieldUID];
                        _a = !fieldValidationEvent;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, fieldValidationEvent(undefined, callback)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2: return [2 /*return*/, _a];
                }
            });
        }); };
        /**
         * Called before validating form submit events.
         * Default calls `preventDefault()` and `stopImmediatePropagation()`.
         * @param submitEvent The `SubmitEvent`.
         */
        this.preValidate = function (submitEvent) {
            submitEvent.preventDefault();
            submitEvent.stopImmediatePropagation();
        };
        /**
         * Handler for validated form submit events.
         * Default calls `submitValidForm(form, submitEvent)` on success
         * and `focusFirstInvalid(form)` on failure.
         * @param form The form that has been validated.
         * @param success The validation result.
         * @param submitEvent The `SubmitEvent`.
         */
        this.handleValidated = function (form, success, submitEvent) {
            if (!(form instanceof HTMLFormElement)) {
                throw new Error('handleValidated() can only be called on <form> elements');
            }
            if (success) {
                if (submitEvent) {
                    _this.submitValidForm(form, submitEvent);
                }
            }
            else {
                _this.focusFirstInvalid(form);
            }
        };
        /**
         * Dispatches a new `SubmitEvent` on the provided form,
         * then calls `form.submit()` unless `submitEvent` is cancelable
         * and `preventDefault()` was called by a handler that received the new event.
         *
         * This is equivalent to `form.requestSubmit()`, but more flexible.
         * @param form The validated form to submit
         * @param submitEvent The `SubmitEvent`.
         */
        this.submitValidForm = function (form, submitEvent) {
            if (!(form instanceof HTMLFormElement)) {
                throw new Error('submitValidForm() can only be called on <form> elements');
            }
            var newEvent = new SubmitEvent('submit', submitEvent);
            if (form.dispatchEvent(newEvent)) {
                // Because the submitter is not propagated when calling
                // form.submit(), we recreate it here.
                var submitter = submitEvent.submitter;
                var submitterInput = null;
                var initialFormAction = form.action;
                if (submitter) {
                    var name_1 = submitter.getAttribute('name');
                    // If name is null, a submit button is not submitted.
                    if (name_1) {
                        submitterInput = document.createElement('input');
                        submitterInput.type = 'hidden';
                        submitterInput.name = name_1;
                        submitterInput.value = submitter.getAttribute('value');
                        form.appendChild(submitterInput);
                    }
                    var formAction = submitter.getAttribute('formaction');
                    if (formAction) {
                        form.action = formAction;
                    }
                }
                try {
                    form.submit();
                }
                finally {
                    if (submitterInput) {
                        // Important to clean up the submit input we created.
                        form.removeChild(submitterInput);
                    }
                    form.action = initialFormAction;
                }
            }
        };
        /**
         * Focuses the first invalid element within the provided form
         * @param form
         */
        this.focusFirstInvalid = function (form) {
            if (!(form instanceof HTMLFormElement)) {
                throw new Error('focusFirstInvalid() can only be called on <form> elements');
            }
            var formUID = _this.getElementUID(form);
            var formInputUIDs = _this.formInputs[formUID];
            var invalidFormInputUID = formInputUIDs === null || formInputUIDs === void 0 ? void 0 : formInputUIDs.find(function (uid) { return _this.summary[uid]; });
            if (invalidFormInputUID) {
                var firstInvalid = _this.elementByUID[invalidFormInputUID];
                if (firstInvalid instanceof HTMLElement) {
                    firstInvalid.focus();
                }
            }
        };
        /**
         * Returns true if the provided form is currently valid.
         * The form will be validated unless prevalidate is set to false.
         * @param form The form to validate.
         * @param prevalidate Whether the form should be validated before returning.
         * @param callback A callback that receives true or false indicating validity after all validation is complete. Ignored if prevalidate is false.
         * @returns The current state of the form. May be inaccurate if any validation is asynchronous (e.g. remote); consider using `callback` instead.
         */
        this.isValid = function (form, prevalidate, callback) {
            if (prevalidate === void 0) { prevalidate = true; }
            if (!(form instanceof HTMLFormElement)) {
                throw new Error('isValid() can only be called on <form> elements');
            }
            if (prevalidate) {
                _this.validateForm(form, callback);
            }
            var formUID = _this.getElementUID(form);
            var formInputUIDs = _this.formInputs[formUID];
            var formIsInvalid = (formInputUIDs === null || formInputUIDs === void 0 ? void 0 : formInputUIDs.some(function (uid) { return _this.summary[uid]; })) === true;
            return !formIsInvalid;
        };
        /**
         * Returns true if the provided field is currently valid.
         * The field will be validated unless prevalidate is set to false.
         * @param field The field to validate.
         * @param prevalidate Whether the field should be validated before returning.
         * @param callback A callback that receives true or false indicating validity after all validation is complete. Ignored if prevalidate is false.
         * @returns The current state of the field. May be inaccurate if any validation is asynchronous (e.g. remote); consider using `callback` instead.
         */
        this.isFieldValid = function (field, prevalidate, callback) {
            if (prevalidate === void 0) { prevalidate = true; }
            if (prevalidate) {
                _this.validateField(field, callback);
            }
            var fieldUID = _this.getElementUID(field);
            return _this.summary[fieldUID] === undefined;
        };
        /**
         * Options for this instance of @type {ValidationService}.
         */
        this.options = {
            root: document.body,
            watch: false,
            addNoValidate: true,
        };
        /**
         * Override CSS class name for input validation error. Default: 'input-validation-error'
         */
        this.ValidationInputCssClassName = "input-validation-error";
        /**
         * Override CSS class name for valid input validation. Default: 'input-validation-valid'
         */
        this.ValidationInputValidCssClassName = "input-validation-valid";
        /**
         * Override CSS class name for field validation error. Default: 'field-validation-error'
         */
        this.ValidationMessageCssClassName = "field-validation-error";
        /**
         * Override CSS class name for valid field validation. Default: 'field-validation-valid'
         */
        this.ValidationMessageValidCssClassName = "field-validation-valid";
        /**
         * Override CSS class name for validation summary error. Default: 'validation-summary-errors'
         */
        this.ValidationSummaryCssClassName = "validation-summary-errors";
        /**
         * Override CSS class name for valid validation summary. Default: 'validation-summary-valid'
         */
        this.ValidationSummaryValidCssClassName = "validation-summary-valid";
        this.logger = logger || nullLogger;
    }
    /**
     * Registers a new validation plugin of the given name, if not registered yet.
     * Registered plugin validates inputs with data-val-[name] attribute, used as error message.
     * @param name
     * @param callback
     */
    ValidationService.prototype.addProvider = function (name, callback) {
        if (this.providers[name]) {
            // First-Come-First-Serve validation plugin design.
            // Allows developers to override the default MVC Providers by adding custom providers BEFORE bootstrap() is called!
            return;
        }
        this.logger.log("Registered provider: %s", name);
        this.providers[name] = callback;
    };
    /**
     * Registers the default providers for enabling ASP.NET Core MVC client-side validation.
     */
    ValidationService.prototype.addMvcProviders = function () {
        var mvc = new MvcValidationProviders();
        // [Required]
        this.addProvider('required', mvc.required);
        // [StringLength], [MinLength], [MaxLength]
        this.addProvider('length', mvc.stringLength);
        this.addProvider('maxlength', mvc.stringLength);
        this.addProvider('minlength', mvc.stringLength);
        // [Compare]
        this.addProvider('equalto', mvc.compare);
        // [Range]
        this.addProvider('range', mvc.range);
        // [RegularExpression]
        this.addProvider('regex', mvc.regex);
        // [CreditCard]
        this.addProvider('creditcard', mvc.creditcard);
        // [EmailAddress]
        this.addProvider('email', mvc.email);
        // [Url]
        this.addProvider('url', mvc.url);
        // [Phone]
        this.addProvider('phone', mvc.phone);
        // [Remote]
        this.addProvider('remote', mvc.remote);
    };
    /**
     * Scans `root` for all validation message <span> generated by ASP.NET Core MVC, then calls `cb` for each.
     * @param root The root node to scan
     * @param cb The callback to invoke with each form and span
     */
    ValidationService.prototype.scanMessages = function (root, cb) {
        /* If a validation span explicitly declares a form, we group the span with that form. */
        var validationMessageElements = Array.from(root.querySelectorAll('span[form]'));
        for (var _i = 0, validationMessageElements_1 = validationMessageElements; _i < validationMessageElements_1.length; _i++) {
            var span = validationMessageElements_1[_i];
            var form = document.getElementById(span.getAttribute('form'));
            if (form instanceof HTMLFormElement) {
                cb.call(this, form, span);
            }
        }
        // Otherwise if a validation message span is inside a form, we group the span with the form it's inside.
        var forms = Array.from(root.querySelectorAll('form'));
        if (root instanceof HTMLFormElement) {
            // querySelectorAll does not include the root element itself.
            // we could use 'matches', but that's newer than querySelectorAll so we'll keep it simple and compatible.
            forms.push(root);
        }
        // If root is the descendant of a form, we want to include that form too.
        var containingForm = (root instanceof Element) ? root.closest('form') : null;
        if (containingForm) {
            forms.push(containingForm);
        }
        for (var _a = 0, forms_1 = forms; _a < forms_1.length; _a++) {
            var form = forms_1[_a];
            var validationMessageElements_3 = Array.from(form.querySelectorAll('[data-valmsg-for]'));
            for (var _b = 0, validationMessageElements_2 = validationMessageElements_3; _b < validationMessageElements_2.length; _b++) {
                var span = validationMessageElements_2[_b];
                cb.call(this, form, span);
            }
        }
    };
    ValidationService.prototype.pushValidationMessageSpan = function (form, span) {
        var _a, _b;
        var _c;
        var formId = this.getElementUID(form);
        var formSpans = (_a = (_c = this.messageFor)[formId]) !== null && _a !== void 0 ? _a : (_c[formId] = {});
        var messageForId = span.getAttribute('data-valmsg-for');
        if (!messageForId)
            return;
        var spans = (_b = formSpans[messageForId]) !== null && _b !== void 0 ? _b : (formSpans[messageForId] = []);
        if (spans.indexOf(span) < 0) {
            spans.push(span);
        }
        else {
            this.logger.log("Validation element for '%s' is already tracked", name, span);
        }
    };
    ValidationService.prototype.removeValidationMessageSpan = function (form, span) {
        var formId = this.getElementUID(form);
        var formSpans = this.messageFor[formId];
        if (!formSpans)
            return;
        var messageForId = span.getAttribute('data-valmsg-for');
        if (!messageForId)
            return;
        var spans = formSpans[messageForId];
        if (!spans) {
            return;
        }
        var index = spans.indexOf(span);
        if (index >= 0) {
            spans.splice(index, 1);
        }
        else {
            this.logger.log("Validation element for '%s' was already removed", name, span);
        }
    };
    /**
     * Given attribute map for an HTML input, returns the validation directives to be executed.
     * @param attributes
     */
    ValidationService.prototype.parseDirectives = function (attributes) {
        var directives = {};
        var validationAtributes = {};
        var cut = 'data-val-'.length;
        for (var i = 0; i < attributes.length; i++) {
            var a = attributes[i];
            if (a.name.indexOf('data-val-') === 0) {
                var key = a.name.substr(cut);
                validationAtributes[key] = a.value;
            }
        }
        var _loop_1 = function (key) {
            if (key.indexOf('-') === -1) {
                var parameters = Object.keys(validationAtributes).filter(function (Q) {
                    return (Q !== key) && (Q.indexOf(key) === 0);
                });
                var directive = {
                    error: validationAtributes[key],
                    params: {}
                };
                var pcut = (key + '-').length;
                for (var i = 0; i < parameters.length; i++) {
                    var pvalue = validationAtributes[parameters[i]];
                    var pkey = parameters[i].substr(pcut);
                    directive.params[pkey] = pvalue;
                }
                directives[key] = directive;
            }
        };
        for (var key in validationAtributes) {
            _loop_1(key);
        }
        return directives;
    };
    /**
     *  Returns an RFC4122 version 4 compliant GUID.
     */
    ValidationService.prototype.guid4 = function () {
        // (c) broofa, MIT Licensed
        // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    /**
     * Gets a UID for an DOM element.
     * @param node
     */
    ValidationService.prototype.getElementUID = function (node) {
        var x = this.elementUIDs.filter(function (e) {
            return e.node === node;
        })[0];
        if (x) {
            return x.uid;
        }
        var uid = this.guid4();
        this.elementUIDs.push({
            node: node,
            uid: uid
        });
        this.elementByUID[uid] = node;
        return uid;
    };
    /**
     * Returns a Promise that returns validation result for each and every inputs within the form.
     * @param formUID
     */
    ValidationService.prototype.getFormValidationTask = function (formUID) {
        var formInputUIDs = this.formInputs[formUID];
        if (!formInputUIDs || formInputUIDs.length === 0) {
            return Promise.resolve(true);
        }
        var formValidators = [];
        for (var _i = 0, formInputUIDs_1 = formInputUIDs; _i < formInputUIDs_1.length; _i++) {
            var inputUID = formInputUIDs_1[_i];
            var validator = this.validators[inputUID];
            if (validator) {
                formValidators.push(validator);
            }
        }
        var tasks = formValidators.map(function (factory) { return factory(); });
        return Promise.all(tasks).then(function (result) { return result.every(function (e) { return e; }); });
    };
    // Retrieves the validation span for the input.
    ValidationService.prototype.getMessageFor = function (input) {
        var _a;
        if (!input.form) {
            return undefined;
        }
        var formId = this.getElementUID(input.form);
        return (_a = this.messageFor[formId]) === null || _a === void 0 ? void 0 : _a[input.name];
    };
    /**
     * Returns true if the event triggering the form submission indicates we should validate the form.
     * @param e
     */
    ValidationService.prototype.shouldValidate = function (e) {
        // Skip client-side validation if the form has been submitted via a button that has the "formnovalidate" attribute.
        return !(e && e['submitter'] && e['submitter']['formNoValidate']);
    };
    /**
     * Tracks a <form> element as parent of an input UID. When the form is submitted, attempts to validate the said input asynchronously.
     * @param form
     * @param inputUID
     */
    ValidationService.prototype.trackFormInput = function (form, inputUID) {
        var _this = this;
        var _a;
        var _b;
        var formUID = this.getElementUID(form);
        var formInputUIDs = (_a = (_b = this.formInputs)[formUID]) !== null && _a !== void 0 ? _a : (_b[formUID] = []);
        var add = formInputUIDs.indexOf(inputUID) === -1;
        if (add) {
            formInputUIDs.push(inputUID);
            if (this.options.addNoValidate) {
                this.logger.log('Setting novalidate on form', form);
                form.setAttribute('novalidate', 'novalidate');
            }
            else {
                this.logger.log('Not setting novalidate on form', form);
            }
        }
        else {
            this.logger.log("Form input for UID '%s' is already tracked", inputUID);
        }
        if (this.formEvents[formUID]) {
            return;
        }
        var validationTask = null;
        var cb = function (e, callback) {
            // Prevent recursion
            if (validationTask) {
                return validationTask;
            }
            if (!_this.shouldValidate(e)) {
                return Promise.resolve(true);
            }
            validationTask = _this.getFormValidationTask(formUID);
            //`preValidate` typically prevents submit before validation
            if (e) {
                _this.preValidate(e);
            }
            _this.logger.log('Validating', form);
            return validationTask.then(function (success) { return __awaiter(_this, void 0, void 0, function () {
                var validationEvent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('Validated (success = %s)', success, form);
                            if (callback) {
                                callback(success);
                                return [2 /*return*/, success];
                            }
                            validationEvent = new CustomEvent('validation', {
                                detail: { valid: success }
                            });
                            form.dispatchEvent(validationEvent);
                            // Firefox fix: redispatch 'submit' after finished handling this event
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
                        case 1:
                            // Firefox fix: redispatch 'submit' after finished handling this event
                            _a.sent();
                            this.handleValidated(form, success, e);
                            return [2 /*return*/, success];
                    }
                });
            }); }).catch(function (error) {
                _this.logger.log('Validation error', error);
                return false;
            }).finally(function () {
                validationTask = null;
            });
        };
        form.addEventListener('submit', cb);
        var cbReset = function (e) {
            var formInputUIDs = _this.formInputs[formUID];
            for (var _i = 0, formInputUIDs_2 = formInputUIDs; _i < formInputUIDs_2.length; _i++) {
                var inputUID_1 = formInputUIDs_2[_i];
                _this.resetField(inputUID_1);
            }
            _this.renderSummary();
        };
        form.addEventListener('reset', cbReset);
        cb.remove = function () {
            form.removeEventListener('submit', cb);
            form.removeEventListener('reset', cbReset);
        };
        this.formEvents[formUID] = cb;
    };
    /*
        Reset the state of a validatable input. This is used when it's enabled or disabled.
    */
    ValidationService.prototype.reset = function (input) {
        if (this.isDisabled(input)) {
            this.resetField(this.getElementUID(input));
        }
        else {
            this.scan(input);
        }
    };
    ValidationService.prototype.resetField = function (inputUID) {
        var input = this.elementByUID[inputUID];
        this.swapClasses(input, '', this.ValidationInputCssClassName);
        this.swapClasses(input, '', this.ValidationInputValidCssClassName);
        var spans = isValidatable(input) && this.getMessageFor(input);
        if (spans) {
            for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '';
                this.swapClasses(spans[i], '', this.ValidationMessageCssClassName);
                this.swapClasses(spans[i], '', this.ValidationMessageValidCssClassName);
            }
        }
        delete this.summary[inputUID];
    };
    ValidationService.prototype.untrackFormInput = function (form, inputUID) {
        var _a;
        var formUID = this.getElementUID(form);
        var formInputUIDs = this.formInputs[formUID];
        if (!formInputUIDs) {
            return;
        }
        var indexToRemove = formInputUIDs.indexOf(inputUID);
        if (indexToRemove >= 0) {
            formInputUIDs.splice(indexToRemove, 1);
            if (!formInputUIDs.length) {
                (_a = this.formEvents[formUID]) === null || _a === void 0 ? void 0 : _a.remove();
                delete this.formEvents[formUID];
                delete this.formInputs[formUID];
                delete this.messageFor[formUID];
            }
        }
        else {
            this.logger.log("Form input for UID '%s' was already removed", inputUID);
        }
    };
    /**
     * Adds an input element to be managed and validated by the service.
     * Triggers a debounced live validation when input value changes.
     * @param input
     */
    ValidationService.prototype.addInput = function (input) {
        var _this = this;
        var _a;
        var uid = this.getElementUID(input);
        var directives = this.parseDirectives(input.attributes);
        this.validators[uid] = this.createValidator(input, directives);
        if (input.form) {
            this.trackFormInput(input.form, uid);
        }
        if (this.inputEvents[uid]) {
            return;
        }
        var cb = function (event, callback) { return __awaiter(_this, void 0, void 0, function () {
            var validate, success, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validate = this.validators[uid];
                        if (!validate)
                            return [2 /*return*/, true];
                        if (!input.dataset.valEvent &&
                            event && event.type === 'input' &&
                            !input.classList.contains(this.ValidationInputCssClassName)) {
                            // When no data-val-event specified on a field, "input" event only takes it back to valid. "Change" event can make it invalid.
                            return [2 /*return*/, true];
                        }
                        this.logger.log('Validating', { event: event });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validate()];
                    case 2:
                        success = _a.sent();
                        callback(success);
                        return [2 /*return*/, success];
                    case 3:
                        error_1 = _a.sent();
                        this.logger.log('Validation error', error_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var debounceTimeoutID = null;
        cb.debounced = function (event, callback) {
            if (debounceTimeoutID !== null) {
                clearTimeout(debounceTimeoutID);
            }
            debounceTimeoutID = setTimeout(function () {
                cb(event, callback);
            }, _this.debounce);
        };
        var defaultEvent = input instanceof HTMLSelectElement ? 'change' : 'input change';
        var validateEvent = (_a = input.dataset.valEvent) !== null && _a !== void 0 ? _a : defaultEvent;
        var events = validateEvent.split(' ');
        events.forEach(function (eventName) {
            input.addEventListener(eventName, cb.debounced);
        });
        cb.remove = function () {
            events.forEach(function (eventName) {
                input.removeEventListener(eventName, cb.debounced);
            });
        };
        this.inputEvents[uid] = cb;
    };
    ValidationService.prototype.removeInput = function (input) {
        var uid = this.getElementUID(input);
        // Clean up event listener
        var cb = this.inputEvents[uid];
        if (cb === null || cb === void 0 ? void 0 : cb.remove) {
            cb.remove();
            delete cb.remove;
        }
        delete this.summary[uid];
        delete this.inputEvents[uid];
        delete this.validators[uid];
        if (input.form) {
            this.untrackFormInput(input.form, uid);
        }
    };
    /**
     * Scans `root` for input elements to be validated, then calls `cb` for each.
     * @param root The root node to scan
     * @param cb The callback to invoke with each input
     */
    ValidationService.prototype.scanInputs = function (root, cb) {
        var inputs = Array.from(root.querySelectorAll(validatableSelector('[data-val="true"]')));
        // querySelectorAll does not include the root element itself.
        // we could use 'matches', but that's newer than querySelectorAll so we'll keep it simple and compatible.
        if (isValidatable(root) && root.getAttribute("data-val") === "true") {
            inputs.push(root);
        }
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            cb.call(this, input);
        }
    };
    /**
     * Returns a <ul> element as a validation errors summary.
     */
    ValidationService.prototype.createSummaryDOM = function () {
        if (!Object.keys(this.summary).length) {
            return null;
        }
        var renderedMessages = [];
        var ul = document.createElement('ul');
        for (var key in this.summary) {
            // It could be that the message we are rendering belongs to one of a fieldset of multiple inputs that's not selected,
            // even if another one in the fieldset is. In that case the fieldset is valid, and we shouldn't render the message.
            var matchingElement = this.elementByUID[key];
            if (matchingElement instanceof HTMLInputElement) {
                if (matchingElement.type === "checkbox" || matchingElement.type === "radio") {
                    if (matchingElement.className === this.ValidationInputValidCssClassName) {
                        continue;
                    }
                }
            }
            // With required multiple inputs, such as a checkbox list, we'll have one message per input.
            // It's one from the inputs that's required, not all, so we should only have one message displayed.
            if (renderedMessages.indexOf(this.summary[key]) > -1) {
                continue;
            }
            var li = document.createElement('li');
            li.innerHTML = this.summary[key];
            ul.appendChild(li);
            renderedMessages.push(this.summary[key]);
        }
        return ul;
    };
    /**
     * Displays validation summary to ASP.NET Core MVC designated elements, when it actually gets updated.
     */
    ValidationService.prototype.renderSummary = function () {
        var summaryElements = document.querySelectorAll('[data-valmsg-summary="true"]');
        if (!summaryElements.length) {
            return;
        }
        // Prevents wasteful re-rendering of summary list element with identical items!
        // Using JSON.stringify for quick and painless deep compare of simple KVP. You need to sort the keys first, tho...
        var shadow = JSON.stringify(this.summary, Object.keys(this.summary).sort());
        if (shadow === this.renderedSummaryJSON) {
            return;
        }
        // Prevents wasteful re-rendering of summary list element with identical items!
        this.renderedSummaryJSON = shadow;
        var ul = this.createSummaryDOM();
        for (var i = 0; i < summaryElements.length; i++) {
            var e = summaryElements[i];
            // Remove existing list elements, but keep the summary's message.
            var listElements = e.querySelectorAll("ul");
            for (var j = 0; j < listElements.length; j++) {
                listElements[j].remove();
            }
            // Style the summary element as valid/invalid depending on whether there are any messages to display.
            if (ul && ul.hasChildNodes()) {
                this.swapClasses(e, this.ValidationSummaryCssClassName, this.ValidationSummaryValidCssClassName);
                e.appendChild(ul.cloneNode(true));
            }
            else {
                this.swapClasses(e, this.ValidationSummaryValidCssClassName, this.ValidationSummaryCssClassName);
            }
        }
    };
    /**
     * Adds an error message to an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     * @param message
     */
    ValidationService.prototype.addError = function (input, message) {
        var spans = this.getMessageFor(input);
        if (spans) {
            for (var i = 0; i < spans.length; i++) {
                var span = spans[i];
                spans[i].innerHTML = message;
                this.swapClasses(spans[i], this.ValidationMessageCssClassName, this.ValidationMessageValidCssClassName);
            }
        }
        this.highlight(input, this.ValidationInputCssClassName, this.ValidationInputValidCssClassName);
        if (input.form) {
            // Adding an error to one input should also add it to others with the same name (i.e. for radio button and checkbox lists).
            var inputs = input.form.querySelectorAll(validatableSelector("[name=\"".concat(input.name, "\"]")));
            for (var i = 0; i < inputs.length; i++) {
                this.swapClasses(inputs[i], this.ValidationInputCssClassName, this.ValidationInputValidCssClassName);
                var uid = this.getElementUID(inputs[i]);
                this.summary[uid] = message;
            }
        }
        this.renderSummary();
    };
    /**
     * Removes an error message from an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     */
    ValidationService.prototype.removeError = function (input) {
        var spans = this.getMessageFor(input);
        if (spans) {
            for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '';
                this.swapClasses(spans[i], this.ValidationMessageValidCssClassName, this.ValidationMessageCssClassName);
            }
        }
        this.unhighlight(input, this.ValidationInputCssClassName, this.ValidationInputValidCssClassName);
        // Removing an error from one input should also remove it from others with the same name (i.e. for radio button and checkbox lists).
        if (input.form) {
            var inputs = input.form.querySelectorAll(validatableSelector("[name=\"".concat(input.name, "\"]")));
            for (var i = 0; i < inputs.length; i++) {
                this.swapClasses(inputs[i], this.ValidationInputValidCssClassName, this.ValidationInputCssClassName);
                var uid = this.getElementUID(inputs[i]);
                delete this.summary[uid];
            }
        }
        this.renderSummary();
    };
    /**
     * Returns a validation Promise factory for an input element, using given validation directives.
     * @param input
     * @param directives
     */
    ValidationService.prototype.createValidator = function (input, directives) {
        var _this = this;
        return function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _i, key, directive, provider, result, valid, error, resolution;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(!this.isHidden(input) && !this.isDisabled(input))) return [3 /*break*/, 7];
                        _a = directives;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 7];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 6];
                        key = _c;
                        directive = directives[key];
                        provider = this.providers[key];
                        if (!provider) {
                            this.logger.log('aspnet-validation provider not implemented: %s', key);
                            return [3 /*break*/, 6];
                        }
                        this.logger.log("Running %s validator on element", key, input);
                        result = provider(input.value, input, directive.params);
                        valid = false;
                        error = directive.error;
                        if (!(typeof result === 'boolean')) return [3 /*break*/, 2];
                        valid = result;
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(typeof result === 'string')) return [3 /*break*/, 3];
                        valid = false;
                        error = result;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, result];
                    case 4:
                        resolution = _d.sent();
                        if (typeof resolution === 'boolean') {
                            valid = resolution;
                        }
                        else {
                            valid = false;
                            error = resolution;
                        }
                        _d.label = 5;
                    case 5:
                        if (!valid) {
                            this.addError(input, error);
                            return [2 /*return*/, false];
                        }
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7:
                        this.removeError(input);
                        return [2 /*return*/, true];
                }
            });
        }); };
    };
    /**
     * Checks if the provided input is hidden from the browser
     * @param input
     * @returns
     */
    ValidationService.prototype.isHidden = function (input) {
        return !(this.allowHiddenFields || input.offsetWidth || input.offsetHeight || input.getClientRects().length);
    };
    /**
     * Checks if the provided input is disabled
     * @param input
     * @returns
     */
    ValidationService.prototype.isDisabled = function (input) {
        // If the input is validatable, we check the `disabled` property.
        // Otherwise the `disabled` property is undefined and this returns false.
        return input.disabled;
    };
    /**
     * Adds addClass and removes removeClass
     * @param element Element to modify
     * @param addClass Class to add
     * @param removeClass Class to remove
     */
    ValidationService.prototype.swapClasses = function (element, addClass, removeClass) {
        if (addClass && !this.isDisabled(element) && !element.classList.contains(addClass)) {
            element.classList.add(addClass);
        }
        if (element.classList.contains(removeClass)) {
            element.classList.remove(removeClass);
        }
    };
    /**
     * Load default validation providers and scans the entire document when ready.
     * @param options.watch If set to true, a MutationObserver will be used to continuously watch for new elements that provide validation directives.
     * @param options.addNoValidate If set to true (the default), a novalidate attribute will be added to the containing form in validate elements.
     */
    ValidationService.prototype.bootstrap = function (options) {
        var _this = this;
        Object.assign(this.options, options);
        this.addMvcProviders();
        var document = window.document;
        var root = this.options.root;
        var init = function () {
            _this.scan(root);
            // Watch for further mutations after initial scan
            if (_this.options.watch) {
                _this.watch(root);
            }
        };
        // If the document is done loading, scan it now.
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            init();
        }
        else {
            // Otherwise wait until the document is done loading.
            document.addEventListener('DOMContentLoaded', init);
        }
    };
    /**
     * Scans the root element for any validation directives and attaches behavior to them.
     * @param root The root node to scan; if not provided, `options.root` (default: `document.body`) will be scanned
     */
    ValidationService.prototype.scan = function (root) {
        root !== null && root !== void 0 ? root : (root = this.options.root);
        this.logger.log('Scanning', root);
        this.scanMessages(root, this.pushValidationMessageSpan);
        this.scanInputs(root, this.addInput);
    };
    /**
     * Scans the root element for any validation directives and removes behavior from them.
     * @param root The root node to scan; if not provided, `options.root` (default: `document.body`) will be scanned
     */
    ValidationService.prototype.remove = function (root) {
        root !== null && root !== void 0 ? root : (root = this.options.root);
        this.logger.log('Removing', root);
        this.scanMessages(root, this.removeValidationMessageSpan);
        this.scanInputs(root, this.removeInput);
    };
    /**
     * Watches the provided root element for mutations, and scans for new validation directives to attach behavior.
     * @param root The root node to watch; if not provided, `options.root` (default: `document.body`) will be watched
     */
    ValidationService.prototype.watch = function (root) {
        var _this = this;
        root !== null && root !== void 0 ? root : (root = this.options.root);
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                _this.observed(mutation);
            });
        });
        this.observer.observe(root, {
            attributes: true,
            childList: true,
            subtree: true
        });
        this.logger.log("Watching for mutations");
    };
    ValidationService.prototype.observed = function (mutation) {
        var _a, _b, _c;
        if (mutation.type === 'childList') {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i];
                this.logger.log('Added node', node);
                if (node instanceof HTMLElement) {
                    this.scan(node);
                }
            }
            for (var i = 0; i < mutation.removedNodes.length; i++) {
                var node = mutation.removedNodes[i];
                this.logger.log('Removed node', node);
                if (node instanceof HTMLElement) {
                    this.remove(node);
                }
            }
        }
        else if (mutation.type === 'attributes') {
            if (mutation.target instanceof HTMLElement) {
                var attributeName = mutation.attributeName;
                // Special case for disabled.
                if (attributeName === 'disabled') {
                    var target = mutation.target;
                    this.reset(target);
                }
                else {
                    var oldValue = (_a = mutation.oldValue) !== null && _a !== void 0 ? _a : '';
                    var newValue = (_c = (_b = mutation.target.attributes[mutation.attributeName]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : '';
                    this.logger.log("Attribute '%s' changed from '%s' to '%s'", mutation.attributeName, oldValue, newValue, mutation.target);
                    if (oldValue !== newValue) {
                        this.scan(mutation.target);
                    }
                }
            }
        }
    };
    /**
     * Highlights invalid element by adding errorClass CSS class and removing validClass CSS class
     * @param input Element to modify
     * @param errorClass Class to add
     * @param validClass Class to remove
     */
    ValidationService.prototype.highlight = function (input, errorClass, validClass) {
        this.swapClasses(input, errorClass, validClass);
    };
    /**
     * Unhighlight valid element by removing errorClass CSS class and adding validClass CSS class
     * @param input Element to modify
     * @param errorClass Class to remove
     * @param validClass Class to add
     */
    ValidationService.prototype.unhighlight = function (input, errorClass, validClass) {
        this.swapClasses(input, validClass, errorClass);
    };
    return ValidationService;
}());


/******/ 	return __webpack_exports__;
/******/ })()
;
});