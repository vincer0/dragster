import React, { useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'

import styles from './styles';
import TicketListItem from '../TicketListItem';

const TicketList = (): JSX.Element => {
    const [tickets, setTickets] = useState([
        {
            id: 1,
            summary: 'Lorem ipsum dolor sit amet.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, necessitatibus?',
        },
        {
            id: 2,
            summary: 'adipisicing elit. Blanditiis, necessitatibus?',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
            id: 3,
            summary: 'Blanditiis, necessitatibus?',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
            id: 4,
            summary: 'Blanditiis, necessitatibus? Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            estimation: 5,
        },
        {
            id: 5,
            summary: 'Blanditiis, necessitatibus? dolor sit amet consectetur',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            estimation: 8,
        }
    ])

    const [currentTicket, setCurrentTicket] = useState(tickets[0]);
    return (
        <div css={styles}>
            <div className="current">
                <div className="title">{`Current: `}</div>
                <TicketListItem ticket={currentTicket} key={currentTicket.id}></TicketListItem>
            </div>
            { tickets.map(ticket => <TicketListItem ticket={ticket} key={ticket.id}></TicketListItem>) }
        </div>
    )
}

export default TicketList
