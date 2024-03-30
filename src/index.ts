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
 * A simple logging interface that mirrors the Console object.
 */
export interface Logger {
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
}

const nullLogger = new (class implements Logger {
    log(_: string, ..._args: any[]): void { }
    warn = globalThis.console.warn;
})();

/**
 * An `HTMLElement` that can be validated (`input`, `select`, `textarea`).
 */
export type ValidatableElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Checks if `element` is validatable (`input`, `select`, `textarea`).
 * @param element The element to check.
 * @returns `true` if validatable, otherwise `false`.
 */
export const isValidatable = (element: Node): element is ValidatableElement =>
    element instanceof HTMLInputElement
    || element instanceof HTMLSelectElement
    || element instanceof HTMLTextAreaElement;

const validatableElementTypes = ['input', 'select', 'textarea'];

/**
 * Generates a selector to match validatable elements (`input`, `select`, `textarea`).
 * @param selector An optional selector to apply to the valid input types, e.g. `[data-val="true"]`.
 * @returns The validatable elements.
 */
const validatableSelector = (selector?: string) =>
    validatableElementTypes.map(t => `${t}${selector || ''}`).join(',');

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
export type ValidationProvider = (value: string, element: ValidatableElement, params: StringKeyValuePair) => boolean | string | Promise<boolean | string>;

/**
 * Callback to receive the result of validating a form.
 */
export type ValidatedCallback = (success: boolean) => void;

interface ValidationEventCallback<TEvent extends Event = Event> {
    (e?: TEvent, callback?: ValidatedCallback): void;
    remove?: () => void;
}

/**
 * A callback method signature that kickstarts a new validation task for an input element, as a Boolean Promise.
 */
type Validator = () => Promise<boolean>;

/**
 * Resolves and returns the element referred by original element using ASP.NET selector logic.
 * @param element - The input to validate
 * @param selector - Used to find the field. Ex. *.Password where * replaces whatever prefixes asp.net might add.
 */
function getRelativeFormElement(element: ValidatableElement, selector: string): ValidatableElement {
    // example elementName: Form.PasswordConfirm, Form.Email
    // example selector (dafuq): *.Password, *.__RequestVerificationToken
    // example result element name: Form.Password, __RequestVerificationToken

    let elementName = element.name;
    let selectedName = selector.substring(2); // Password, __RequestVerificationToken
    let objectName = '';

    let dotLocation = elementName.lastIndexOf('.');
    if (dotLocation > -1) {
        // Form
        objectName = elementName.substring(0, dotLocation);

        // Form.Password
        const relativeElementName = objectName + '.' + selectedName;
        const relativeElement = document.getElementsByName(relativeElementName)[0];
        if (isValidatable(relativeElement)) {
            return relativeElement;
        }
    }

    // __RequestVerificationToken
    return element.form.querySelector(validatableSelector(`[name=${selectedName}]`));
}

/**
 * Contains default implementations for ASP.NET Core MVC validation attributes.
 */
export class MvcValidationProviders {
    /**
     * Validates whether the input has a value.
     */
    required: ValidationProvider = (value, element, params) => {
        // Handle single and multiple checkboxes/radio buttons.
        const elementType = element.type.toLowerCase();
        if (elementType === "checkbox" || elementType === "radio") {
            const allElementsOfThisName = Array.from(element.form.querySelectorAll(validatableSelector(`[name='${element.name}'][type='${elementType}']`)));
            for (let element of allElementsOfThisName) {
                if (element instanceof HTMLInputElement && element.checked === true) {
                    return true;
                }
            }

            // Checkboxes do not submit a value when unchecked. To work around this, platforms such as ASP.NET render a
            // hidden input with the same name as the checkbox so that a value ("false") is still submitted even when
            // the checkbox is not checked. We check this special case here.
            if (elementType === "checkbox") {
                const checkboxHiddenInput = element.form.querySelector(`input[name='${element.name}'][type='hidden']`);
                if (checkboxHiddenInput instanceof HTMLInputElement && checkboxHiddenInput.value === "false") {
                    return true;
                }
            }

            return false;
        }
        // Default behavior otherwise.
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

        let otherElement = getRelativeFormElement(element, params.other);
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
            let fieldElement = getRelativeFormElement(element, fieldSelector);

            let hasValue = Boolean(fieldElement && fieldElement.value);
            if (!hasValue) {
                continue;
            }

            if (fieldElement instanceof HTMLInputElement &&
                (fieldElement.type === 'checkbox' || fieldElement.type === 'radio')) {
                fields[fieldName] = fieldElement.checked ? fieldElement.value : '';
            } else {
                fields[fieldName] = fieldElement.value;
            }
        }

