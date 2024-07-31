"use client";

import { Stack, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomTextField from "../share/CustomTextField";
import { useSignup } from "@/app/common/hooks/useSignup";
import { Signup, SignupSchema } from "@/app/common/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertLabel from "../share/AlertLabel";
import { useRouter } from "next/navigation";
import { routers } from "@/app/common/constant/path";

type Props = {};

// Initial Values
const initialValue: Signup = {
  username: "test123",
  email: "test@gmail.com",
  password: "test123",
  confirmPassword: "test123",
};

export default function SignupForm({}: Props) {
  const router = useRouter();
  const { mutate, isError, error, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({
    defaultValues: initialValue,
    resolver: zodResolver(SignupSchema),
  });

  return (
    <Stack
      spacing={2}
      component={"form"}
      onSubmit={handleSubmit((data) => {
        mutate(
          {
            username: data.username,
            password: data.password,
            email: data.email,
            confirmPassword: data.confirmPassword,
          },
          {
            onSuccess: () => {
              router.push(routers.otp);
            },
          }
        );
      })}
    >
      <CustomTextField
        id="email"
        label="Email"
        variant="outlined"
        error={errors.email && true}
        helperText={errors.email ? errors.email.message : "Email is required"}
        {...register("email", { required: true })}
      />
      <CustomTextField
        id="username"
        label="Username"
        variant="outlined"
        type="text"
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
      <Stack spacing={isError ? 1 : 3}>
        <CustomTextField
          id="confirmPassword"
          label="Confirm password"
          variant="outlined"
          error={errors.confirmPassword && true}
          helperText={
            errors.confirmPassword
              ? errors.confirmPassword.message
              : "Confirm password is required"
          }
          {...register("confirmPassword", { required: true })}
        />
        {isError && <AlertLabel message={error?.message} />}
        <Button disabled={isLoading} variant="contained" type="submit">
          Sign Up
        </Button>
      </Stack>
    </Stack>
  );
}
