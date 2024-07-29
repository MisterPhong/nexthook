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
      spacing={3}
      component={"form"}
      onSubmit={handleSubmit((data) => {
        mutate(data, {
          onSuccess: () => {
            router.push(routers.otp);
          },
        });
      })}
    >
      <Typography variant="h5" className="text-center">
        Logo
      </Typography>
      <Typography variant="h4" className="text-center">
        Sign In
      </Typography>
      <TextField
        id="text1"
        label="Username"
        variant="outlined"
        size="small"
        type=""
        error={isError}
        helperText={errors.username && "Username is required"}
        {...register("username", { required: true })}
      />
      <TextField
        id="text2"
        label="Password"
        variant="outlined"
        size="small"
        error={isError}
        helperText={errors.password && "Password is required"}
        {...register("password", { required: true })}
      />
      {isError && (
        <Typography variant="body2" color="error">
          Incorrect username or password.
        </Typography>
      )}
      <Button
        disabled={isLoading}
        variant="contained"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        type="submit"
      >
        LOGIN
      </Button>
    </Stack>
  );
}