        let url: string = params['url'];

        let encodedParams: string[] = [];
        for (let fieldName in fields) {
            let encodedParam = encodeURIComponent(fieldName) + '=' + encodeURIComponent(fields[fieldName]);
            encodedParams.push(encodedParam);
        }
        let payload = encodedParams.join('&');

        return new Promise((ok, reject) => {
            let request = new XMLHttpRequest();

            if (params.type && params.type.toLowerCase() === 'post') {
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
 * Configuration for @type {ValidationService}.
 */
export interface ValidationServiceOptions {
    watch: boolean;
    root: ParentNode;
    addNoValidate: boolean;
}

/**
 * Responsible for managing the DOM elements and running the validation providers.
 */
export class ValidationService {
    /**
     * A key-value collection of loaded validation plugins.
     */
    private providers: { [name: string]: ValidationProvider } = {};

    /**
     * A key-value collection of form UIDs and their <span> elements for displaying validation messages for an input (by DOM name).
     */
    private messageFor: { [formUID: string]: { [name: string]: Element[] } } = {};

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
     * A key-value map for form UID to its trigger element (submit event for <form>).
     */
    private formEvents: { [formUID: string]: ValidationEventCallback<SubmitEvent> } = {};

    /**
     * A key-value map for element UID to its trigger element (input event for <textarea> and <input>, change event for <select>).
     */
    private inputEvents: { [inputUID: string]: ValidationEventCallback } = {};

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

    private logger: Logger;
    observer?: MutationObserver;

    constructor(logger?: Logger) {
        this.logger = logger || nullLogger;
    }

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
        this.logger.log("Registered provider: %s", name);
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
     * Scans `root` for all validation message <span> generated by ASP.NET Core MVC, then calls `cb` for each.
     * @param root The root node to scan
     * @param cb The callback to invoke with each form and span
     */
    private scanMessages(root: ParentNode, cb: (form: HTMLFormElement, span: HTMLElement) => void) {
        /* If a validation span explicitly declares a form, we group the span with that form. */
        let validationMessageElements = Array.from(root.querySelectorAll<HTMLElement>('span[form]'));
        for (let span of validationMessageElements) {
            let form = document.getElementById(span.getAttribute('form'));
            if (form instanceof HTMLFormElement) {
                cb.call(this, form, span);
            }
        }

        // Otherwise if a validation message span is inside a form, we group the span with the form it's inside.
        let forms = Array.from(root.querySelectorAll<HTMLFormElement>('form'));
        if (root instanceof HTMLFormElement) {
            // querySelectorAll does not include the root element itself.
            // we could use 'matches', but that's newer than querySelectorAll so we'll keep it simple and compatible.
            forms.push(root);
        }
        // If root is the descendant of a form, we want to include that form too.
        const containingForm = (root instanceof Element) ? root.closest('form') : null;
        if (containingForm) {
            forms.push(containingForm);
        }

        for (let form of forms) {
            let validationMessageElements = Array.from(form.querySelectorAll<HTMLElement>('[data-valmsg-for]'));

            for (let span of validationMessageElements) {
                cb.call(this, form, span);
            }
        }
    }

    private pushValidationMessageSpan(form: HTMLElement, span: HTMLElement) {
        let formId = this.getElementUID(form);
        let formSpans = this.messageFor[formId] ??= {};

        let messageForId = span.getAttribute('data-valmsg-for');
        if (!messageForId) return;

        let spans = formSpans[messageForId] ??= [];
        if (spans.indexOf(span) < 0) {
            spans.push(span);
        }
        else {
            this.logger.log("Validation element for '%s' is already tracked", name, span);
        }
    }

    private removeValidationMessageSpan(form: HTMLElement, span: HTMLElement) {
        let formId = this.getElementUID(form);
        let formSpans = this.messageFor[formId];
        if (!formSpans) return;

        let messageForId = span.getAttribute('data-valmsg-for');
        if (!messageForId) return;

        let spans = formSpans[messageForId];
        if (!spans) {
            return;
        }
        let index = spans.indexOf(span);
        if (index >= 0) {
            spans.splice(index, 1);
        }
        else {
            this.logger.log("Validation element for '%s' was already removed", name, span);
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

        return directives;
    }

    /**
     *  Returns an RFC4122 version 4 compliant GUID.
     */
    private guid4() {
        // (c) broofa, MIT Licensed
        // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
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
            return Promise.resolve(true);
        }

        let formValidators: Validator[] = [];

        for (let i = 0; i < formInputUIDs.length; i++) {
            let inputUID = formInputUIDs[i];
            const validator = this.validators[inputUID];
            if (validator) {
                formValidators.push(validator);
            }
        }

        let tasks = formValidators.map(factory => factory());
        return Promise.all(tasks).then(result => result.every(e => e));
    }

    // Retrieves the validation span for the input.
    private getMessageFor(input: ValidatableElement) {
        if (!input.form) {
            return undefined;
        }
        let formId = this.getElementUID(input.form);
        return this.messageFor[formId]?.[input.name];
    }

    /**
     * Fires off validation for elements within the provided form and then calls the callback
     * @param form The form to validate.
     * @param callback Receives true or false indicating validity after all validation is complete.
     */
    validateForm = (form: HTMLFormElement, callback?: ValidatedCallback) => {
        if (!(form instanceof HTMLFormElement)) {
            throw new Error('validateForm() can only be called on <form> elements');
        }
        let formUID = this.getElementUID(form);
        let formValidationEvent = this.formEvents[formUID];
        if (formValidationEvent) {
            formValidationEvent(undefined, callback);
        }
    }

    /**
     * Fires off validation for the provided element and then calls the callback
     * @param field The element to validate.
     * @param callback Receives true or false indicating validity after all validation is complete.
     */
    validateField = (field: ValidatableElement, callback?: ValidatedCallback) => {
        let fieldUID = this.getElementUID(field);
        let fieldValidationEvent = this.inputEvents[fieldUID];
        if (fieldValidationEvent) {
            fieldValidationEvent(undefined, callback);
        }
    }

    /**
     * Called before validating form submit events.
     * Default calls `preventDefault()` and `stopImmediatePropagation()`.
     * @param submitEvent The `SubmitEvent`.
     */
    preValidate = (submitEvent: SubmitEvent) => {
        submitEvent.preventDefault();
        submitEvent.stopImmediatePropagation();
    }

    /**
     * Handler for validated form submit events.
     * Default calls `submitValidForm(form, submitEvent)` on success
     * and `focusFirstInvalid(form)` on failure.
     * @param form The form that has been validated.
     * @param success The validation result.
     * @param submitEvent The `SubmitEvent`.
     */
    handleValidated = (form: HTMLFormElement, success: boolean, submitEvent?: SubmitEvent) => {
        if (!(form instanceof HTMLFormElement)) {
            throw new Error('handleValidated() can only be called on <form> elements');
        }
        if (success) {
            if (submitEvent) {
                this.submitValidForm(form, submitEvent);
            }
        }
        else {
            this.focusFirstInvalid(form);
        }
    }

    /**
     * Dispatches a new `SubmitEvent` on the provided form,
     * then calls `form.submit()` unless `submitEvent` is cancelable
     * and `preventDefault()` was called by a handler that received the new event.
     *
     * This is equivalent to `form.requestSubmit()`, but more flexible.
     * @param form The validated form to submit
     * @param submitEvent The `SubmitEvent`.
     */
    submitValidForm = (form: HTMLFormElement, submitEvent: SubmitEvent) => {
        if (!(form instanceof HTMLFormElement)) {
            throw new Error('submitValidForm() can only be called on <form> elements');
        }
        const newEvent = new SubmitEvent('submit', submitEvent);
        if (form.dispatchEvent(newEvent)) {
            // Because the submitter is not propagated when calling
            // form.submit(), we recreate it here.
            const submitter = submitEvent.submitter;
            const initialFormAction = form.action;
            if (submitter) {
                const name = submitter.getAttribute('name');
                // If name is null, a submit button is not submitted.
                if (name) {
                    const submitterInput = document.createElement('input');
                    submitterInput.type = 'hidden';
                    submitterInput.name = name;
                    submitterInput.value = submitter.getAttribute('value');
                    form.appendChild(submitterInput)
                }

                const formAction = submitter.getAttribute('formaction');
                if (formAction) {
                    form.action = formAction;
                }
            }

            try {
                form.submit();
            } finally {
                form.action = initialFormAction;
            }
        }
    }

    /**
     * Focuses the first invalid element within the provided form
     * @param form
     */
    focusFirstInvalid = (form: HTMLFormElement) => {
        if (!(form instanceof HTMLFormElement)) {
            throw new Error('focusFirstInvalid() can only be called on <form> elements');
        }
        let formUID = this.getElementUID(form);
        let formInputUIDs = this.formInputs[formUID];
        let invalidFormInputUID = formInputUIDs?.find(uid => this.summary[uid]);

        if (invalidFormInputUID) {
            const firstInvalid = this.elementByUID[invalidFormInputUID];
            if (firstInvalid instanceof HTMLElement) {
                firstInvalid.focus();
            }
        }
    }

    /**
     * Returns true if the provided form is currently valid.
     * The form will be validated unless prevalidate is set to false.
     * @param form The form to validate.
     * @param prevalidate Whether the form should be validated before returning.
     * @param callback A callback that receives true or false indicating validity after all validation is complete. Ignored if prevalidate is false.
     * @returns The current state of the form. May be inaccurate if any validation is asynchronous (e.g. remote); consider using `callback` instead.
     */
    isValid = (form: HTMLFormElement, prevalidate: boolean = true, callback?: ValidatedCallback) => {
        if (!(form instanceof HTMLFormElement)) {
            throw new Error('isValid() can only be called on <form> elements');
        }
        if (prevalidate) {
            this.validateForm(form, callback);
        }
        let formUID = this.getElementUID(form);
        let formInputUIDs = this.formInputs[formUID];
        let formIsInvalid = formInputUIDs?.some(uid => this.summary[uid]) === true;
        return !formIsInvalid;
    }

    /**
     * Returns true if the provided field is currently valid.
     * The field will be validated unless prevalidate is set to false.
     * @param field The field to validate.
     * @param prevalidate Whether the field should be validated before returning.
     * @param callback A callback that receives true or false indicating validity after all validation is complete. Ignored if prevalidate is false.
     * @returns The current state of the field. May be inaccurate if any validation is asynchronous (e.g. remote); consider using `callback` instead.
     */
    isFieldValid = (field: ValidatableElement, prevalidate: boolean = true, callback?: ValidatedCallback) => {
        if (prevalidate) {
            this.validateField(field, callback);
        }

        let fieldUID = this.getElementUID(field);
        return this.summary[fieldUID] === undefined;
    }

    /**
     * Returns true if the event triggering the form submission indicates we should validate the form.
     * @param e
     */
    private shouldValidate(e?: Event) {
        // Skip client-side validation if the form has been submitted via a button that has the "formnovalidate" attribute.
        return !(e && e['submitter'] && e['submitter']['formNoValidate']);
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

        let validating = false;
        let cb: ValidationEventCallback<SubmitEvent> = (e, callback) => {
            // Prevent recursion
            if (validating) {
                return;
            }

            if (!this.shouldValidate(e)) {
                return;
            }

            let validate = this.getFormValidationTask(formUID);
            if (!validate) {
                return;
            }

            //`preValidate` typically prevents submit before validation
            if (e) {
                this.preValidate(e);
            }

            validating = true;
            this.logger.log('Validating', form);

            validate.then(async success => {
                this.logger.log('Validated (success = %s)', success, form);
                if (callback) {
                    callback(success);
                    return;
                }

                const validationEvent = new CustomEvent('validation',
                    {
                        detail: { valid: success }
                    });
                form.dispatchEvent(validationEvent);

                // Firefox fix: redispatch 'submit' after finished handling this event
                await new Promise(resolve => setTimeout(resolve, 0));
                this.handleValidated(form, success, e);
            }).catch(error => {
                this.logger.log('Validation error', error);
            }).finally(() => {
                validating = false;
            });
        };

        form.addEventListener('submit', cb);

        const cbReset = (e: Event) => {
            const uids = this.formInputs[formUID];

            for (let uid of uids) {
                this.resetField(uid);
            }
            this.renderSummary();
        };
        form.addEventListener('reset', cbReset);

        cb.remove = () => {
            form.removeEventListener('submit', cb);
            form.removeEventListener('reset', cbReset);
        }

        this.formEvents[formUID] = cb;
    }

    /*
        Reset the state of a validatable input. This is used when it's enabled or disabled.
    */
    reset(input: HTMLElement) {
        if (this.isDisabled(input)) {
            this.resetField(this.getElementUID(input));
        }
        else {
            this.scan(input);
        }
    }

    private resetField(inputUID: string) {
        let input = this.elementByUID[inputUID];
        if (input.classList.contains(this.ValidationInputCssClassName)) {
            input.classList.remove(this.ValidationInputCssClassName);
        }
        if (input.classList.contains(this.ValidationInputValidCssClassName)) {
            input.classList.remove(this.ValidationInputValidCssClassName);
        }

        let spans = isValidatable(input) && this.getMessageFor(input);
        if (spans) {
            for (let i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '';
            }
        }

        delete this.summary[inputUID];
    }

    private untrackFormInput(form: HTMLFormElement, inputUID: string) {
        let formUID = this.getElementUID(form);
        let formInputUIDs = this.formInputs[formUID]
        if (!formInputUIDs) {
            return;
        }
        let indexToRemove = formInputUIDs.indexOf(inputUID);
        if (indexToRemove >= 0) {
            formInputUIDs.splice(indexToRemove, 1);

            if (!formInputUIDs.length) {
                this.formEvents[formUID]?.remove();
                delete this.formEvents[formUID];
                delete this.formInputs[formUID];
                delete this.messageFor[formUID];
            }
        }
        else {
            this.logger.log("Form input for UID '%s' was already removed", inputUID);
        }
    }

    /**
     * Adds an input element to be managed and validated by the service.
     * Triggers a debounced live validation when input value changes.
     * @param input
     */
    addInput(input: ValidatableElement) {
        let uid = this.getElementUID(input);

        let directives = this.parseDirectives(input.attributes);
        this.validators[uid] = this.createValidator(input, directives);

        if (input.form) {
            this.trackFormInput(input.form, uid);
        }

        if (this.inputEvents[uid]) {
            return;
        }

        let debounceTimeoutID = 0;
        const cb: ValidationEventCallback = (event, callback) => {
            clearTimeout(debounceTimeoutID);
            debounceTimeoutID = setTimeout(() => {
                let validate = this.validators[uid];
                if (!validate) return;

                this.logger.log('Validating', { event });
                validate()
                    .then(callback)
                    .catch(error => {
                        this.logger.log('Validation error', error);
                    });
            }, this.debounce);
        };

        const validateEvent = input.dataset.valEvent || input instanceof HTMLSelectElement ? 'change' : 'input';
        input.addEventListener(validateEvent, cb);
        cb.remove = () => input.removeEventListener(validateEvent, cb);

        this.inputEvents[uid] = cb;
    }

    removeInput(input: ValidatableElement) {
        let uid = this.getElementUID(input);

        // Clean up event listener
        let cb = this.inputEvents[uid];
        if (cb?.remove) {
            cb.remove();
            delete cb.remove;
        }

        delete this.summary[uid];
        delete this.inputEvents[uid];
        delete this.validators[uid];

        if (input.form) {
            this.untrackFormInput(input.form, uid);
        }
    }

    /**
     * Scans `root` for input elements to be validated, then calls `cb` for each.
     * @param root The root node to scan
     * @param cb The callback to invoke with each input
     */
    private scanInputs(root: ParentNode, cb: (input: ValidatableElement) => void) {
        let inputs = Array.from(root.querySelectorAll<ValidatableElement>(validatableSelector('[data-val="true"]')));

        // querySelectorAll does not include the root element itself.
        // we could use 'matches', but that's newer than querySelectorAll so we'll keep it simple and compatible.
        if (isValidatable(root) && root.getAttribute("data-val") === "true") {
            inputs.push(root);
        }

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            cb.call(this, input);
        }
    }

    /**
     * Returns a <ul> element as a validation errors summary.
     */
    createSummaryDOM() {
        if (!Object.keys(this.summary).length) {
            return null;
        }

        let renderedMessages = [];
        let ul = document.createElement('ul');
        for (let key in this.summary) {
            // It could be that the message we are rendering belongs to one of a fieldset of multiple inputs that's not selected,
            // even if another one in the fieldset is. In that case the fieldset is valid, and we shouldn't render the message.
            const matchingElement = this.elementByUID[key];
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

            let li = document.createElement('li');
            li.innerHTML = this.summary[key];
            ul.appendChild(li);
            renderedMessages.push(this.summary[key]);
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

        // Prevents wasteful re-rendering of summary list element with identical items!
        // Using JSON.stringify for quick and painless deep compare of simple KVP. You need to sort the keys first, tho...
        let shadow = JSON.stringify(this.summary, Object.keys(this.summary).sort());
        if (shadow === this.renderedSummaryJSON) {
            return;
        }

        // Prevents wasteful re-rendering of summary list element with identical items!
        this.renderedSummaryJSON = shadow;
        let ul = this.createSummaryDOM();

        for (let i = 0; i < summaryElements.length; i++) {
            let e = summaryElements[i];

            // Remove existing list elements, but keep the summary's message.
            let listElements = e.querySelectorAll("ul");
            for (let j = 0; j < listElements.length; j++) {
                listElements[j].remove();
            }

            // Style the summary element as valid/invalid depending on whether there are any messages to display.
            if (ul && ul.hasChildNodes()) {
                this.swapClasses(e,
                    this.ValidationSummaryCssClassName,
                    this.ValidationSummaryValidCssClassName)
                e.appendChild(ul.cloneNode(true));
            } else {
                this.swapClasses(e,
                    this.ValidationSummaryValidCssClassName,
                    this.ValidationSummaryCssClassName)
            }
        }
    }

    /**
     * Adds an error message to an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     * @param message
     */
    addError(input: ValidatableElement, message: string) {
        let spans = this.getMessageFor(input);
        if (spans) {
            for (let i = 0; i < spans.length; i++) {
                const span = spans[i];
                spans[i].innerHTML = message;
                this.swapClasses(spans[i],
                    this.ValidationMessageCssClassName,
                    this.ValidationMessageValidCssClassName);
            }
        }

        this.swapClasses(input,
            this.ValidationInputCssClassName,
            this.ValidationInputValidCssClassName);

        if (input.form) {
            // Adding an error to one input should also add it to others with the same name (i.e. for radio button and checkbox lists).
            const inputs = input.form.querySelectorAll(validatableSelector(`[name="${input.name}"]`));
            for (let i = 0; i < inputs.length; i++) {
                this.swapClasses(inputs[i],
                    this.ValidationInputCssClassName,
                    this.ValidationInputValidCssClassName);

                let uid = this.getElementUID(inputs[i]);
                this.summary[uid] = message;
            }
        }

        this.renderSummary();
    }

    /**
     * Removes an error message from an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     */
    removeError(input: ValidatableElement) {
        let spans = this.getMessageFor(input);
        if (spans) {
            for (let i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '';
                this.swapClasses(spans[i],
                    this.ValidationMessageValidCssClassName,
                    this.ValidationMessageCssClassName);
            }
        }

        this.swapClasses(input,
            this.ValidationInputValidCssClassName,
            this.ValidationInputCssClassName);

        // Removing an error from one input should also remove it from others with the same name (i.e. for radio button and checkbox lists).
        if (input.form) {
            const inputs = input.form.querySelectorAll(validatableSelector(`[name="${input.name}"]`));
            for (let i = 0; i < inputs.length; i++) {
                this.swapClasses(inputs[i],
                    this.ValidationInputValidCssClassName,
                    this.ValidationInputCssClassName);

                let uid = this.getElementUID(inputs[i]);
                delete this.summary[uid];
            }
        }

        this.renderSummary();
    }

    /**
     * Returns a validation Promise factory for an input element, using given validation directives.
     * @param input
     * @param directives
     */
    createValidator(input: ValidatableElement, directives: ValidationDirective) {
        return async () => {
            // only validate visible and enabled fields
            if (!this.isHidden(input) && !this.isDisabled(input)) {
                for (let key in directives) {
                    let directive = directives[key];
                    let provider = this.providers[key];

                    if (!provider) {
                        this.logger.log('aspnet-validation provider not implemented: %s', key);
                        continue;
                    }
                    this.logger.log("Running %s validator on element", key, input);

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
        return !(this.allowHiddenFields || input.offsetWidth || input.offsetHeight || input.getClientRects().length);
    }

    /**
     * Checks if the provided input is disabled
     * @param input
     * @returns
     */
    private isDisabled(input: Element) {
        // If the input is validatable, we check the `disabled` property.
        // Otherwise the `disabled` property is undefined and this returns false.
        return (input as ValidatableElement).disabled;
    }

    /**
     * Adds addClass and removes removeClass
     * @param element Element to modify
     * @param addClass Class to add
     * @param removeClass Class to remove
     */
    private swapClasses(element: Element, addClass: string, removeClass: string) {
        if (addClass && !this.isDisabled(element) && !element.classList.contains(addClass)) {
            element.classList.add(addClass);
        }
        if (element.classList.contains(removeClass)) {
            element.classList.remove(removeClass);
        }
    }

    /**
     * Options for this instance of @type {ValidationService}.
     */
    private options: ValidationServiceOptions = {
        root: document.body,
        watch: false,
        addNoValidate: true,
    }

    /**
     * Load default validation providers and scans the entire document when ready.
     * @param options.watch If set to true, a MutationObserver will be used to continuously watch for new elements that provide validation directives.
     * @param options.addNoValidate If set to true (the default), a novalidate attribute will be added to the containing form in validate elements.
     */
    bootstrap(options?: Partial<ValidationServiceOptions>) {
        Object.assign(this.options, options);

        this.addMvcProviders();
        let document = window.document;
        const root = this.options.root;
        const init = () => {
            this.scan(root);

            // Watch for further mutations after initial scan
            if (this.options.watch) {
                this.watch(root);
            }
        }

        // If the document is done loading, scan it now.
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            init();
        }
        else {
            // Otherwise wait until the document is done loading.
            document.addEventListener('DOMContentLoaded', init);
        }
    }

    /**
     * Scans the root element for any validation directives and attaches behavior to them.
     * @param root The root node to scan; if not provided, `options.root` (default: `document.body`) will be scanned
     */
    scan(root?: ParentNode) {
        root ??= this.options.root;
        this.logger.log('Scanning', root);
        this.scanMessages(root, this.pushValidationMessageSpan);
        this.scanInputs(root, this.addInput);
    }

    /**
     * Scans the root element for any validation directives and removes behavior from them.
     * @param root The root node to scan; if not provided, `options.root` (default: `document.body`) will be scanned
     */
    remove(root?: ParentNode) {
        root ??= this.options.root;
        this.logger.log('Removing', root);
        this.scanMessages(root, this.removeValidationMessageSpan);
        this.scanInputs(root, this.removeInput);
    }

    /**
     * Watches the provided root element for mutations, and scans for new validation directives to attach behavior.
     * @param root The root node to watch; if not provided, `options.root` (default: `document.body`) will be watched
     */
    watch(root?: ParentNode) {
        root ??= this.options.root;
        this.observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                this.observed(mutation);
            });
        });
        this.observer.observe(root, {
            attributes: true,
            childList: true,
            subtree: true
        });
        this.logger.log("Watching for mutations");
    }

    private observed(mutation: MutationRecord) {
        if (mutation.type === 'childList') {
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                let node = mutation.addedNodes[i];
                this.logger.log('Added node', node);
                if (node instanceof HTMLElement) {
                    this.scan(node);
                }
            }
            for (let i = 0; i < mutation.removedNodes.length; i++) {
                let node = mutation.removedNodes[i];
                this.logger.log('Removed node', node);
                if (node instanceof HTMLElement) {
                    this.remove(node);
                }
            }
        } else if (mutation.type === 'attributes') {
            if (mutation.target instanceof HTMLElement) {
                const attributeName = mutation.attributeName;

                // Special case for disabled.
                if (attributeName === 'disabled') {
                    const target = mutation.target as ValidatableElement;
                    this.reset(target);
                }
                else {
                    const oldValue = mutation.oldValue ?? '';
                    const newValue = mutation.target.attributes[mutation.attributeName]?.value ?? '';
                    this.logger.log("Attribute '%s' changed from '%s' to '%s'",
                        mutation.attributeName,
                        oldValue,
                        newValue,
                        mutation.target);
                    if (oldValue !== newValue) {
                        this.scan(mutation.target);
                    }
                }
            }
        }
    }

    /**
     * Override CSS class name for input validation error. Default: 'input-validation-error'
     */
    ValidationInputCssClassName = "input-validation-error";

    /**
     * Override CSS class name for valid input validation. Default: 'input-validation-valid'
     */
    ValidationInputValidCssClassName = "input-validation-valid";

    /**
     * Override CSS class name for field validation error. Default: 'field-validation-error'
     */
    ValidationMessageCssClassName = "field-validation-error";

    /**
     * Override CSS class name for valid field validation. Default: 'field-validation-valid'
     */
    ValidationMessageValidCssClassName = "field-validation-valid";

    /**
     * Override CSS class name for validation summary error. Default: 'validation-summary-errors'
     */
    ValidationSummaryCssClassName = "validation-summary-errors";

    /**
     * Override CSS class name for valid validation summary. Default: 'validation-summary-valid'
     */
    ValidationSummaryValidCssClassName = "validation-summary-valid";
}
