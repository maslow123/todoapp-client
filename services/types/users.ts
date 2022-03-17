export interface User {
    id: number;
    name: string;
    address: string;
    pic: string;
    created_at: string;
    updated_at: string;
    hashed_password: string;
    email: string;
};

export interface LoginRequest {
    email: string;
    password: string;
};

export interface LoginResponse {
    access_token: string;
    user: User;
    error: string;
};

export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    address: string;
    pic: string;
};

export interface RegisterUserResponse extends RegisterUserRequest {
    error: string;
};

export interface MeResponse {
    username: string;
    error: string;
};