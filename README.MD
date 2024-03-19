# ASP.NET Client Validation

Enables ASP.NET MVC client-side validation without jQuery! Originally forked from https://github.com/ryanelian/aspnet-validation. This library replaces the need for `jquery.validate.min.js`, `jquery.validate.unobtrusive.min.js`. It's a nearly drop-in replacement. The only difference is you need to initialize the library as shown in the [Quickstart Guide](#quick-start-guide).

[![npm](https://img.shields.io/npm/v/aspnet-client-validation.svg)](https://www.npmjs.com/package/aspnet-client-validation)
[![Build Status](https://github.com/haacked/aspnet-client-validation/workflows/Build%20aspnet-validation/badge.svg)](https://github.com/haacked/aspnet-client-validation/actions)

## Install

```
npm install aspnet-client-validation
```

or

```
yarn add aspnet-client-validation
```

Alternatively, extract these files from the [dist.zip folder of the latest release](https://github.com/haacked/aspnet-client-validation/releases/):

* aspnet-validation.min.js
* aspnet-validation.min.js.map


> aspnet-client-validation uses [Promise API](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), which is not supported in Internet Explorer. **It is recommended to use [promise-polyfill](https://github.com/taylorhakes/promise-polyfill) or [ts-polyfill](https://github.com/ryanelian/ts-polyfill) or [core-js](https://github.com/zloirock/core-js) to resolve this issue...**

> If you are also using Bootstrap, you may [un-jQuery](http://youmightnotneedjquery.com/) the application by using https://github.com/thednp/bootstrap.native

## Quick Start Guide

### Via \<script src="..."\>

```html
<script src="promise-polyfill.min.js"></script>
<script src="aspnet-validation.min.js"></script>
```

```js
// Exposes window['aspnetValidation']
var v = new aspnetValidation.ValidationService();
v.bootstrap();
```

### Via CommonJS / Browserify

```js
require('core-js');
const aspnetValidation = require('aspnet-client-validation');

let v = new aspnetValidation.ValidationService();
v.bootstrap();
```

### Via TypeScript / ES Modules

```ts
import 'ts-polyfill';
import { ValidationService } from 'aspnet-client-validation';

let v = new ValidationService();
v.bootstrap();
```

> Use [instapack](https://github.com/ryanelian/instapack) for easy, rapid, and painless web application front-end development using TypeScript!

## Why?

**jquery-3.3.2.min.js** + **jquery.validate.min.js** + **jquery.validate.unobtrusive.min.js** = 112 KB

**aspnet-validation.min.js:** 10.6 KB **(9.46%, ~4 KB GZIP)**
- **promise-polyfill**: +3.06 KB (< 1 KB GZIP)

Also, `jquery.validate.unobtrusive.min.js` has not been meaningfully updated in over a decade, and is hard to configure.

## Building the Source Code

```powershell
git clone https://github.com/haacked/aspnet-client-validation.git
npm install
script/build   # If using PowerShell: script/build.ps1
```

## Adding Custom Validation

Example stolen from https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation

### Server Code (C#)

```cs
public class ClassicMovieAttribute : ValidationAttribute, IClientModelValidator
{
    private int _year;

    public ClassicMovieAttribute(int Year)
    {
        _year = Year;
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        Movie movie = (Movie)validationContext.ObjectInstance;

        if (movie.Genre == Genre.Classic && movie.ReleaseDate.Year > _year)
        {
            return new ValidationResult(GetErrorMessage());
        }

        return ValidationResult.Success;
    }

    public void AddValidation(ClientModelValidationContext context)
    {
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        MergeAttribute(context.Attributes, "data-val", "true");
        MergeAttribute(context.Attributes, "data-val-classicmovie", GetErrorMessage());

        var year = _year.ToString(CultureInfo.InvariantCulture);
        MergeAttribute(context.Attributes, "data-val-classicmovie-year", year);
    }
}
```

### Client Code

```ts
import { ValidationService } from 'aspnet-client-validation';
let v = new ValidationService();

v.addProvider('classicmovie', (value, element, params) => {
    if (!value) {
        // Let [Required] handle validation error for empty input...
        return true;
    }

    // Unlike the original, data-val-classicmovie-year is bound automatically to params['year'] as string!
    let year = parseInt(params.year);
    let date = new Date(value);
    let genre = (document.getElementById('Genre') as HTMLSelectElement).value;

    if (genre && genre === '0') {
        return date.getFullYear() <= year;
    }

    return true;
});

v.bootstrap();
```

## Adding Custom Asynchronous Validation

Other than `boolean` and `string`, `addProvider` callback accepts `Promise<string | boolean>` as return value:

```ts
v.addProvider('io', (value, element, params) => {
    if (!value) {
        return true;
    }

    return async () => {
        let result: number = await Some_IO_Operation(value);
        return result > 0;
    };
});
```

## Controlling when validation occurs

### Events

By default, validation occurs immediately upon changes to form fields: on `input` for inputs and textareas, and on `change` for selects.

One can change to a different event by setting a field's `data-val-event` attribute. For example, one can use `data-val-event="blur"` to validate that field on the `blur` event.

### Timing

To prevent unnecessary validation, a debounce of 300ms is used. This ensures validation does not occur for every keystroke, which is especially important during remote validation.

In some cases it may be unnecessary, for example when performing local validation on blur (rather than on change). To change the default:

```ts
v.debounce = 0;
```

## Subscribing to Client Form Validation Event

```ts
const form = document.getElementById('form');
form.addEventListener('validation', function (e) {
    /* Check if form is valid here. */
});
```

## Programatically validate a form

```ts
v.validateForm(document.getElementById('form'));
```

## Checking form validity

```ts
v.isValid(document.getElementById('form'))
```

By default it will try to validate the form, before returning whether the form is valid. This can be disabled by setting the `prevalidate` parameter like so:

```ts
v.isValid(document.getElementById('form'), false)
```

You can also supply a callback function to be run after the check.

```ts
v.isValid(document.getElementById('form'), true, myCallbackFn)
```

## Checking field validity

Similar to checking a forms validity, you can check individual fields too.

```ts
v.isFieldValid(document.getElementById('field'))
```

By default it will try to validate the form surrounding the field, before returning whether the field is valid. This can be disabled by setting the `prevalidate` parameter like so:

```ts
v.isFieldValid(document.getElementById('field'), false)
```

You can also supply a callback function to be run after the check.

```ts
v.isFieldValid(document.getElementById('field'), true, myCallbackFn)
```

## Hidden fields validation

By default validation is skipped for hidden fields. To enable validation for hidden fields validation use:
```ts
v.allowHiddenFields = true;
```

## Monitoring the DOM for changes

If configured, aspnet-client-validation can monitor the DOM for changes using [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), if the browser supports it.
As new elements are added/modified, the library will automatically wire up validation directives found.
This can be very useful when using frameworks that modify the DOM, such as [Turbo](http://turbo.hotwired.dev).
To configure this, set the `watch` option to `true` when calling `bootstrap`:

```js
let v = new aspnetValidation.ValidationService();
v.bootstrap({ watch: true });
```

Alternatively, to update the validation service for a specific form (which was created or modified dynamically) without using a `MutationObserver`:
```js
let form = document.getElementById('my-form');
v.scan(form);
```

## Customizing CSS for use with other libraries

One can customize the CSS classes so the generated markup is compatible with various frameworks. For example, to integrate with [Bootstrap](https://getbootstrap.com/docs/5.3/forms/validation) (v5+):

```js
var v = new aspnetValidation.ValidationService();
v.ValidationInputCssClassName          = 'is-invalid';                 // change from default of 'input-validation-error'
v.ValidationInputValidCssClassName     = 'is-valid';                   // change from default of 'input-validation-valid'
v.ValidationMessageCssClassName        = 'invalid-feedback';           // change from default of 'field-validation-error'
v.ValidationMessageValidCssClassName   = 'valid-feedback';             // change from default of 'field-validation-valid'
//v.ValidationSummaryCssClassName      = 'validation-summary-errors';  // unnecessary: bootstrap lacks validation summary component
//v.ValidationSummaryValidCssClassName = 'validation-summary-valid';   // "
v.bootstrap();
```

## Logging

There is a rudimentary logging infrastructure in place if you want to get more insight into what the library is doing.
To enable logging, pass an object that implements the `Logger` interface (see below) in to the `ValidationService` constructor.
The `window.console` object satisfies this interface automatically:

```typescript
// The Logger interface, for reference
export interface Logger {
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
}

let v = new aspnetValidation.ValidationService(console);
v.bootstrap();
```
