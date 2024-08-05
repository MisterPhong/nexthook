import {
    TextField,
    TextFieldVariants,
    TextFieldProps,
    FilledInputProps,
    OutlinedInputProps,
    InputProps,
} from '@mui/material'
import React from 'react'

type Props = {
    error?: boolean
    helperText?: string
    label: string
    variant: TextFieldVariants
    id: string
    type?: React.HTMLInputTypeAttribute | undefined
    InputProps?:
        | Partial<FilledInputProps>
        | Partial<OutlinedInputProps>
        | Partial<InputProps>
        | undefined
} & TextFieldProps

const CustomTextField = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            id,
            error,
            helperText,
            label,
            variant,
            type,
            InputProps,
            ...props
        },
        ref,
    ) => {
        return (
            <TextField
                id={id}
                label={label}
                variant={variant}
                error={error}
                helperText={error && helperText}
                type={type}
                size='small'
                inputRef={ref}
                {...props}
                InputProps={InputProps}
            />
        )
    },
)

CustomTextField.displayName = 'CustomTextField'

export default CustomTextField
