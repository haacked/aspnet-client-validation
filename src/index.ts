/**
 * A simple IDictionary<string, string>
 */
export interface StringKeyValuePair {
    [key: string]: string
}

/**
 * A duplex key-value pair for an element, by GUID or its DOM object reference.
 */
interface ElementUID {
    node: Element,
    uid: string;
}

/**
 * Parameters passed into validation providers from the element attributes.
 * error property is read from data-val-[Provider Name] attribute.
 * params property is populated from data-val-[Provider Name]-[Parameter Name] attributes.
 */
export interface ValidationDirectiveBindings {
    error: string,
    params: StringKeyValuePair
}

/**
 * A key-value pair describing what validations to enforce to an input element, with respective parameters.
 */
export type ValidationDirective = {
    [key: string]: ValidationDirectiveBindings
};

/**
 * Validation plugin signature with multitype return.
 * Boolean return signifies the validation result, which uses the default validation error message read from the element attribute.
 * String return signifies failed validation, which then will be used as the validation error message.
 * Promise return signifies asynchronous plugin behavior, with same behavior as Boolean or String.
 */
export type ValidationProvider = (value: string, element: HTMLInputElement, params: StringKeyValuePair) => boolean | string | Promise<boolean | string>;

/**
 * A callback method signature that kickstarts a new validation task for an input element, as a Boolean Promise.
 */
type Validator = () => Promise<boolean>;

/**
 * Resolves and returns the element referred by original element using ASP.NET selector logic.
 * @param elementName
 */
function getRelativeFormElement(elementName: string, selector: string) {
    // example elementName: Form.PasswordConfirm, Form.Email
    // example selector (dafuq): *.Password, *.__RequestVerificationToken
    // example result element name: Form.Password, __RequestVerificationToken

    let realSelector = selector.substr(2); // Password, __RequestVerificationToken
    let objectName = '';

    let dotLocation = elementName.lastIndexOf('.');
    if (dotLocation > -1) {
        // Form
        objectName = elementName.substr(0, dotLocation);

        // Form.Password
        let relativeElementName = objectName + '.' + realSelector;
        let relativeElement = document.getElementsByName(relativeElementName)[0];
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
export class MvcValidationProviders {
    /**
     * Validates whether the input has a value.
     */
    required: ValidationProvider = (value, element, params) => {
        return Boolean(value);
    }

    /**
     * Validates whether the input value satisfies the length contstraint.
     */
    stringLength: ValidationProvider = (value, element, params) => {
        if (!value) {
            return true;
        }

        if (params.min) {
            let min = parseInt(params.min);
            if (value.length < min) {
                return false;
            }
        }

        if (params.max) {
            let max = parseInt(params.max);
            if (value.length > max) {
                return false;
            }
        }

        return true;
    }

    /**
     * Validates whether the input value is equal to another input value.
     */
    compare: ValidationProvider = (value, element, params) => {
        if (!params.other) {
            return true;
        }

        let otherElement = getRelativeFormElement(element.name, params.other) as HTMLInputElement;
        if (!otherElement) {
            return true;
        }

        return (otherElement.value === value);
    }

    /**
     * Validates whether the input value is a number within a given range.
     */
    range: ValidationProvider = (value, element, params) => {
        if (!value) {
            return true;
        }

        let val = parseFloat(value);
        if (isNaN(val)) {
            return false;
        }

        if (params.min) {
            let min = parseFloat(params.min);
            if (val < min) {
                return false;
            }
        }

        if (params.max) {
            let max = parseFloat(params.max);
            if (val > max) {
                return false;
            }
        }

        return true;
    }

    /**
     * Validates whether the input value satisfies a regular expression pattern.
     */
    regex: ValidationProvider = (value, element, params) => {
        if (!value || !params.pattern) {
            return true;
        }

        let r = new RegExp(params.pattern);
        return r.test(value);
    }

    /**
     * Validates whether the input value is an email in accordance to RFC822 specification, with a top level domain.
     */
    email: ValidationProvider = (value, element, params) => {
        if (!value) {
            return true;
        }

        // RFC822 email address with .TLD validation
        // (c) Richard Willis, Chris Ferdinandi, MIT Licensed
        // https://gist.github.com/badsyntax/719800
        // https://gist.github.com/cferdinandi/d04aad4ce064b8da3edf21e26f8944c4

        let r = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
        return r.test(value);
    }

    /**
     * Validates whether the input value is a credit card number, with Luhn's Algorithm.
     */
    creditcard: ValidationProvider = (value, element, params) => {
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

        var nCheck = 0,
            nDigit = 0,
            bEven = false,
            n, cDigit;

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
    }

    /**
     * Validates whether the input value is a URL.
     */
    url: ValidationProvider = (value, element, params) => {
        if (!value) {
            return true;
        }

        let lowerCaseValue = value.toLowerCase();

        // Match the logic in `UrlAttribute`
        return lowerCaseValue.indexOf('http://') > -1
            || lowerCaseValue.indexOf('https://') > -1
            || lowerCaseValue.indexOf('ftp://') > -1;
    }

    /**
     * Validates whether the input value is a phone number.
     */
    phone: ValidationProvider = (value, element, params) => {
        if (!value) {
            return true;
        }

        // Allows whitespace or dash as number separator because some people like to do that...
        let consecutiveSeparator = /[\+\-\s][\-\s]/g;
        if (consecutiveSeparator.test(value)) {
            return false;
        }

        let r = /^\+?[0-9\-\s]+$/;
        return r.test(value);
    }

    /**
     * Asynchronously validates the input value to a JSON GET API endpoint.
     */
    remote: ValidationProvider = (value, element, params) => {
        if (!value) {
            return true;
        }

        // params.additionalfields: *.Email,*.Username
        let fieldSelectors: string[] = (params.additionalfields as string).split(',');
        let fields: StringKeyValuePair = {};

        for (let fieldSelector of fieldSelectors) {
            let fieldName = fieldSelector.substr(2);
            let fieldElement = getRelativeFormElement(element.name, fieldSelector) as HTMLInputElement;

            let hasValue = Boolean(fieldElement && fieldElement.value);
            if (!hasValue) {
                continue;
            }

            fields[fieldName] = fieldElement.value;
        }

        let url: string = params['url'];
        // console.log(fields);

        let encodedParams: string[] = [];
        for (let fieldName in fields) {
            let encodedParam = encodeURIComponent(fieldName) + '=' + encodeURIComponent(fields[fieldName]);
            encodedParams.push(encodedParam);
        }
        let payload = encodedParams.join('&');
        // console.log(payload);

        return new Promise((ok, reject) => {
            let request = new XMLHttpRequest();

            if (params.type === 'Post') {
                let postData = new FormData();
                for (let fieldName in fields) {
                    postData.append(fieldName, fields[fieldName]);
                }
                request.open('post', url);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                request.send(payload);
            } else {
                request.open('get', url + '?' + payload);
                request.send();
            }

            request.onload = e => {
                if (request.status >= 200 && request.status < 300) {
                    let data = JSON.parse(request.responseText);
                    ok(data);
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText,
                        data: request.responseText
                    });
                }
            };

            request.onerror = e => {
                reject({
                    status: request.status,
                    statusText: request.statusText,
                    data: request.responseText
                });
            };
        });
    }
}

