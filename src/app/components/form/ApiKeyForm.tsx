import { apiKeyAction } from '@/app/common/actions/apikey-action'
import { Apikey, ApikeySchema } from '@/app/common/types/apikey.type'
import { State } from '@/app/common/types/state.type'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Dialog,
    DialogTitle,
    Typography,
    DialogContent,
    DialogContentText,
    Stack,
    DialogActions,
    Button,
} from '@mui/material'
import { Fragment, useCallback, useEffect, useTransition } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
    FieldErrors,
    FieldPath,
    useForm,
    UseFormRegister,
} from 'react-hook-form'
import CustomTextField from '../share/CustomTextField'

type Props = {
    open: boolean
    handleClose: () => void
    refetchKey: () => Promise<void>
}

export default function ApiKeyForm({ open, handleClose, refetchKey }: Props) {
    const [pending, startTransaction] = useTransition()
    const [state, formAction] = useFormState<State, Apikey>(apiKeyAction, null)
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<Apikey>({
        resolver: zodResolver(ApikeySchema),
    })

    const handleCloseAndReset = useCallback(() => {
        reset() // Clear form state and errors
        handleClose()
        clearErrors() // Close the dialog
    }, [reset, handleClose, clearErrors])

    useEffect(() => {
        if (!state) {
            return
        }
        if (state.status === 'error') {
            state.errors?.map((error) => {
                setError(error.path as FieldPath<Apikey>, {
                    message: error.message,
                })
            })
        }
        if (state.status === 'success') {
            handleCloseAndReset()
            refetchKey()
        }
    }, [state, setError, handleCloseAndReset, refetchKey])

    return (
        <Fragment>
            <Dialog
                open={open}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                maxWidth='lg'
                component={'form'}
                onSubmit={handleSubmit((data) => {
                    startTransaction(() => formAction(data))
                })}
            >
                <Form
                    handleClose={handleCloseAndReset}
                    register={register}
                    errors={errors}
                    state={state}
                />
            </Dialog>
        </Fragment>
    )
}

function Form({
    register,
    errors,
    state,
    handleClose,
}: {
    register: UseFormRegister<Apikey>
    errors: FieldErrors<Apikey>
    state: State
    handleClose: () => void
}) {
    const { pending } = useFormStatus()

    return (
        <>
            <DialogTitle id='alert-dialog-title'>New API Key</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                </DialogContentText>
                <Stack sx={{ marginTop: 1 }} direction='column' spacing={2}>
                    <CustomTextField
                        id='api-key'
                        label='API KEY'
                        variant='outlined'
                        error={!!errors.apiKey || state?.status === 'error'}
                        helperText={
                            errors.apiKey
                                ? errors.apiKey.message
                                : state?.message === 'required'
                                ? 'API Key is required'
                                : ''
                        }
                        {...register('apiKey', { required: true })}
                    />
                    <CustomTextField
                        id='secret-key'
                        label='SECRET KEY'
                        size='small'
                        variant='outlined'
                        error={!!errors.secretKey || state?.status === 'error'}
                        helperText={
                            errors.secretKey
                                ? errors.secretKey.message
                                : state?.message === 'required'
                                ? 'Secret Key is required'
                                : ''
                        }
                        {...register('secretKey', { required: true })}
                    />
                    {state?.status === 'error' &&
                        state?.message !== 'required' && (
                            <Typography variant='body2' color='error'>
                                {state.message}
                            </Typography>
                        )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button
                    autoFocus
                    variant='contained'
                    type='submit'
                    disabled={pending}
                >
                    Continue
                </Button>
            </DialogActions>
        </>
    )
}
