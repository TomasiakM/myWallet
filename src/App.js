import React from 'react'
import styled from "styled-components"
import 'semantic-ui-css/semantic.min.css'
import { Switch, Route } from "react-router-dom"

//COMPONENTS
import Account from "./components/Account"
import History from "./components/History"
import FullHistory from "./components/FullHistory"
import Charts from "./components/Charts"

const Container = styled.div`
  max-width: 1100px;
  min-width: 320px;
  margin: 0 auto;
`

const Main = styled.div`
  display: flex;
  justify-content: space-around;

  @media(max-width: 824px){
    flex-direction: column;
    align-items: center;
  }
`

function App() {
    return (
        <Container >
            <Main>
                <Switch>
                  <Route path="/charts" component={Charts} />
                  <Route path="/history" component={FullHistory} />
                  <Route path="/">
                      <Account />
                      <History />
                  </Route>
                </Switch>
            </Main>
        </Container>
    )
}

export default App