/**
 * Responsibles for managing the DOM elements and running the validation providers.
 */
export class ValidationService {
    /**
     * A key-value collection of loaded validation plugins.
     */
    private providers: { [name: string]: ValidationProvider } = {};

    /**
     * A key-value collection of <span> elements for displaying validation messages for an input (by DOM ID).
     */
    private messageFor: { [id: string]: Element[] } = {};

    /**
     * A list of managed elements, each having a randomly assigned unique identifier (UID).
     */
    private elementUIDs: ElementUID[] = [];

    /**
     * A key-value collection of UID to Element for quick lookup.
     */
    private elementByUID: { [uid: string]: Element } = {};

    /**
     * A key-value collection of input UIDs for a <form> UID.
     */
    private formInputs: { [formUID: string]: string[] } = {};

    /**
     * A key-value map for input UID to its validator factory.
     */
    private validators: { [inputUID: string]: Validator } = {};

    /**
     * A key-value map for element UID to its trigger element (submit event for <form>, input event for <textarea> and <input>).
     */
    private elementEvents: { [id: string]: (e: Event, callback?: Function) => any } = {};

    /**
     * A key-value map of input UID to its validation error message.
     */
    private summary: StringKeyValuePair = {};

    /**
     * A serialized representation of the validation error message summary rendered to the user.
     */
    private renderedSummaryJSON: string;

    /**
     * In milliseconds, the rate of fire of the input validation.
     */
    debounce = 300;

    /**
     * Allow hidden fields validation     
     */
    allowHiddenFields = false;

