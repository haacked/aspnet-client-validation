/**
 * A simple IDictionary<string, string>
 */
export interface StringKeyValuePair {
    [key: string]: string;
}
/**
 * A simple logging interface that mirrors the Console object.
 */
export interface Logger {
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
}
/**
 * An `HTMLElement` that can be validated (`input`, `select`, `textarea`).
 */
export type ValidatableElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
/**
 * Checks if `element` is validatable (`input`, `select`, `textarea`).
 * @param element The element to check.
 * @returns `true` if validatable, otherwise `false`.
 */
export declare const isValidatable: (element: Node) => element is ValidatableElement;
/**
 * Parameters passed into validation providers from the element attributes.
 * error property is read from data-val-[Provider Name] attribute.
 * params property is populated from data-val-[Provider Name]-[Parameter Name] attributes.
 */
export interface ValidationDirectiveBindings {
    error: string;
    params: StringKeyValuePair;
}
/**
 * A key-value pair describing what validations to enforce to an input element, with respective parameters.
 */
export type ValidationDirective = {
    [key: string]: ValidationDirectiveBindings;
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
/**
 * Contains default implementations for ASP.NET Core MVC validation attributes.
 */
export declare class MvcValidationProviders {
    /**
     * Validates whether the input has a value.
     */
    required: ValidationProvider;
    /**
     * Validates whether the input value satisfies the length contstraint.
     */
    stringLength: ValidationProvider;
    /**
     * Validates whether the input value is equal to another input value.
     */
    compare: ValidationProvider;
    /**
     * Validates whether the input value is a number within a given range.
     */
    range: ValidationProvider;
    /**
     * Validates whether the input value satisfies a regular expression pattern.
     */
    regex: ValidationProvider;
    /**
     * Validates whether the input value is an email in accordance to RFC822 specification, with a top level domain.
     */
    email: ValidationProvider;
    /**
     * Validates whether the input value is a credit card number, with Luhn's Algorithm.
     */
    creditcard: ValidationProvider;
    /**
     * Validates whether the input value is a URL.
     */
    url: ValidationProvider;
    /**
     * Validates whether the input value is a phone number.
     */
    phone: ValidationProvider;
    /**
     * Asynchronously validates the input value to a JSON GET API endpoint.
     */
    remote: ValidationProvider;
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
export declare class ValidationService {
    /**
     * A key-value collection of loaded validation plugins.
     */
    private providers;
    /**
     * A key-value collection of <span> elements for displaying validation messages for an input (by DOM ID).
     */
    private messageFor;
    /**
     * A list of managed elements, each having a randomly assigned unique identifier (UID).
     */
    private elementUIDs;
    /**
     * A key-value collection of UID to Element for quick lookup.
     */
    private elementByUID;
    /**
     * A key-value collection of input UIDs for a <form> UID.
     */
    private formInputs;
    /**
     * A key-value map for input UID to its validator factory.
     */
    private validators;
    /**
     * A key-value map for form UID to its trigger element (submit event for <form>).
     */
    private formEvents;
    /**
     * A key-value map for element UID to its trigger element (input event for <textarea> and <input>, change event for <select>).
     */
    private inputEvents;
    /**
     * A key-value map of input UID to its validation error message.
     */
    private summary;
    /**
     * A serialized representation of the validation error message summary rendered to the user.
     */
    private renderedSummaryJSON;
    /**
     * In milliseconds, the rate of fire of the input validation.
     */
    debounce: number;
    /**
     * Allow hidden fields validation
     */
    allowHiddenFields: boolean;
    private logger;
    observer?: MutationObserver;
    constructor(logger?: Logger);
    /**
     * Registers a new validation plugin of the given name, if not registered yet.
     * Registered plugin validates inputs with data-val-[name] attribute, used as error message.
     * @param name
     * @param callback
     */
    addProvider(name: string, callback: ValidationProvider): void;
    /**
     * Registers the default providers for enabling ASP.NET Core MVC client-side validation.
     */
    private addMvcProviders;
    /**
     * Scans document for all validation message <span> generated by ASP.NET Core MVC, then tracks them.
     */
    private scanMessages;
    private pushValidationMessageSpan;
    private removeValidationMessageSpan;
    /**
     * Given attribute map for an HTML input, returns the validation directives to be executed.
     * @param attributes
     */
    parseDirectives(attributes: NamedNodeMap): ValidationDirective;
    /**
     *  Returns an RFC4122 version 4 compliant GUID.
     */
    private guid4;
    /**
     * Gets a UID for an DOM element.
     * @param node
     */
    private getElementUID;
    /**
     * Returns a Promise that returns validation result for each and every inputs within the form.
     * @param formUID
     */
    private getFormValidationTask;
    private getMessageFor;
    /**
     * Fires off validation for elements within the provided form and then calls the callback
     * @param form The form to validate.
     * @param callback Receives true or false indicating validity after all validation is complete.
     */
    validateForm: (form: HTMLFormElement, callback?: ValidatedCallback) => void;
    /**
     * Fires off validation for the provided element and then calls the callback
     * @param field The element to validate.
     * @param callback Receives true or false indicating validity after all validation is complete.
     */
    validateField: (field: ValidatableElement, callback?: ValidatedCallback) => void;
    /**
     * Called before validating form submit events.
     * Default calls `preventDefault()` and `stopImmediatePropagation()`.
     * @param submitEvent The `SubmitEvent`.
     */
    preValidate: (submitEvent: SubmitEvent) => void;
    /**
     * Handler for validated form submit events.
     * Default calls `submitValidForm(form, submitEvent)` on success
     * and `focusFirstInvalid(form)` on failure.
     * @param form The form that has been validated.
     * @param success The validation result.
     * @param submitEvent The `SubmitEvent`.
     */
    handleValidated: (form: HTMLFormElement, success: boolean, submitEvent?: SubmitEvent) => void;
    /**
     * Dispatches a new `SubmitEvent` on the provided form,
     * then calls `form.submit()` unless `submitEvent` is cancelable
     * and `preventDefault()` was called by a handler that received the new event.
     *
     * This is equivalent to `form.requestSubmit()`, but more flexible.
     * @param form The validated form to submit
     * @param submitEvent The `SubmitEvent`.
     */
    submitValidForm: (form: HTMLFormElement, submitEvent: SubmitEvent) => void;
    /**
     * Focuses the first invalid element within the provided form
     * @param form
     */
    focusFirstInvalid: (form: HTMLFormElement) => void;
    /**
     * Returns true if the provided form is currently valid.
     * The form will be validated unless prevalidate is set to false.
     * @param form The form to validate.
     * @param prevalidate Whether the form should be validated before returning.
     * @param callback A callback that receives true or false indicating validity after all validation is complete. Ignored if prevalidate is false.
     * @returns The current state of the form. May be inaccurate if any validation is asynchronous (e.g. remote); consider using `callback` instead.
     */
    isValid: (form: HTMLFormElement, prevalidate?: boolean, callback?: ValidatedCallback) => boolean;
    /**
     * Returns true if the provided field is currently valid.
     * The field will be validated unless prevalidate is set to false.
     * @param field The field to validate.
     * @param prevalidate Whether the field should be validated before returning.
     * @param callback A callback that receives true or false indicating validity after all validation is complete. Ignored if prevalidate is false.
     * @returns The current state of the field. May be inaccurate if any validation is asynchronous (e.g. remote); consider using `callback` instead.
     */
    isFieldValid: (field: ValidatableElement, prevalidate?: boolean, callback?: ValidatedCallback) => boolean;
    /**
     * Returns true if the event triggering the form submission indicates we should validate the form.
     * @param e
     */
    private shouldValidate;
    /**
     * Tracks a <form> element as parent of an input UID. When the form is submitted, attempts to validate the said input asynchronously.
     * @param form
     * @param inputUID
     */
    private trackFormInput;
    private untrackFormInput;
    /**
     * Adds an input element to be managed and validated by the service.
     * Triggers a debounced live validation when input value changes.
     * @param input
     */
    addInput(input: ValidatableElement): void;
    removeInput(input: ValidatableElement): void;
    /**
     * Scans the entire document for input elements to be validated.
     */
    private scanInputs;
    /**
     * Returns a <ul> element as a validation errors summary.
     */
    createSummaryDOM(): HTMLUListElement;
    /**
     * Displays validation summary to ASP.NET Core MVC designated elements, when it actually gets updated.
     */
    private renderSummary;
    /**
     * Adds an error message to an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     * @param message
     */
    addError(input: ValidatableElement, message: string): void;
    /**
     * Removes an error message from an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     */
    removeError(input: ValidatableElement): void;
    /**
     * Returns a validation Promise factory for an input element, using given validation directives.
     * @param input
     * @param directives
     */
    createValidator(input: ValidatableElement, directives: ValidationDirective): () => Promise<boolean>;
    /**
     * Checks if the provided input is hidden from the browser
     * @param input
     * @returns
     */
    private isHidden;
    /**
     * Adds addClass and removes removeClass
     * @param element Element to modify
     * @param addClass Class to add
     * @param removeClass Class to remove
     */
    private swapClasses;
    /**
     * Options for this instance of @type {ValidationService}.
     */
    private options;
    /**
     * Load default validation providers and scans the entire document when ready.
     * @param options.watch If set to true, a MutationObserver will be used to continuously watch for new elements that provide validation directives.
     * @param options.addNoValidate If set to true (the default), a novalidate attribute will be added to the containing form in validate elemets.
     */
    bootstrap(options?: Partial<ValidationServiceOptions>): void;
    /**
     * Scans the provided root element for any validation directives and attaches behavior to them.
     */
    scan(root: ParentNode): void;
    /**
     * Scans the provided root element for any validation directives and removes behavior from them.
     */
    remove(root: ParentNode): void;
    /**
     * Watches the provided root element for mutations, and scans for new validation directives to attach behavior.
     * @param root The root element to use, defaults to the document.documentElement.
     */
    watch(root: ParentNode): void;
    private observed;
    /**
     * Override CSS class name for input validation error. Default: 'input-validation-error'
     */
    ValidationInputCssClassName: string;
    /**
     * Override CSS class name for valid input validation. Default: 'input-validation-valid'
     */
    ValidationInputValidCssClassName: string;
    /**
     * Override CSS class name for field validation error. Default: 'field-validation-error'
     */
    ValidationMessageCssClassName: string;
    /**
     * Override CSS class name for valid field validation. Default: 'field-validation-valid'
     */
    ValidationMessageValidCssClassName: string;
    /**
     * Override CSS class name for validation summary error. Default: 'validation-summary-errors'
     */
    ValidationSummaryCssClassName: string;
    /**
     * Override CSS class name for valid validation summary. Default: 'field-validation-valid'
     */
    ValidationSummaryValidCssClassName: string;
}
