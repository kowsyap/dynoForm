import { BsDatepickerViewMode } from "ngx-bootstrap/datepicker";

type DynoFormType = 'text' | 'number' | 'password' | 'email' | 'radio' | 'checkbox' | 'select' | 'textarea' | 'button' | 'heading' | 'date' | 'daterange' | 'file';

interface ExtraDynoFormConfigMap {
    'text': ExtraCommon;
    'number': ExtraCommon;
    'password': ExtraPassword;
    'email': ExtraCommon;
    'radio': ExtraOptions;
    'checkbox': ExtraCommon;
    'select': ExtraOptions;
    'textarea': ExtraArea;
    'button': ExtraSubmit;
    'heading': ExtraCommon;
    'date': ExtraDate;
    'daterange': ExtraDate;
    'file': ExtraFile;
}

interface ExtraCommon {
    validationMessages?: { required?: string; pattern?: string };
    customClass?: string;
    customText?: string;
}

interface ExtraPassword extends ExtraCommon {
    hideEye?: boolean;
}

interface ExtraDate extends ExtraCommon {
    mode: BsDatepickerViewMode;
    minDate?: Date;
    maxDate?: Date;
    theme?: string;
    format?: string;
}

interface ExtraOptions extends ExtraCommon {
    options?: any[];
    key?: string;
    label?: string;
    theme?: string;
    multi?: boolean;
}
interface ExtraSubmit extends ExtraCommon {
    submit?: boolean;
}
interface ExtraArea extends ExtraCommon {
    rows?: number;
}
interface ExtraFile extends ExtraCommon {
    format?: string;
    fileName?: string;
}

export interface DynoFormConfig {
    name: string;
    type: DynoFormType;
    label?: string;
    placeholder?: string;
    required?: boolean;
    hideAsterisk?:boolean;
    pattern?: string | RegExp;
    class?: string;
    parentClass?: string;
    labelClass?: string;
    floatLabel?: boolean;
    value?: any;
    section?: string;
    extra?: ExtraDynoFormConfigMap[DynoFormType];
    disable?: boolean;
    condition?: (field: any) => boolean;
}

