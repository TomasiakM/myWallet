import React from 'react'
import Chart from "react-apexcharts"
import { useSelector } from 'react-redux'
import styled from "styled-components"


const Container = styled.div`
  box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);
  margin: 10px;

  @media(max-width: 824px){
    margin: 10px 2px;
  }
  box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);
  width: 100%;
  margin: 10px 0;

  @media(max-width: 824px){
    width: calc(100% - 8px);
    margin: 10px 4px;
  }
`

const ExpensesOverLastYear = () => {
    // order months for chart
    const months = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"]
    const monthNow = new Date().getMonth()
    const slicedMonths1 = months.slice(0, monthNow + 1)
    const slicedMonths2 = months.slice(monthNow + 1, 12)

    const newMonths = slicedMonths2.concat(slicedMonths1)

    //calculate expenses for given month
    const transactions = useSelector(state => state.transactions)
    const yearNow = new Date().getFullYear()
    let newArr = []

    transactions.forEach(e => {
        const lastYear = new Date(`${yearNow - 1}-${monthNow + 2}-01`).getTime()
        const elementDate = new Date(e.date.slice(0, 7)).getTime()

        if(elementDate >= lastYear){
            newArr.push({type: e.type, value: e.value, date: e.date.slice(0, 7)})
        }
    })
    let expenses = new Array(12)
    expenses.fill(null)

    newArr.forEach(e => {
        let numInArr = parseInt(e.date.slice(5,7)) - (monthNow + 1)
        if(e.type === "expense"){
            if(numInArr <= 0){
                numInArr += 12
            }
            expenses[numInArr - 1] += e.value
        }
    })

    const state = {
      options: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          },
        },
        xaxis: {
          axisBorder: {
                  show: false
                },
          categories: newMonths,
        },
        yaxis: {
            labels: {
                  formatter: (val) => val + "zł"
                }
        },
        title: {
                text: 'Wydatki z ostatniego roku',
                floating: true,
                align: 'center',
                style: {
                  color: '#000000'
                }
              },
      },
      series: [
        {
          name: "Wydatki",
          data: expenses
        }
      ]

    };

    return (
      <Container>
            <Chart
                options={state.options}
                series={state.series}
                type="bar"/>
      </Container>
    )
}

export default ExpensesOverLastYear