import { Container, Grid, Box, TextField, Typography, Button, } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {

  const [err, setErr] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password)
      const { uid } = getAuth().currentUser
      
      await updateProfile(res.user, {
        displayName: values.name
      })

      await setDoc(doc(db, 'users', uid), {
        email: values.email,
        displayName: values.name,
        uid
      })

      await setDoc(doc(db, 'userChats', uid), {})

      navigate('/chat')

    } catch (e) {
      setErr('Что то пошло не так :(')
      console.log(e.message)
    }
  }

  const validationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Введите email')
      .required('Обязательно'),
    name: yup
      .string()
      .typeError('Это должно быть строкой')
      .required('Обязательно'),
    password: yup
      .string()
      .typeError("Это должно быть строкой")
      .min(6, "Длина пароля должна быть больше 4 символов ")
      .required("Обязательно"),
  })
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
            Регистрация
          </Typography>
          <Formik
            initialValues={{ email: "", name: "", password: "" }}
            validateOnBlur
            onSubmit={(values) => handleSubmit(values)}
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
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && errors.name ? true : false}
                  label="Введите ваш name"
                  helperText={touched.name && errors.name && `${errors.name}`}
                />
                <TextField
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && errors.password ? true : false}
                  label="Введите ваш пароль"
                  helperText={touched.password && errors.password && `${errors.password}`}
                  type={"password"}
                />
                <Button
                  variant="contained"
                  disabled={!isValid && !dirty}
                  onClick={handleSubmit}
                >Зарегистрироваться</Button>
              </Box>
            )}
          </Formik>
          {err && (
            <Typography align="center" component="p" sx={{ marginTop: "10px" }}>
              {err}
            </Typography>
          )}
          <Typography align="center" component="p" sx={{ marginTop: "10px" }}>
            У вас уже есть аккаунт? <Link to="/login">Войдите!</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
