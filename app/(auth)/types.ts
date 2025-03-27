export interface Habit {
    id: number;
    name: string;
    emoji: string;
}

export interface SignupData {
    email: string;
    password: string;
    full_name: string;
    birthday: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export default {};