export default interface Ticket {
    id: number;
    summary: string;
    description: string;
    estimation?: number;
}