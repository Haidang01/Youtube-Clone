import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Login, LoginGoogle, Signup } from '../redux/features/userSlice'
import { toast } from 'react-toastify';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth'
import GoogleIcon from '@mui/icons-material/Google';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:${({ theme }) => theme.bgLighter};
  width: 100%;
  height: 90vh;
  color: ${({ theme }) => theme.text};
  @media (max-width: 600px) {
    overflow: hidden;
    padding:10px 0;
    }
  `
const Wrapper = styled.div`
    display: flex;
    min-width:35vw;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bg};
    border:1px solid ${({ theme }) => theme.hr};
    padding:10px 50px;
    gap:10px;
    @media (max-width: 600px) {
      height:90vh;
      gap:5px;
      height:auto;
    }

`
const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.hr};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;
const Google = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap:10px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;

const More = styled.div`
  min-width: 35vw;
  margin :0 auto;
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textDetails};
  gap:20px;
  justify-content:space-between;
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { error } = useSelector(state => state.user)
  useEffect(() => {
    error && toast.error(error);
  },[error])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //SIGN IN
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username: username, password: password };
    dispatch(Login({ data, navigate,toast }));
  }

  // SIGN UP
  const handleSignup = async (e) => {
    e.preventDefault();  
    const data = { username: username, password: password,email:email};
    dispatch(Signup({ data, navigate, toast }));
    setUsername('');
    setPassword('');
    setEmail('');
  }
  
  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async () => {
   signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    const data = {
      username: user.displayName,
      email: user.email,
      img: user.photoURL,

    };
    dispatch(LoginGoogle({ data, navigate,toast }));
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
  });
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}  />
        <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <Button onClick={handleLogin} >Sign in</Button>
        <Title>or</Title>
        <Google onClick={signInWithGoogle} ><GoogleIcon/> Sign in with google</Google>
        <Title>or</Title>
        {/* signInWithPopup */}
        <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}  />
        <Input placeholder="email"onChange={(e)=>setEmail(e.target.value)} />
        <Input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
        <Button onClick={handleSignup} >Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};
export default Signin;