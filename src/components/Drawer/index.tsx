// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'

import styles from './styles';
import TicketList from '../TicketList';

const Drawer = () => {
    return (
        <div css={styles}> 
            <TicketList></TicketList>
        </div>
    )
}

export default Drawer

