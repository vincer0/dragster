import { css, SerializedStyles } from "@emotion/core";

export default (): SerializedStyles => css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 208px;
    border-radius: 4px;
    background-color: white;
    font-family: Arial;
    font-size: 14px;
    color: black;
    padding: 12px;
    margin-bottom: 16px;
    user-select: none;
    
    & .estimation {
        padding-top: 8px;
        color: red;
        font-weight: bold;
    }
`;