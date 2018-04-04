export interface Evento {
    name: string;
    description: string;
    start_datetime: string;
    end_datetime: string;
}

export interface EventoDetalhes {
    event: Evento;
    creator: string;
    subscription_id: number;
    invited: number;
    subscribed: number;
    rejected: number;
}
