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

        console.log(event)

        const oldDraggableIndex = event.oldDraggableIndex;

        if(oldDraggableIndex !== undefined) {
            const dragged = nextTickets.find((ticket, index) => {
                return index === oldDraggableIndex;
            })
            setDraggedTicket(dragged);
        }
    }

    const handleOnEnd = (event: Sortable.SortableEvent, sortable: Sortable | null) => {
        setIsDragging(false);
        setIsOver(false);
        //const oldCurrentTicket = currentTicket;

        const newTicketsOrder = [...ticketsOrder];
        mappedTickets.forEach((ticket, index) => newTicketsOrder[index] = ticket.id);
        setTicketsOrder(newTicketsOrder);
    }

    const handleOnDragOver  = (event: React.DragEvent<HTMLDivElement>) => {
        console.log("over")
        event.preventDefault();
        setIsOver(true);
    }

    const handleOnDrop = (event: Sortable.SortableEvent, sortable: Sortable | null) => {
        console.log("drop", event)
        event.preventDefault();
        setIsOver(false);

        const oldCurrentTicket = currentTicket[0];

        const newTicketsOrder = [...ticketsOrder];
        const newNextTickets = [...nextTickets];
        // TODO get grabbed element position from next tickets...
        //TODO current ticket is grabbed element
        if(draggedTicket) {
            const newDraggedTicket: Array<Ticket> = [];
            newDraggedTicket.push(draggedTicket);
            setCurrentTicket(newDraggedTicket);
            // splice draggedTicket from nextTicket
            const indexOfDragged = newNextTickets.indexOf(draggedTicket);
            newNextTickets.splice(indexOfDragged, 1, oldCurrentTicket);
            setNextTickets(newNextTickets);
        }
    }

    return (
        <div css={styles}>
            <div className="current">
                <div className="title">{`Current: `}</div>
                {isDragging ? <div 
                    onDragOver={handleOnDragOver}
                    onDragLeave={() => setIsOver(false)} 
                    className="can-set-current"
                    style={isOver ? {
                        borderColor: 'white',
                        backgroundColor: '#6F767A'
                    } : undefined}
                >{`Drag here to set as current`}
                </div> : 
                    <ReactSortable list={currentTicket} setList={setCurrentTicket} disabled onAdd={handleOnDrop}>
                        {currentTicket.map((ticket) => (<TicketListItem ticket={ticket} key={ticket.id}></TicketListItem>))}
                    </ReactSortable>
                }
            </div>
            <div className="title">{`Next (${nextTickets.length})`}</div>
            <ReactSortable list={nextTickets} setList={setNextTickets} ghostClass="item-placeholder" onStart={handleOnStart} onEnd={handleOnEnd}>
                {nextTickets.map((ticket, index) => (<TicketListItem ticket={ticket} key={ticket.id}></TicketListItem>))}
            </ReactSortable>
        </div>
    )
}

export default TicketList