    /**
     * Registers a new validation plugin of the given name, if not registered yet.
     * Registered plugin validates inputs with data-val-[name] attribute, used as error message.
     * @param name
     * @param callback
     */
    addProvider(name: string, callback: ValidationProvider) {
        if (this.providers[name]) {
            // First-Come-First-Serve validation plugin design.
            // Allows developers to override the default MVC Providers by adding custom providers BEFORE bootstrap() is called!
            return;
        }
        this.providers[name] = callback;
    }

    /**
     * Registers the default providers for enabling ASP.NET Core MVC client-side validation.
     */
    private addMvcProviders() {
        let mvc = new MvcValidationProviders();

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
    }

    /**
     * Scans document for all validation message <span> generated by ASP.NET Core MVC, then tracks them.
     */
    private scanMessages() {
        let validationMessageElements = document.querySelectorAll('[data-valmsg-for]');

        for (let i = 0; i < validationMessageElements.length; i++) {
            let e = validationMessageElements[i];
            let name = e.getAttribute('data-valmsg-for');

            if (!this.messageFor[name]) {
                this.messageFor[name] = [];
            }

            this.messageFor[name].push(e);
        }
    }

    /**
     * Given attribute map for an HTML input, returns the validation directives to be executed.
     * @param attributes
     */
    parseDirectives(attributes: NamedNodeMap) {
        let directives: ValidationDirective = {};
        let validationAtributes: StringKeyValuePair = {};

        let cut = 'data-val-'.length;
        for (let i = 0; i < attributes.length; i++) {
            let a = attributes[i];
            if (a.name.indexOf('data-val-') === 0) {
                let key = a.name.substr(cut);
                validationAtributes[key] = a.value;
            }
        }

        for (let key in validationAtributes) {
            if (key.indexOf('-') === -1) {
                let parameters = Object.keys(validationAtributes).filter(Q => {
                    return (Q !== key) && (Q.indexOf(key) === 0);
                });

                let directive: ValidationDirectiveBindings = {
                    error: validationAtributes[key],
                    params: {}
                };

                let pcut = (key + '-').length;
                for (let i = 0; i < parameters.length; i++) {
                    let pvalue = validationAtributes[parameters[i]];
                    let pkey = parameters[i].substr(pcut);

                    directive.params[pkey] = pvalue;
                }

                directives[key] = directive;
            }
        }

        // console.log(directives);
        return directives;
    }

