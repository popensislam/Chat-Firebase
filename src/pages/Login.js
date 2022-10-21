import { Container, Grid, Box, TextField, Typography, Button, } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth } from "../firebase";

const Login = () => {

  const [err, setErr] = useState('')

  const navigate = useNavigate()

  const HandleSubmit = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      navigate('/chat')
    } catch (e) {
      setErr('Что то пошло не так :(')
      console.log(e.message)
    }

  }

  const validationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Введите свой email')
      .typeError("Это должно быть строкой")
      .required("Обязательно"),
    password: yup
      .string()
      .typeError("Это должно быть строкой")
      .min(4, "Длина пароля должна быть больше 4 символов ")
      .required("Обязательно"),
  });

  return (
    <Container>
      <Grid
        container
        sx={{ height: window.innerHeight - 50, width: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          sx={{
            width: "40%",
            border: "1px solid #eee",
            padding: "40px",
            boxShadow: "0 0 5px #000",
            textAlign: "center",
          }}
        >
          <Typography align="center" variant="h5" sx={{ mb: 3 }}>
            Вход
          </Typography>
          <Formik
            initialValues={{ email: "user@mail.ru", password: "12345678" }}
            validateOnBlur
            onSubmit={(values) => HandleSubmit(values)}
            validationSchema={validationScheme}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty,
            }) => (
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                <TextField
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && errors.email ? true : false}
                  label="Введите ваш email"
                  helperText={touched.email && errors.email && `${errors.email}`}
                />
                <TextField
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && errors.password ? true : false}
                  label="Введите ваш пароль"
                  helperText={
                    touched.password && errors.password && `${errors.password}`
                  }
                  type={"password"}
                />
                <Button
                  variant="contained"
                  disabled={!isValid && !dirty}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Вход
                </Button>
              </Box>
            )}
          </Formik>
          {err && (
            <Typography align="center" component="p" sx={{ marginTop: "10px" }}>
              {err}
            </Typography>
          )}
          <Typography align="center" component="p" sx={{ marginTop: "10px" }}>
            У вас нету аккаунта? <Link to="/register">Зарегистрируйтесь!</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
