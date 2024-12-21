import React, {useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';


const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );
    const handleSubmit = () => {
    };
    const handleChange = () => {

    };
    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
      handleShowPassword(false);

    };
    // const googleSuccess = async (res) => {
    //   const result = res?.profileObj;
    //   console.log(res);
    //   console.log("Login Succesfull");

    // };
    const googleSuccess = async (res) => {
      try {
        const credential = res.credential;
        
        // Decode the JWT token to access user details (requires jwt-decode library)
        const decoded = jwtDecode(credential);
    
        // Construct the desired response object
        const mod_result = {
          accessToken: credential, // JWT token serves as accessToken
          googleId: decoded.sub, // Google user ID
          profileObj: {
            email: decoded.email,
            name: decoded.name,
            givenName: decoded.given_name,
            familyName: decoded.family_name,
            imageUrl: decoded.picture, // Profile picture URL
          },
          tokenId: credential, // Same as accessToken in this case
          tokenObj: {
            exp: decoded.exp, // Token expiration timestamp
            iat: decoded.iat, // Token issued at timestamp
          },
        };
    
        // Log the structured result to verify
        // console.log("Transformed Response:", mod_result);
        const result = mod_result?.profileObj;
        const token =mod_result?.tokenId;
        dispatch({type:'AUTH', data: { result, token}});
        
      } catch (error) {
        console.error("Error processing Google login response:", error);
      }
    };    
    const googleFailure = (error) => {
      console.log(error);
      console.log('Google Sign In Failed. Try Again Later');
    };
  
    return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="38464961384-cecng2p8qauf4vs6v6ntdkbg1l4tg6no.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} variant="body2">
                {isSignup ? "Already have an account? Sign In " : "Don't have an account? Sign Up"}
              </Button>
              
            </Grid>

          </Grid>
        </form>
      </Paper>
      </Container>
  )
}

export default Auth
