export interface NovoUsuario {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export interface Usuario {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
}

export interface Login {
    username: string;
    password: string;
}
