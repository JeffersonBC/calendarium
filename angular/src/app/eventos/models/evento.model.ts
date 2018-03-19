export interface Evento {
    name: string;
    description: string;
    start_datetime: string;
    end_datetime: string;
}

export interface Convites {
    invited: any[];
    subscribed: any[];
    rejected: any[];
}