    /**
     *  Returns an RFC4122 version 4 compliant GUID.
     */
    private guid4() {
        // (c) broofa, MIT Licensed
        // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Gets a UID for an DOM element.
     * @param node
     */
    private getElementUID(node: Element) {
        let x = this.elementUIDs.filter(e => {
            return e.node === node;
        })[0];

        if (x) {
            return x.uid;
        }

        let uid = this.guid4();
        this.elementUIDs.push({
            node: node,
            uid: uid
        });
        this.elementByUID[uid] = node;
        return uid;
    }

    /**
     * Returns a Promise that returns validation result for each and every inputs within the form.
     * @param formUID
     */
    private getFormValidationTask(formUID: string) {
        let formInputUIDs = this.formInputs[formUID];
        if (!formInputUIDs || formInputUIDs.length === 0) {
            return null;
        }

        let formValidators: Validator[] = [];

        for (let i = 0; i < formInputUIDs.length; i++) {
            let inputUID = formInputUIDs[i];
            formValidators.push(this.validators[inputUID]);
        }

        let tasks = formValidators.map(factory => factory());
        return Promise.all(tasks).then(result => result.every(e => e));
    }

    /**
     * Fires off validation for elements within the provided form and then calls the callback
     * @param form
     * @param callback
     */
    validateForm = (form: HTMLFormElement, callback: Function) => {
        let formUID = this.getElementUID(form);
        let formValidationEvent = this.elementEvents[formUID];
        if (formValidationEvent) {
            formValidationEvent(null, callback);
        }
    }


    /**
     * Focuses the first invalid element within the provided form
     * @param form
     */
    focusFirstInvalid = (form: HTMLFormElement) => {
        let formUID = this.getElementUID(form);
        let formInputUIDs = this.formInputs[formUID];
        let invalidFormInputUIDs = formInputUIDs.filter(uid => this.summary[uid]);

        if (invalidFormInputUIDs.length > 0) {
            var firstInvalid = this.elementByUID[invalidFormInputUIDs[0]] as HTMLElement;
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    }

    /**
     * Returns true if the provided form is valid, and then calls the callback. The form will be validated before checking, unless prevalidate is set to false
     * @param form
     * @param prevalidate
     * @param callback
     * @returns
     */
    isValid = (form: HTMLFormElement, prevalidate: boolean = true, callback: Function) => {
        if (prevalidate) {
            this.validateForm(form, callback);
        }
        let formUID = this.getElementUID(form);
        let formInputUIDs = this.formInputs[formUID];
        let invalidFormInputUIDs = formInputUIDs.filter(uid => this.summary[uid]);
        return invalidFormInputUIDs.length == 0;
    }

    /**
     * Returns true if the provided field is valid, and then calls the callback. The form will be validated before checking, unless prevalidate is set to false
     * @param form
     * @param prevalidate
     * @param callback
     * @returns
     */
    isFieldValid = (field: HTMLElement, prevalidate: boolean = true, callback: Function) => {

        if (prevalidate) {
            let form = field.closest("form");
            if (form != null) {
                this.validateForm(form, callback);
            }
        }

        let fieldUID = this.getElementUID(field);
        return this.summary[fieldUID] != null;
    }

    /**
     * Returns true if the event triggering the form submission indicates we should validate the form.
     * @param e
     */
    private shouldValidate(e: Event) {
        // Skip client-side validation if the form has been submitted via a button that has the "formnovalidate" attribute.
        return !(e !== null && e['submitter'] && e['submitter']['formNoValidate']);
    }

    /**
     * Tracks a <form> element as parent of an input UID. When the form is submitted, attempts to validate the said input asynchronously.
     * @param form
     * @param inputUID
     */
    private trackFormInput(form: HTMLFormElement, inputUID: string) {
        let formUID = this.getElementUID(form);
        if (!this.formInputs[formUID]) {
            this.formInputs[formUID] = [];
        }
        let add = (this.formInputs[formUID].indexOf(inputUID) === -1);
        if (add) {
            this.formInputs[formUID].push(inputUID);
        }

        if (this.elementEvents[formUID]) {
            return;
        }

        let cb = (e: Event, callback?: Function) => {
            if (!this.shouldValidate(e)) {
                return;
            }

            let validate = this.getFormValidationTask(formUID);
            if (!validate) {
                return;
            }

            validate.then(success => {
                let isProgrammaticValidate = !e;
                if (success) {
                    if (isProgrammaticValidate) {
                        callback(true);
                        return;
                    }
                    const validationEvent = new CustomEvent('validation',
                    {
                        detail: { valid: true }
                    });
                    form.dispatchEvent(validationEvent);
                    return;
                }

                if (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }

                const validationEvent = new CustomEvent('validation',
                {
                    detail: { valid: false }
                });
                form.dispatchEvent(validationEvent);


                if (isProgrammaticValidate) {
                    callback(false);
                }
                else {
                    this.focusFirstInvalid(form);
                }
            }).catch(error => {
                console.log(error);
            });
        };

        form.addEventListener('submit', cb);
        form.addEventListener('reset', e => {
            let uids = this.formInputs[formUID];

            for (let uid of uids) {
                let input = this.elementByUID[uid] as HTMLInputElement;
                input.classList.remove('input-validation-error');
                input.classList.remove('input-validation-valid');

                let spans = this.messageFor[input.name];
                if (spans) {
                    for (let i = 0; i < spans.length; i++) {
                        spans[i].innerHTML = '';
                    }
                }

                delete this.summary[uid];
            }
            this.renderSummary();
        });
        this.elementEvents[formUID] = cb;
    }

    /**
     * Adds an input element to be managed and validated by the service.
     * Triggers a debounced live validation when input value changes.
     * @param input
     */
    addInput(input: HTMLInputElement) {
        let uid = this.getElementUID(input);

        let directives = this.parseDirectives(input.attributes);
        let validate = this.createValidator(input, directives);

        this.validators[uid] = validate;
        if (input.form) {
            this.trackFormInput(input.form, uid);
        }

        if (this.elementEvents[uid]) {
            return;
        }

        let delay;
        let cb = e => {
            let validate = this.validators[uid];
            clearTimeout(delay);
            delay = setTimeout(validate, this.debounce);
        };

        let isDropdown = input.tagName.toLowerCase() === 'select';
        let validateEvent = input.dataset.valEvent;
        if (isDropdown) {
            input.addEventListener('change', cb);
        } else if (validateEvent) {
            input.addEventListener(validateEvent, cb);
        }
        else {
            input.addEventListener('input', cb);
        }

        this.elementEvents[uid] = cb;
    }

    /**
     * Scans the entire document for input elements to be validated.
     */
    private scanInputs() {
        let inputs = document.querySelectorAll('[data-val="true"]');

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i] as HTMLInputElement;
            this.addInput(input);
        }
    }

