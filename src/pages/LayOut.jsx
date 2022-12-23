import React, { useState } from 'react'
import styled, { ThemeProvider } from "styled-components";
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import { darkTheme, lightTheme } from '../utils/Theme';
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const Container = styled.div`
  display: grid;
  grid-template-row: 1fr 1fr;
  @media (max-width: 600px) {
    grid-gap:10px;
  }
`
const Main = styled.div`
  margin-top:10vh;
  background-color: ${({ theme }) => theme.bgLighter};
    @media (max-width: 900px) {
      margin-top:7vh;
    }
    @media (max-width: 600px) {

    }
  `
const LayOut = () => {
  const { currentTheme } = useSelector(state => state.theme);

  return (
      <ThemeProvider theme={currentTheme? lightTheme:darkTheme} >
      <Container>
          <NavBar  />
        <Main>
          <Outlet />
        </Main>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  )
}

export default LayOut
