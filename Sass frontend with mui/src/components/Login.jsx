import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { EnterButton, MuiTextfield } from "../muiStyle/NavbarStyle";
import { useState } from "react";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "../features/apiSlice";
import { useNavigate } from "react-router";
import pc from "../Images/joshua-woroniecki-TspYRqQrErc-unsplash.jpg";
import Autocomplete from "@mui/material/Autocomplete";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("enter correct email")
    .required("Email is required"),
  password: yup.string().required("password is required"),
});

const Login = () => {
  const [userData, setuserData] = useState();
  const [LoginUser] = useLoginUserMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    console.log(data, "dataa");

    LoginUser(data)
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          localStorage.setItem("token", JSON.stringify(res.token));
          localStorage.setItem("userEmail", JSON.stringify(res.user.email));
          localStorage.setItem("userId", JSON.stringify(res.user._id));
          navigate("/");
          // reset();
        }
        console.log(res, "ressss");
      });
    console.log(data, "dataa");
  };

  return (
    <Box
      sx={{
        width: "100%",
        // height: '100%',
      }}
      className="  p-2 flex flex-col "
    >
      <form onSubmit={handleSubmit(formSubmit)}>
        <Box
          sx={{
            paddingTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            className="text-white w-full text-center"
            variant="h5"
          >
            <p className="pb-2">Login</p>
          </Typography>
          <Box
            className="lg:w-[35%] md:w-[54%] w-full p-3 flex  flex-col gap-4 "
            sx={{
              mt: 1,
              //  position: 'absolute',
              w: "50%",
            }}
          >
            <div className="w-full">
              <MuiTextfield
                //   required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email")}
                error={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="text-red-700 w-full">{errors.email?.message}</p>
              ) : (
                ""
              )}
            </div>
            <div className="w-full">
              <MuiTextfield
                //   required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
                error={Boolean(errors.password)}
              />
              {errors.password ? (
                <p className="text-red-700 w-full">
                  {errors.password?.message}
                </p>
              ) : (
                ""
              )}
            </div>

            <EnterButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </EnterButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
