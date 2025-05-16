import {useRef, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Button, TextField} from "@mui/material";
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {register} from "./usersThunks.ts";
import {selectRegisterError, selectRegisterLoading} from "./userSlice.ts";


const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const registerLoading = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterMutation>({
        username: '',
        password: '',
        displayName: '',
        avatar: null,
    });


    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setForm(prev => ({
                ...prev,
                avatar: e.target.files![0]
            }));
        }
    };

    const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.displayName) {
            alert('Display Name is required!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', form.username);
            formData.append('password', form.password);
            formData.append('displayName', form.displayName);
            if (form.avatar) {
                formData.append('avatar', form.avatar);
            }

            await dispatch(register(formData)).unwrap();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmitFormHandler} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12}}>
                        <TextField
                            required
                            disabled={registerLoading}
                            fullWidth
                            id="displayName"
                            label="Display Name"
                            name="displayName"
                            value={form.displayName}
                            onChange={onInputChange}
                            error={Boolean(getFieldError('displayName'))}
                            helperText={getFieldError('displayName')}
                        />
                    </Grid>
                    <Grid  size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="family-name"
                            value={form.username}
                            onChange={onInputChange}
                            helperText={getFieldError('username')}
                            error={Boolean(getFieldError('username'))}
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={onInputChange}
                            helperText={getFieldError('password')}
                            error={Boolean(getFieldError('password'))}
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => inputRef.current?.click()}
                            sx={{ mb: 2 }}
                        >
                            {form.avatar ? 'Change Avatar' : 'Upload Avatar'}
                        </Button>
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={onFileChange}
                            accept="image/*"
                            hidden
                        />
                        {form.avatar && (
                            <Typography variant="body2">
                                Selected: {form.avatar.name}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <Button
                    disabled={registerLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        backgroundColor: '#a8e6cf',
                        color: '#2d3436'
                    }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="space-between">
                    <Grid sx={{mx: 'auto'}}>
                        <Link to='/login' variant="body2" component={RouterLink}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Register;