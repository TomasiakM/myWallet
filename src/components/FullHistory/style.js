import styled from "styled-components"

export const Container = styled.div`
    margin: 20px 0;
    max-width: 700px;
    width: 100%;

    @media (max-width: 824px){
        margin: 0;
    }
`
export const HistoryHeader = styled.div`
    color: #2185d0;
    margin-top: 24px;
    font-size: 14px;
    border-bottom: 1px solid #353b48;
`

export const HistoryElement = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    border-bottom: 1px solid #353b48;
`

export const ElementInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    width: 100%;
`

export const Title = styled.div`
    align-items: center;
    box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;

    @media(max-width:824px){
        margin: 10px 4px;
        width: 100% - 8px);
    }

    h3{
        margin: 0;
    }
`

export const History = styled.div`
    box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);
    margin: 10px 0;
    padding: 10px;

     @media(max-width:824px){
        width: calc(100% - 8px);
        margin: 10px 4px;
    }
`