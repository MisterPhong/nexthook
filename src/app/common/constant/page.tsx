import { routers } from './path'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart'

export const pages = [
    {
        page: 'Predict',
        path: routers.predict,
        icon: <LeakAddIcon />,
    },
    {
        page: 'Position',
        path: routers.position,
        icon: <WaterfallChartIcon />,
    },
]
