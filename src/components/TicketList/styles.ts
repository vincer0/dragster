import { css, SerializedStyles } from "@emotion/core";

export default (): SerializedStyles => css`

.title {
    color: white;
    font-size: 16px;
    font-weight: bold;
    font-family: Arial;
    line-height: 14px;
    margin-bottom: 16px;
}

.item-placeholder {
    color: transparent;
    background-color: #272a2c;

    & .estimation {
        color: transparent;
    }
}

.can-set-current {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #adb8be;
    height: 56px;
    margin-bottom: 16px;
    border: 1px solid #adb8be;
    border-radius: 4px;
}
`;