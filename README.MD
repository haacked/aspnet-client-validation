# aspnet-validation
> Enables ASP.NET MVC client-side validation without jQuery! 

[![npm](https://img.shields.io/npm/v/aspnet-validation.svg)](https://www.npmjs.com/package/aspnet-validation) [![Build Status](https://travis-ci.org/ryanelian/aspnet-validation.svg?branch=master)](https://travis-ci.org/ryanelian/aspnet-validation)

## Install

```powershell
npm install aspnet-validation es6-promise
```

> aspnet-validation uses [Promise API](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), which is not supported in Internet Explorer. It is recommended to use [promise-polyfill](https://github.com/taylorhakes/promise-polyfill) or [ts-polyfill](https://github.com/ryanelian/ts-polyfill) or [core-js](https://github.com/zloirock/core-js) to resolve this issue...

Alternatively, download these:

- [aspnet-validation.min.js](https://github.com/ryanelian/aspnet-validation/raw/master/dist/aspnet-validation.min.js)
- [aspnet-validation.min.js.map](https://github.com/ryanelian/aspnet-validation/raw/master/dist/aspnet-validation.min.js.map)

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
const aspnetValidation = require('aspnet-validation');

let v = new aspnetValidation.ValidationService();
v.bootstrap();
```

### Via TypeScript / ES Modules

```ts
import 'ts-polyfill';
import { ValidationService } from 'aspnet-validation';

let v = new ValidationService();
v.bootstrap();
```

> Shameless self-promotion: use [instapack](https://github.com/ryanelian/instapack) for easy, rapid, and painless web application front-end development using TypeScript!

## Why?

**jquery-3.3.2.min.js** + **jquery.validate.min.js** + **jquery.validate.unobtrusive.min.js** = 112 KB

**aspnet-validation.min.js:** 10.6 KB **(9.46%, ~4 KB GZIP)**
- **promise-polyfill**: +3.06 KB (< 1 KB GZIP)

## Building the Source Code

```powershell
git clone https://github.com/ryanelian/aspnet-validation.git
npm install
npm run build   # If using PowerShell: .\build.ps1
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
import { ValidationService } from 'aspnet-validation';
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
