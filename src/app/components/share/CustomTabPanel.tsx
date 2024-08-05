import { Box, Button } from '@mui/material'

export function TabPanel({
    label,
    isActive,
    onClick,
}: {
    label: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <Button
            variant='text'
            size='small'
            onClick={onClick}
            className={`${
                isActive ? 'text-Primary' : 'text-DarkPrimary'
            } font-sans`}
        >
            {label}
        </Button>
    )
}

export function CustomTabPanel({
    children,
    value,
    index,
}: {
    children: React.ReactNode
    value: number
    index: number
}) {
    return <Box>{value === index && <Box>{children}</Box>}</Box>
}
