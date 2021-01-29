import React from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import { Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

//COMPONENTS
import AddTransaction from "./AddTransaction"


const Container = styled.div`
    padding: 20px;
    width: 100%;

    p{
        margin: 6px;
    }

    @media(max-width: 824px){
        padding: 10px 4px 20px;
    }
`

const Wallet = styled.div`
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);
`

const WalletHeader = styled.div`
    display:flex;
    justify-content: space-between;
`

const Account = () => {

    const transactions = useSelector(state => state.transactions)
    const inWallet = transactions.reduce((total, e) => e.type === "income" ? total + e.value : total - e.value, 0).toFixed(2)

    return (
        <Container>
            <Wallet>
                <WalletHeader>
                    <h1>myWallet</h1>
                    <Link to="/charts" style={{color: "#2185d0"}}>
                        <Icon name="pie chart" color="blue" size="big" />
                    </Link>
                </WalletHeader>
                <div>
                    Twoje środki
                    <h3>{inWallet.toString().replace(".", ",")}zł</h3>
                </div>
            </Wallet>
            <AddTransaction />
        </Container>
    )
}

export default Account