    /**
     * Returns a <ul> element as a validation errors summary.
     */
    createSummaryDOM() {
        if (!Object.keys(this.summary).length) {
            return null;
        }

        let ul = document.createElement('ul');
        for (let key in this.summary) {
            let li = document.createElement('li');
            li.innerHTML = this.summary[key];
            ul.appendChild(li);
        }
        return ul;
    }

    /**
     * Displays validation summary to ASP.NET Core MVC designated elements, when it actually gets updated.
     */
    private renderSummary() {
        let summaryElements = document.querySelectorAll('[data-valmsg-summary="true"]');
        if (!summaryElements.length) {
            return;
        }

        // Using JSON.stringify for quick and painless deep compare of simple KVP. You need to sort the keys first, tho...
        let shadow = JSON.stringify(this.summary, Object.keys(this.summary).sort());
        if (shadow === this.renderedSummaryJSON) {
            return;
        }

        // Prevents wasteful re-rendering of summary list element with identical items!
        // console.log('RENDERING VALIDATION SUMMARY');
        this.renderedSummaryJSON = shadow;
        let ul = this.createSummaryDOM();

        for (let i = 0; i < summaryElements.length; i++) {
            let e = summaryElements[i];
            e.innerHTML = '';
            if (ul) {
                e.className = 'validation-summary-errors';
                e.appendChild(ul.cloneNode(true));
            } else {
                e.className = 'validation-summary-valid';
            }
        }
    }

    /**
     * Adds an error message to an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     * @param message
     */
    addError(input: HTMLInputElement, message: string) {
        let spans = this.messageFor[input.name];
        if (spans) {
            for (let i = 0; i < spans.length; i++) {
                spans[i].innerHTML = message;
                spans[i].className = 'field-validation-error';
            }
        }

        input.classList.remove('input-validation-valid');
        input.classList.add('input-validation-error');

        let uid = this.getElementUID(input);
        this.summary[uid] = message;
        this.renderSummary();
    }

    /**
     * Removes an error message from an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     */
    removeError(input: HTMLInputElement) {
        let spans = this.messageFor[input.name];
        if (spans) {
            for (let i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '';
                spans[i].className = 'field-validation-valid';
            }
        }

        input.classList.remove('input-validation-error');
        input.classList.add('input-validation-valid');

        let uid = this.getElementUID(input);
        delete this.summary[uid];
        this.renderSummary();
    }

    /**
     * Returns a validation Promise factory for an input element, using given validation directives.
     * @param input
     * @param directives
     */
    createValidator(input: HTMLInputElement, directives: ValidationDirective) {
        return async () => {

            // only validate visible fields
            if (!this.isHidden(input))
            {
                for (let key in directives) {
                    let directive = directives[key];
                    let provider = this.providers[key];

                    if (!provider) {
                        console.log('aspnet-validation provider not implemented: ' + key);
                        continue;
                    }

                    let result = provider(input.value, input, directive.params);
                    let valid = false;
                    let error = directive.error;

                    if (typeof result === 'boolean') {
                        valid = result;
                    } else if (typeof result === 'string') {
                        valid = false;
                        error = result;
                    } else {
                        let resolution = await result;
                        if (typeof resolution === 'boolean') {
                            valid = resolution;
                        } else {
                            valid = false;
                            error = resolution;
                        }
                    }

                    if (!valid) {
                        this.addError(input, error);
                        return false;
                    }
                }
            }

            this.removeError(input);
            return true;

        };
    }

    /**
     * Checks if the provided input is hidden from the browser
     * @param input
     * @returns
     */
    private isHidden(input: HTMLElement) {
        return !(this.allowHiddenFields || input.offsetWidth || input.offsetHeight || input.getClientRects().length );
    }

    /**
     * Load default validation providers and scans the entire document when ready.
     */
    bootstrap() {
        this.addMvcProviders();
        let document = window.document;
        if(document.readyState === 'complete') {
            this.scan();
        }
        else {
            window.document.addEventListener('DOMContentLoaded', event => {
                this.scan();
            });
        }
    }

    private scan() {
        this.scanMessages();
        this.scanInputs();
    }
}
