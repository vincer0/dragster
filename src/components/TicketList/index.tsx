import React, { useState } from 'react'
import { ReactSortable, Sortable } from "react-sortablejs";
/** @jsx jsx */
import { jsx } from '@emotion/core'

import styles from './styles';
import TicketListItem from '../TicketListItem';
import Ticket from '../../models/Ticket';

const TicketList = (): JSX.Element => {
    const [tickets] = useState<Ticket[]>([
        {
            id: 0,
            summary: 'Lorem ipsum dolor sit amet.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, necessitatibus?',
        },
        {
            id: 1,
            summary: 'adipisicing elit. Blanditiis, necessitatibus?',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
            id: 2,
            summary: 'Blanditiis, necessitatibus?',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        {
            id: 3,
            summary: 'Blanditiis, necessitatibus? Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            estimation: 5,
        },
        {
            id: 4,
            summary: 'Blanditiis, necessitatibus? dolor sit amet consectetur',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            estimation: 8,
        }
    ])

    const [ticketsOrder, setTicketsOrder] = useState([4, 3, 1, 2, 0]);
    const [mappedTickets, ] = useState(ticketsOrder.map((ticketId, index) => tickets[ticketId]));
    const [nextTickets, setNextTickets] = useState(mappedTickets.filter((ticket, index) => {
        return index !== 0;
    }))
    const [currentTicket, setCurrentTicket] = useState<Array<Ticket>>([mappedTickets[0]]);
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [draggedTicket, setDraggedTicket] = useState<Ticket>();

    const handleOnStart = (event: Sortable.SortableEvent) => {
        event.preventDefault();
        setIsDragging(true);

        const oldDraggableIndex = event.oldDraggableIndex;

        if(oldDraggableIndex !== undefined) {
            const dragged = nextTickets.find((ticket, index) => {
                return index === oldDraggableIndex;
            })
            setDraggedTicket(dragged);
        }
    }

    const handleOnEnd = () => {
        setIsDragging(false);
        setIsOver(false);
        const newNextTickets = [...nextTickets];
        const newCurrentTicket = [...currentTicket];
        //get old current
        const oldCurrentTicket = currentTicket[0];
        //slice from current tickets
        newCurrentTicket.splice(0, 1);
        //unshift to nextTickets
        newNextTickets.unshift(oldCurrentTicket);
        //set newNextTickets && newCurrentTicket
        setCurrentTicket(newCurrentTicket);
        setNextTickets(newNextTickets);
        
    }

    const handleOnDragOver  = (event: React.DragEvent<HTMLDivElement>) => {
        console.log("over")
        event.preventDefault();
        setIsOver(true);
    }

    return (
        <div css={styles}>
            <div className="current">
                <div className="title">{`Current: `}</div>
                <ReactSortable list={currentTicket} setList={setCurrentTicket} onStart={handleOnStart} ghostClass="current-placeholder" group="shared">
                    {currentTicket.map((ticket) => (isDragging ? 
                    <div
                        key={ticket.id}
                        onDragOver={handleOnDragOver}
                        onDragLeave={() => setIsOver(false)} 
                        className="can-set-current"
                        style={isOver ? {
                            borderColor: 'white',
                            backgroundColor: '#6F767A'
                        } : undefined}
                    >{`Drag here to set as current`}
                    </div> : 
                    <TicketListItem ticket={ticket} key={ticket.id}></TicketListItem>))}
                </ReactSortable>
            </div>
            <div className="title">{`Next (${nextTickets.length})`}</div>
            <ReactSortable list={nextTickets} setList={setNextTickets} ghostClass="item-placeholder" onStart={handleOnStart} onEnd={handleOnEnd} group="shared">
                {nextTickets.map((ticket) => (<TicketListItem ticket={ticket} key={ticket.id}></TicketListItem>))}
            </ReactSortable>
        </div>
    )
}

export default TicketList
