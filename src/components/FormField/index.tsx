import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    SELECT = "select",
}

interface FieldProps {
    id: string;
    name: string;
    control: Control<FieldValues>;
    label: string;
    type: FormFieldType;
    placeholder: string;
    error: boolean;
    fullWidth: boolean;
    helperText?: undefined | string;
    rules: RegisterOptions;
    options?: Array<{ label: string; value: any }>; // For select dropdowns
    defaultValue?: string;
    labelId?: string;
};

const FormField = ({ id, name, control, label, placeholder, fullWidth, type, options, labelId, defaultValue, rules, error, helperText }: FieldProps) => {

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => {
                switch (type) {
                    case FormFieldType.INPUT:
                        return <TextField
                            id={id}
                            label={label}
                            variant="outlined"
                            placeholder={placeholder}
                            fullWidth={fullWidth}
                            margin="normal"
                            error={error}
                            helperText={helperText || ""}
                            {...field}
                        />

                    case FormFieldType.TEXTAREA:
                        return <TextField
                            id={id}
                            label={label}
                            variant="outlined"
                            placeholder={placeholder}
                            fullWidth
                            margin="normal"
                            error={error}
                            helperText={helperText}
                            {...field}
                            multiline
                            minRows={2}
                            maxRows={4}
                        />
                    case FormFieldType.SELECT:
                        return <FormControl
                            fullWidth
                            error={error}
                            margin="normal"
                        >
                            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                            <Select
                                {...field}
                                labelId={labelId}
                                id={name}
                                defaultValue={defaultValue}
                                label={label}
                            >
                                {
                                    options && options.map((option) => {
                                        return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>
                                {helperText}
                            </FormHelperText>
                        </FormControl>
                    default:
                        return <TextField
                            id={id}
                            label={label}
                            variant="outlined"
                            placeholder={placeholder}
                            fullWidth
                            margin="normal"
                            error={error}
                            helperText={helperText}
                            {...field}
                        />
                }


            }
            }
        />
    )
}

export default FormField