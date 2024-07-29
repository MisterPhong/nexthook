"use client";

import {
  Stack,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import theme from "../theme/theme";
import { useLogin } from "@/app/common/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, LoginSchema } from "@/app/common/types/auth.type";
import { useRouter } from "next/navigation";
import { routers } from "@/app/common/constant/path";
import CustomTextField from "../share/CustomTextField";

type Props = {};

// Initial Values
const initialValue: Login = {
  username: "user1211",
  password: "test1234",
};

export default function LoginForm({}: Props) {
  const router = useRouter();
  const { mutate, isLoading, isError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: initialValue,
    resolver: zodResolver(LoginSchema),
  });

  return (
    <Stack
      spacing={2}
      component={"form"}
      onSubmit={handleSubmit((data) => {
        mutate(data, {
          onSuccess: () => {
            router.push(routers.otp);
          },
        });
      })}
    >
      <CustomTextField
        id="username"
        label="Username"
        variant="outlined"
        error={errors.username && true}
        helperText={
          errors.username ? errors.username.message : "Username is required"
        }
        {...register("username", { required: true })}
      />
      <CustomTextField
        id="password"
        label="Password"
        variant="outlined"
        error={errors.password && true}
        helperText={
          errors.password ? errors.password.message : "Password is required"
        }
        {...register("password", { required: true })}
      />
      {isError && (
        <Typography variant="body2" color="error">
          Incorrect username or password.
        </Typography>
      )}
      <Button disabled={isLoading} variant="contained" type="submit">
        Continue
      </Button>
    </Stack>
  );
}
