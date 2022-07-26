import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, Card, Container, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

// ----------------------------------------------------------------------
const designations = [
  {
    value: 'Site Engineer',
    label: 'Site Engineer'
  }
];

const adminLevels = [
  {
    value: 'Admin',
    label: 'Admin'
  },
  {
    value: 'Moderator',
    label: 'Moderator'
  },
  {
    value: 'Editor',
    label: 'Editor'
  },
  {
    value: 'Vendor - Huawei',
    label: 'Vendor - Huawei'
  },
  {
    value: 'Vendor - ZTE',
    label: 'Vendor - ZTE'
  }
];

export default function UserDetails() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const [userEmail, setuserEmail] = useState('abc@gmail.com');

  const [newPost, setNewPost] = useState({
    username: '',
    lastName: '',
    designation: '',
    adminLevel: '',
    email: '',
    contactNumber: ''
  });

  const { username, lastName, designation, adminLevel, email, contactNumber } = newPost;

  const onInputChange = (e) => {
    // console.log(e.target.value);
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setUserEmail();
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  const setUserEmail = async () => {
    // getting encrypted user emai from the local storage
    const secret = 'AuH8e#?y!E87nyVh';
    const encryptedData = localStorage.getItem('encInf');

    if (encryptedData) {
      const decData = CryptoJS.AES.decrypt(encryptedData, secret);
      if (decData) {
        const decInfo = decData.toString(CryptoJS.enc.Utf8);
        if (decData) {
          const DecryptedData = JSON.parse(decInfo);
          setuserEmail(DecryptedData.email);
        }
      }
    }
  };

  const getUserData = async () => {
    const req = await axiosInstance
      .get('/userProfile', { params: { email: userEmail } })
      .then((res) => {
        setNewPost(res.data.posts);
        console.log(res.data.posts);
      });
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // console.log(newPost);
  console.log(userEmail);

  return (
    <Card>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0} />
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
                <Typography variant="subtitle1" color="text.secondary">
                  User Details
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
                <Typography variant="body2" color="red">
                  {error && <span className="error-message">{error}</span>}
                </Typography>
              </Stack>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={4}
              >
                <TextField // --------------------------------------------------------------------------------------------
                  InputLabelProps={{ shrink: true }}
                  disabled
                  id="username"
                  size="small"
                  required="required"
                  fullWidth
                  type="Text"
                  label="First Name"
                  inputProps={{ style: { color: 'gray' } }}
                  name="username"
                  value={username}
                  onChange={(e) => onInputChange(e)}
                />

                <TextField // --------------------------------------------------------------------------------------------
                  InputLabelProps={{ shrink: true }}
                  disabled
                  id="lastName"
                  size="small"
                  required="required"
                  fullWidth
                  type="Text"
                  label="Last Name"
                  inputProps={{ style: { color: 'gray' } }}
                  name="lastName"
                  value={lastName}
                  onChange={(e) => onInputChange(e)}
                />
              </Stack>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={4}
              >
                <TextField // ------------------------------------------------------------- --------------------------------
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled
                  id="designation"
                  select
                  inputProps={{ style: { color: 'gray' } }}
                  label="Designation"
                  size="small"
                  name="designation"
                  value={designation}
                  onChange={(e) => onInputChange(e)}
                >
                  {designations.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      selected={designations === option.value ? 'selected' : ''}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField // ------------------------------------------------------------- --------------------------------
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled
                  id="adminLevel"
                  select
                  inputProps={{ style: { color: 'gray' } }}
                  label="Privilege Level"
                  size="small"
                  name="adminLevel"
                  value={adminLevel}
                  onChange={(e) => onInputChange(e)}
                >
                  {adminLevels.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      selected={adminLevels === option.value ? 'selected' : ''}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={4}
              >
                <TextField // --------------------------------------------------------------------------------------------
                  InputLabelProps={{ shrink: true }}
                  disabled
                  id="email"
                  size="small"
                  required="required"
                  fullWidth
                  type="Text"
                  label="E-mail"
                  inputProps={{ style: { color: 'gray' } }}
                  name="email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                />
                <TextField // --------------------------------------------------------------------------------------------
                  InputLabelProps={{ shrink: true }}
                  disabled
                  id="contactNumber"
                  size="small"
                  required="required"
                  fullWidth
                  type="Text"
                  label="Contact Number"
                  inputProps={{ style: { color: 'gray' } }}
                  name="contactNumber"
                  value={contactNumber}
                  onChange={(e) => onInputChange(e)}
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} />
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} />
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </Card>
  );
}
