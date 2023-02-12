(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["aspnetValidation"] = factory();
	else
		root["aspnetValidation"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: MvcValidationProviders, ValidationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MvcValidationProviders", function() { return MvcValidationProviders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationService", function() { return ValidationService; });
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
var nullLogger = new (/** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.log = function (_) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return class_1;
}()))();
/**
 * Resolves and returns the element referred by original element using ASP.NET selector logic.
 * @param elementName
 */
function getRelativeFormElement(elementName, selector) {
    // example elementName: Form.PasswordConfirm, Form.Email
    // example selector (dafuq): *.Password, *.__RequestVerificationToken
    // example result element name: Form.Password, __RequestVerificationToken
    var realSelector = selector.substr(2); // Password, __RequestVerificationToken
    var objectName = '';
    var dotLocation = elementName.lastIndexOf('.');
    if (dotLocation > -1) {
        // Form
        objectName = elementName.substr(0, dotLocation);
        // Form.Password
        var relativeElementName = objectName + '.' + realSelector;
        var relativeElement = document.getElementsByName(relativeElementName)[0];
        if (relativeElement) {
            return relativeElement;
        }
    }
    // __RequestVerificationToken
    return document.getElementsByName(realSelector)[0];
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
            return Boolean(value);
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
            var otherElement = getRelativeFormElement(element.name, params.other);
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
                var fieldElement = getRelativeFormElement(element.name, fieldSelector);
                var hasValue = Boolean(fieldElement && fieldElement.value);
                if (!hasValue) {
                    continue;
                }
                fields[fieldName] = fieldElement.value;
            }
            var url = params['url'];
            // console.log(fields);
            var encodedParams = [];
            for (var fieldName in fields) {
                var encodedParam = encodeURIComponent(fieldName) + '=' + encodeURIComponent(fields[fieldName]);
                encodedParams.push(encodedParam);
            }
            var payload = encodedParams.join('&');
            // console.log(payload);
            return new Promise(function (ok, reject) {
                var request = new XMLHttpRequest();
                if (params.type === 'Post') {
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
 * Responsibles for managing the DOM elements and running the validation providers.
 */
var ValidationService = /** @class */ (function () {
    function ValidationService(logger) {
        var _this = this;
        /**
         * A key-value collection of loaded validation plugins.
         */
        this.providers = {};
        /**
         * A key-value collection of <span> elements for displaying validation messages for an input (by DOM ID).
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
         * A key-value map for element UID to its trigger element (submit event for <form>, input event for <textarea> and <input>).
         */
        this.elementEvents = {};
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
         * @param form
         * @param callback
         */
        this.validateForm = function (form, callback) {
            var formUID = _this.getElementUID(form);
            var formValidationEvent = _this.elementEvents[formUID];
            if (formValidationEvent) {
                formValidationEvent(null, callback);
            }
        };
        /**
         * Focuses the first invalid element within the provided form
         * @param form
         */
        this.focusFirstInvalid = function (form) {
            var formUID = _this.getElementUID(form);
            var formInputUIDs = _this.formInputs[formUID];
            var invalidFormInputUIDs = formInputUIDs.filter(function (uid) { return _this.summary[uid]; });
            if (invalidFormInputUIDs.length > 0) {
                var firstInvalid = _this.elementByUID[invalidFormInputUIDs[0]];
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        };
        /**
         * Returns true if the provided form is valid, and then calls the callback. The form will be validated before checking, unless prevalidate is set to false
         * @param form
         * @param prevalidate
         * @param callback
         * @returns
         */
        this.isValid = function (form, prevalidate, callback) {
            if (prevalidate === void 0) { prevalidate = true; }
            if (prevalidate) {
                _this.validateForm(form, callback);
            }
            var formUID = _this.getElementUID(form);
            var formInputUIDs = _this.formInputs[formUID];
            var invalidFormInputUIDs = formInputUIDs.filter(function (uid) { return _this.summary[uid]; });
            return invalidFormInputUIDs.length == 0;
        };
        /**
         * Returns true if the provided field is valid, and then calls the callback. The form will be validated before checking, unless prevalidate is set to false
         * @param form
         * @param prevalidate
         * @param callback
         * @returns
         */
        this.isFieldValid = function (field, prevalidate, callback) {
            if (prevalidate === void 0) { prevalidate = true; }
            if (prevalidate) {
                var form = field.closest("form");
                if (form != null) {
                    _this.validateForm(form, callback);
                }
            }
            var fieldUID = _this.getElementUID(field);
            return _this.summary[fieldUID] != null;
        };
        /**
         * Override CSS class name for input validation. Default: 'input-validation-error'
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
        this.logger.log("Registered provider: " + name);
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
     * Scans document for all validation message <span> generated by ASP.NET Core MVC, then tracks them.
     */
    ValidationService.prototype.scanMessages = function (root) {
        var validationMessageElements = Array.from(root.querySelectorAll('[data-valmsg-for]'));
        // querySelectorAll does not include the root element itself.
        // we could use 'matches', but that's newer than querySelectorAll so we'll keep it simple and compatible.
        if (root.hasAttribute("data-valmsg-for")) {
            validationMessageElements.push(root);
        }
        for (var i = 0; i < validationMessageElements.length; i++) {
            var e = validationMessageElements[i];
            var name_1 = e.getAttribute('data-valmsg-for');
            if (!this.messageFor[name_1]) {
                this.messageFor[name_1] = [];
            }
            this.messageFor[name_1].push(e);
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
        // console.log(directives);
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
            return null;
        }
        var formValidators = [];
        for (var i = 0; i < formInputUIDs.length; i++) {
            var inputUID = formInputUIDs[i];
            formValidators.push(this.validators[inputUID]);
        }
        var tasks = formValidators.map(function (factory) { return factory(); });
        return Promise.all(tasks).then(function (result) { return result.every(function (e) { return e; }); });
    };
    /**
     * Returns true if the event triggering the form submission indicates we should validate the form.
     * @param e
     */
    ValidationService.prototype.shouldValidate = function (e) {
        // Skip client-side validation if the form has been submitted via a button that has the "formnovalidate" attribute.
        return !(e !== null && e['submitter'] && e['submitter']['formNoValidate']);
    };
    /**
     * Tracks a <form> element as parent of an input UID. When the form is submitted, attempts to validate the said input asynchronously.
     * @param form
     * @param inputUID
     */
    ValidationService.prototype.trackFormInput = function (form, inputUID) {
        var _this = this;
        var formUID = this.getElementUID(form);
        if (!this.formInputs[formUID]) {
            this.formInputs[formUID] = [];
        }
        var add = (this.formInputs[formUID].indexOf(inputUID) === -1);
        if (add) {
            this.formInputs[formUID].push(inputUID);
        }
        if (this.elementEvents[formUID]) {
            return;
        }
        var cb = function (e, callback) {
            if (!_this.shouldValidate(e)) {
                return;
            }
            var validate = _this.getFormValidationTask(formUID);
            if (!validate) {
                return;
            }
            //Prevent the submit before validation
            if (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
            validate.then(function (success) {
                var isProgrammaticValidate = !e;
                if (success) {
                    if (isProgrammaticValidate) {
                        callback(true);
                        return;
                    }
                    var validationEvent_1 = new CustomEvent('validation', {
                        detail: { valid: true }
                    });
                    form.dispatchEvent(validationEvent_1);
                    //Resubmit the form here, after the async validation is completed.
                    form.requestSubmit();
                    return;
                }
                var validationEvent = new CustomEvent('validation', {
                    detail: { valid: false }
                });
                form.dispatchEvent(validationEvent);
                if (isProgrammaticValidate) {
                    callback(false);
                }
                else {
                    _this.focusFirstInvalid(form);
                }
            }).catch(function (error) {
                console.log(error);
            });
        };
        form.addEventListener('submit', cb);
        form.addEventListener('reset', function (e) {
            var uids = _this.formInputs[formUID];
            for (var _i = 0, uids_1 = uids; _i < uids_1.length; _i++) {
                var uid = uids_1[_i];
                var input = _this.elementByUID[uid];
                input.classList.remove(_this.ValidationInputCssClassName);
                input.classList.remove(_this.ValidationInputValidCssClassName);
                var spans = _this.messageFor[input.name];
                if (spans) {
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].innerHTML = '';
                    }
                }
                delete _this.summary[uid];
            }
            _this.renderSummary();
        });
        this.elementEvents[formUID] = cb;
    };
    /**
     * Adds an input element to be managed and validated by the service.
     * Triggers a debounced live validation when input value changes.
     * @param input
     */
    ValidationService.prototype.addInput = function (input) {
        var _this = this;
        var uid = this.getElementUID(input);
        var directives = this.parseDirectives(input.attributes);
        var validate = this.createValidator(input, directives);
        this.validators[uid] = validate;
        if (input.form) {
            this.trackFormInput(input.form, uid);
        }
        if (this.elementEvents[uid]) {
            return;
        }
        var delay;
        var cb = function (e) {
            var validate = _this.validators[uid];
            clearTimeout(delay);
            delay = setTimeout(validate, _this.debounce);
        };
        var isDropdown = input.tagName.toLowerCase() === 'select';
        var validateEvent = input.dataset.valEvent;
        if (isDropdown) {
            input.addEventListener('change', cb);
        }
        else if (validateEvent) {
            input.addEventListener(validateEvent, cb);
        }
        else {
            input.addEventListener('input', cb);
        }
        this.elementEvents[uid] = cb;
    };
    /**
     * Scans the entire document for input elements to be validated.
     */
    ValidationService.prototype.scanInputs = function (root) {
        var inputs = Array.from(root.querySelectorAll('[data-val="true"]'));
        // querySelectorAll does not include the root element itself.
        // we could use 'matches', but that's newer than querySelectorAll so we'll keep it simple and compatible.
        if (root.getAttribute("data-val") === "true") {
            inputs.push(root);
        }
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            this.addInput(input);
        }
    };
    /**
     * Returns a <ul> element as a validation errors summary.
     */
    ValidationService.prototype.createSummaryDOM = function () {
        if (!Object.keys(this.summary).length) {
            return null;
        }
        var ul = document.createElement('ul');
        for (var key in this.summary) {
            var li = document.createElement('li');
            li.innerHTML = this.summary[key];
            ul.appendChild(li);
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
        // Using JSON.stringify for quick and painless deep compare of simple KVP. You need to sort the keys first, tho...
        var shadow = JSON.stringify(this.summary, Object.keys(this.summary).sort());
        if (shadow === this.renderedSummaryJSON) {
            return;
        }
        // Prevents wasteful re-rendering of summary list element with identical items!
        // console.log('RENDERING VALIDATION SUMMARY');
        this.renderedSummaryJSON = shadow;
        var ul = this.createSummaryDOM();
        for (var i = 0; i < summaryElements.length; i++) {
            var e = summaryElements[i];
            e.innerHTML = '';
            if (ul) {
                e.className = 'validation-summary-errors';
                e.appendChild(ul.cloneNode(true));
            }
            else {
                e.className = 'validation-summary-valid';
            }
        }
    };
    /**
     * Adds an error message to an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     * @param message
     */
    ValidationService.prototype.addError = function (input, message) {
        var spans = this.messageFor[input.name];
        if (spans) {
            for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = message;
                spans[i].className = this.ValidationMessageCssClassName;
            }
        }
        input.classList.remove(this.ValidationInputValidCssClassName);
        input.classList.add(this.ValidationInputCssClassName);
        var uid = this.getElementUID(input);
        this.summary[uid] = message;
        this.renderSummary();
    };
    /**
     * Removes an error message from an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     */
    ValidationService.prototype.removeError = function (input) {
        var spans = this.messageFor[input.name];
        if (spans) {
            for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '';
                spans[i].className = this.ValidationMessageValidCssClassName;
            }
        }
        input.classList.remove(this.ValidationInputCssClassName);
        input.classList.add(this.ValidationInputValidCssClassName);
        var uid = this.getElementUID(input);
        delete this.summary[uid];
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
            var _a, _b, _i, key, directive, provider, result, valid, error, resolution;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.isHidden(input)) return [3 /*break*/, 7];
                        _a = [];
                        for (_b in directives)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        key = _a[_i];
                        directive = directives[key];
                        provider = this.providers[key];
                        if (!provider) {
                            console.log('aspnet-validation provider not implemented: ' + key);
                            return [3 /*break*/, 6];
                        }
                        this.logger.log("Running " + key + " validator on element", input);
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
                        resolution = _c.sent();
                        if (typeof resolution === 'boolean') {
                            valid = resolution;
                        }
                        else {
                            valid = false;
                            error = resolution;
                        }
                        _c.label = 5;
                    case 5:
                        if (!valid) {
                            this.addError(input, error);
                            return [2 /*return*/, false];
                        }
                        _c.label = 6;
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
     * Load default validation providers and scans the entire document when ready.
     * @param options.watch If set to true, a MutationObserver will be used to continuously watch for new elements that provide validation directives.
     */
    ValidationService.prototype.bootstrap = function (options) {
        var _this = this;
        options = options || {};
        this.addMvcProviders();
        var document = window.document;
        // If the document is done loading, scan it now.
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.scan(options.root || window.document.body);
        }
        else {
            // Otherwise wait until the document is done loading.
            window.document.addEventListener('DOMContentLoaded', function (event) {
                _this.scan(options.root || window.document.body);
            });
        }
        // Watch for further mutations
        if (options.watch) {
            this.watch(options.root);
        }
    };
    /**
     * Scans the provided root element for any validation directives and attaches behavior to them.
     */
    ValidationService.prototype.scan = function (root) {
        this.scanMessages(root);
        this.scanInputs(root);
    };
    /**
     * Watches the provided root element for mutations, and scans for new validation directives to attach behavior.
     * @param root The root element to use, defaults to the document.documentElement.
     */
    ValidationService.prototype.watch = function (root) {
        var _this = this;
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
        if (mutation.type === 'childList') {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i];
                if (node instanceof HTMLElement) {
                    this.scan(node);
                }
            }
        }
        else if (mutation.type === 'attributes') {
            if (mutation.target instanceof HTMLElement) {
                this.scan(mutation.target);
            }
        }
    };
    return ValidationService;
}());



/***/ })

/******/ });
});