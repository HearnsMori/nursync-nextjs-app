class ApiClient {
    //private URL_DOMAIN = 'https://localhost:10000';
    private URL_DOMAIN = 'http://localhost:10000';
    private API_BASE_URL: string;
    private ACCESS_TOKEN_KEY = 'accessToken';
    private REFRESH_TOKEN_KEY = 'refreshToken';

    constructor(baseUrl?: string) {
        this.API_BASE_URL = `${this.URL_DOMAIN}/api/v1`;
    }

    // ===== Token Helpers =====
    private saveTokens(accessToken: string, refreshToken?: string) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        if (refreshToken) localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    private getAccessToken() {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    private clearTokens() {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    // ===== Core Fetch Helpers =====
    private async nonAuthFetch(url: string, options?: RequestInit) {
        //alert(`${this.API_BASE_URL}${url}`);
        const res = await fetch(`${this.API_BASE_URL}${url}`, options);
        //alert(JSON.stringify(res));
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
    }

    private async authFetch(url: string, options?: RequestInit) {
        let token = this.getAccessToken();

        const doFetch = async (accessToken: string) =>
            fetch(`${this.API_BASE_URL}${url}`, {
                ...options,
                headers: {
                    ...(options?.headers || {}),
                    Authorization: `Bearer ${accessToken}`,
                },
            });

        let res = await doFetch(token!);
        
        if (res.status === 401) {
            token = await this.refreshToken();
            res = await doFetch(token);
        }

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
    }

    // ===== Auth Endpoints =====
    async signup(id: string, password: string, link?: any, data?: any) {
        //alert(JSON.stringify(data));
        return this.nonAuthFetch('/auths/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password, link, data }),
        });
    }

    async login(id: string, password: string) {
        const res = await this.nonAuthFetch('/auths/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password }),
        });
        if (res.success) {
            const { accessToken, refreshToken } = res.data;
            this.saveTokens(accessToken, refreshToken);
        }
        return res;
    }

    async recover(userId: string, newPassword: string) {
        return this.nonAuthFetch('/auths/recover', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, newPassword }),
        });
    }

    async refreshToken(): Promise<string> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');

        const res = await fetch(`${this.API_BASE_URL}/auths/refresh-token`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (!res.ok) {
            this.clearTokens();
            throw new Error('Failed to refresh token');
        }

        const data = await res.json();
        const { accessToken } = data.data;
        this.saveTokens(accessToken);
        return accessToken;
    }

    // ===== Users Endpoints =====
    getUsers() {
        return this.authFetch('/users/users');
    }

    getUser(userId: string) {
        return this.authFetch(`/users/users/${encodeURIComponent(userId)}`);
    }

    createUser(payload: any) {
        return this.authFetch('/users/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    }

    async updateUser(userId: string, payload: any) {
        const res = await this.authFetch(`/users/users/${encodeURIComponent(userId)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const { accessToken, refreshToken } = res;
        this.saveTokens(accessToken, refreshToken);
        return res;
    }

    deleteUser(userId: string) {
        return this.authFetch(`/users/users/${encodeURIComponent(userId)}`, { method: 'DELETE' });
    }

    // ===== Roles Endpoints =====
    getRoles() {
        return this.authFetch('/roles');
    }

    getRole(roleId: string) {
        return this.authFetch(`/roles/${roleId}`);
    }

    createRole(payload: any) {
        return this.authFetch('/roles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    }

    addMemberToRole(roleId: string, userId: string) {
        return this.authFetch(`/roles/${roleId}/members/${userId}`, { method: 'POST' });
    }

    removeMemberFromRole(roleId: string, userId: string) {
        return this.authFetch(`/roles/${roleId}/members/${userId}`, { method: 'DELETE' });
    }

    // ===== Storage Endpoints =====
    getStorageItems(path: string) {
        return this.authFetch(`/storages/${path}`);
    }

    postStorageItem(path: string, value: any) {
        return this.authFetch(`/storages/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value }),
        });
    }

    patchStorageItem(path: string, value: any) {
        return this.authFetch(`/storages/${path}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value }),
        });
    }

    putStorageItem(path: string, value: any) {
        return this.authFetch(`/storages/${path}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value }),
        });
    }

    deleteStorageItem(path: string) {
        return this.authFetch(`/storages/${path}`, { method: 'DELETE' });
    }

    // ===== Processes Endpoints =====
    generateText(message: string, context?: string) {
        return this.authFetch('/processes/generatives/texts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context }),
        });
    }

    generateJson(message: string, context?: string) {
        return this.authFetch('/processes/generatives/jsons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context }),
        });
    }
}

const coreApi = new ApiClient();
export default coreApi;

