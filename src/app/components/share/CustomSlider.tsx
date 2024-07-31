import { Slider } from "@mui/material";
import { forwardRef } from "react";

const CustomSlider = forwardRef(({ ...props }: any, ref) => (
    <Slider ref={ref} {...props} />
));

CustomSlider.displayName = 'CustomSlider';

export default CustomSlider;
