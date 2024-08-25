import { Typography } from '@mui/material'
import { Fragment } from 'react'

export default function TextKey({
    text,
    title,
}: {
    text: string
    title: string
}) {
    return (
        <Fragment>
            <Typography variant='h6' fontWeight={600} fontSize={15}>
                {title}
            </Typography>
            <Typography
                variant='h6'
                fontWeight={500}
                fontSize={17}
                sx={{ width: 'fit-content' }}
            >
                {text.replace(/./g, '*')}
            </Typography>
        </Fragment>
    )
}
