import styled from "styled-components"

export const Container = styled.div`
    width: calc(100% - 20px);
    display: flex;
    margin: 20px;
    margin-left: 0;
    padding: 10px;
    box-shadow: 0 2px 5px 0px rgba(50, 50, 50, 0.6);

    @media(max-width: 824px){
        width: calc(100% - 8px);
        align-items: baseline;
        margin: 0 0 10px;
    }
`

export const HistoryHeader = styled.div`
    margin-top: 24px;
    padding: 0 4px 4px;
    font-size: 14px;
    color: #2185d0;
    border-bottom: 1px solid #353b48;
`

export const HistoryElement = styled.div`
    padding: 10px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #353b48;
`

export const ElementInfo = styled.div`
    width: 100%;
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
`

export const Title = styled.div`
    display: flex;
    align-items: center;

    h3{
        margin: 0;
        margin-right: 10px;
    }
`