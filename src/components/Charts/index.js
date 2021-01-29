import React from 'react'
import { Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

//STYLE
import { Container, TitleContainer, Title, ChartsContainer, TopCharts } from "./style"

//COMPONENTS
import ExpensesOverLastYear from "./ExpensesOverLastYear"
import MoneySpendedByCategory from "./MoneySpendedByCategory"
import IncomeOverLast6Months from './IncomeOverLast6Months'

const Charts = () => {
    return (
        <>
        <Container>
            <TitleContainer>
                <Title>
                    <h3>Wykresy</h3>
                    <Link to="/">
                        <Icon name="home" color="blue" size="big" />
                    </Link>
                </Title>
            </TitleContainer>
            <ChartsContainer>
                <TopCharts>
                    <IncomeOverLast6Months />
                    <MoneySpendedByCategory />
                </TopCharts>
                <ExpensesOverLastYear />
            </ChartsContainer>
        </Container>
        </>
    )
}

export default Charts