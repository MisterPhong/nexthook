import { Slider } from "@mui/material";
import { forwardRef } from "react";

export const CustomSlider = forwardRef(({ ...props }: any, ref) => (
    <Slider ref={ref} {...props} />
))