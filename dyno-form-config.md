### `DynoFormConfig` Interface

The `DynoFormConfig` interface represents a configuration object for defining form fields in a dynamic form. It provides various properties that allow you to specify the characteristics and behavior of form fields.

#### Properties

1. `name` (string): The name of the form field. It is used as the identifier for the field.

2. `type` (DynoFormType): The type of the form field. It should be one of the following enumerated values:
   - `'text'`: A text input field.
   - `'number'`: A number input field.
   - `'password'`: A password input field.
   - `'email'`: An email input field.
   - `'radio'`: A radio button.
   - `'checkbox'`: A checkbox.
   - `'select'`: A select (dropdown) input field.
   - `'textarea'`: A textarea input field.
   - `'button'`: A button.
   - `'heading'`: A heading or label (non-input element).
   - `'date'`: A date input field.
   - `'daterange'`: A date range input field.
   - `'file'`: A file input field.

3. `label` (string, optional): The label for the form field, which is typically displayed next to the field to describe its purpose.

4. `required` (boolean, optional): Indicates whether the field is required (`true`) or not (`false`). Defaults to `false`.

5. `pattern` (string | RegExp, optional): Specifies a pattern or regular expression for input validation. It defines the format that the input value should match.

6. `class` (string, optional): A CSS class to apply to the form field element.

7. `parentClass` (string, optional): A CSS class to apply to the parent container of the form field element.

8. `labelClass` (string, optional): A CSS class to apply to the label element associated with the form field.

9. `value` (any, optional): The initial value of the form field.

10. `section` (string, optional): A string that can be used to categorize or group form fields into sections.

11. `extra` (object, optional): An object containing additional properties for specific field types. The properties within `extra` vary depending on the field type, and they include options for select fields, date-related properties for date fields, etc.

12. `disable` (boolean, optional): Indicates whether the field should be disabled (`true`) or not (`false`). Defaults to `false`.

13. `hideAsterisk` (boolean, optional): Hides asterisk(*) if the value is `true`. Defaults to `false`.

14. `condition` ((field: any) => boolean, optional): A function that, when provided, defines a condition under which the field should be displayed or hidden. The function takes the current field as its parameter and should return `true` to show the field and `false` to hide it.


####  ExtraDynoFormConfigMap Interface

The ExtraDynoFormConfigMap interface defines subtypes for the extra property of DynoFormConfig. It maps each DynoFormType to an associated Extra interface. This ensures that the extra property contains only the allowed properties for a given type. Here's a summary of these subtypes:

  - `ExtraCommon`: Common properties that can be used for various DynoFormType.
  - `ExtraPassword`: Properties for password type fields.
  - `ExtraDate`: Properties specific to date-related form fields ('date' and 'daterange').
  - `ExtraOptions`: Properties for form fields with selectable options ('select' and 'radio').
  - `ExtraSubmit`: Properties specific to submit buttons ('button').
  - `ExtraArea`: Properties for textareas ('textarea').
  - `ExtraFile`: Properties for file upload fields ('file').

Within each Extra interface, you can specify properties that are relevant to that particular DynoFormType. These properties are defined based on the specific requirements of each type.

Properties within the `extra` property of the `DynoFormConfig` interface in Markdown format:

1. **validationMessages** (Optional):
   - Description: You can provide custom error messages for validation. These messages will be shown when there's a validation error for this field (required and pattern mismatch validation messages).

2. **customClass** (Optional):
   - Description: You can assign a custom CSS class to the form field. This class can be used to style the field uniquely. (currently works only for 'file' type)

3. **customText** (Optional):
   - Description: You can specify custom text that will be displayed in the field. This is useful for showing a placeholder or default text. (currently works only for 'file' type)

4. **options** (Optional, for 'select' and 'radio' fields):
   - Description: For select and radio button fields, you can provide a list of options that the user can choose from.

5. **key** (Optional, for 'select' and 'radio' fields):
   - Description: When you have options, you can specify a unique key for each option. This key will be associated with the selected value.

6. **label** (Optional, for 'select' and 'radio' fields):
   - Description: You can set a custom label for each option in select and radio fields. This label is what the user sees.

7. **format** (Optional, for date-related fields):
   - Description: This lets you define the format in which dates should be displayed or accepted.

8. **mode** (Optional, for date-related fields):
   - Description: For date fields, you can choose the mode, such as 'day,' 'month,' or 'year.' This determines what the user can select.

9. **minDate** and **maxDate** (Optional, for date-related fields):
   - Description: You can restrict the selectable dates within a certain range by setting the minimum and maximum dates.

10. **theme** (Optional, for date-related fields):
    - Description: You can apply a custom theme or styling to date-related fields to make them look different.

11. **fileName** (Optional, for 'file' fields):
    - Description: For file upload fields, you can specify the default file name that will be displayed for initial value.

12. **rows** (Optional, for 'textarea' fields):
    - Description: You can define the number of visible rows in a textarea, making it taller if needed.

13. **multi** (Optional, for 'select' fields):
    - Description: For select fields, you can allow users to select multiple options if you set this to `true`.

14. **hideEye** (Optional, for 'password' fields):
    - Description: You can hide the eye icon by setting this to `true`.

15. **submit** (Optional, for 'button' fields):
    - Description: You can specify that a button field should act as a submit button by setting this to `true`.

These settings allow you to customize the behavior and appearance of different types of form fields, making it versatile and flexible for creating dynamic forms.

#### Example Usage

```typescript
const fieldConfig: DynoFormConfig[] = [{
  name: 'gender',
  type: 'select',
  label: 'Gender',
  required: true,
  class: 'form-control',
  parentClass: 'form-group',
  labelClass: 'control-label',
  value: 'male',
  section: 'User Information',
  extra: {
    validationMessages: {
      required: 'Gender is required.',
    },
    options: [
                { name: 'male', id: 'male' },
                { name: 'female', id: 'female' },
                { name: 'other', id: 'other' }
    ],
    key: 'id',
    label: 'name',
    multi: false
  },
  disable: false,
  condition: (field) => {
    // Your custom logic to determine whether to show or hide the field.
    return true;
  }
}];
```

This example demonstrates how to use the `DynoFormConfig` interface to define a form field configuration. You can customize the properties according to your specific form requirements.