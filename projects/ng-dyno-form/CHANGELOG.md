# Changelog

## 1.0.3

### Fixed
- Optional `text`, `number`, `email`, `password`, `textarea`, `date` and `daterange` fields were always required, because every input carried a hardcoded `required` attribute.
- `sectionSubmit()` / `sectionValidator()` always returned `valid: false` for a section that contained a button or heading.
- A disabled field made its section invalid.
- Required fields hidden by their `condition` blocked validation and submission. Hidden fields are now ignored when validating (their values are still returned).
- `blur` events on inputs and textareas were emitted with `type: 'input'`; they now use `type: 'blur'`, as documented.
- Clicking any radio option's label selected the wrong option; radio and file inputs now get ids that are unique per option and per form.
- Initial values of `0`, `''` and `false` were replaced with `null`.
- Buttons are now `type="button"`, so pressing Enter in a field no longer triggers the first button.
- `patchValue()` did nothing if the object contained a key that isn't a form field; it now patches the known keys.
- `addValidation()` showed the required asterisk for any validator; it now only does so for `Validators.required`.
- `disableField()` / `enableField()` now also disable and enable file inputs.
- File `format` checks now follow the `accept` syntax, so `image/*` and extensions like `.pdf` work.
- The library module no longer imports `BrowserModule`/`BrowserAnimationsModule`, which broke lazy-loaded modules. Apps must provide animations themselves (`ng add ngx-bootstrap` already does).

### Added
- `DynoFormConfig` and the related types are exported from the package.
- `@angular/forms` is listed as a peer dependency.
