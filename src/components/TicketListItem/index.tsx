// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'

import styles from './styles';
import Ticket from '../../models/Ticket';
interface Props {
    ticket: Ticket;
};

const TicketListItem = ({ticket}: Props) => {
    return (
        <div css={styles}>
            <div className="summary">{ticket.summary}</div>
            {ticket.estimation && <div className="estimation">{`Estimation: ${ticket.estimation}`}</div>}
        </div>
    )
}

export default TicketListItem;
