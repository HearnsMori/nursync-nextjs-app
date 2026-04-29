
const initialData = {
    version: "v1",
    platform: "platform-",
    organization: "organization-",
    company: "company-",
    app: "app-",
    urlDomain: "https://core-api-lajo.onrender.com",
    // urlDomain: "http://localhost:10000",
};

class ApiClient {
    private id: string | null = null;
    private platform: string;
    private organization: string;
    private company: string;
    private app: string;
    private API_BASE_URL: string;
    private ACCESS_TOKEN_KEY = 'accessToken';
    private REFRESH_TOKEN_KEY = 'refreshToken';

    constructor(version: string, platform: string, organization: string, company: string, app: string, urlDomain: string = "https://core-api-lajo.onrender.com") {
        this.platform = platform;
        this.organization = organization;
        this.company = company;
        this.app = app;
        this.API_BASE_URL = `${urlDomain}/api/${version}`;
    }

    public alert(message: string, hex: string) {
        customAlert(message, hex, 1370);
    }

    public pushRecord(key: string, record: any) {
        pushRecord(key, record);
    }

    public popRecord(key: string, filter: any, edge: SelectionEdge = "first") {
        return popRecord(key, filter, edge);
    }

    public findRecord(key: string, filter: any, edge: SelectionEdge = "first") {
        return findRecord(key, filter, edge);
    }

    public findRecords(key: string, filter: any) {
        return findRecords(key, filter);
    }

    public sortRecords(records: any[], comparator: RecordComparator) {
        return sortRecords(records, comparator);
    }

    public searchRecords(records: any[], fieldKey: string, query: string) {
        return searchRecords(records, fieldKey, query);
    }

    public getStoreSnapshot() {
        return getStoreSnapshot();
    }

    public hydrateStore(snapshot: any) {
        hydrateStore(snapshot);
    }

    public clearKey(key: string) {
        clearKey(key);
    }
    
    public deleteKey(key: string) {
        deleteKey(key);
    }

    public countRecords(key: string) {
        return countRecords(key);
    }

    public isLogin() {
        return !!this.getAccessToken();
    }

    public Logout() {
        this.clearTokens();
        this.id = null;
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
    private async parseResponse(res: Response) {
        const text = await res.text();
        const body = text ? (() => {
            try {
                return JSON.parse(text);
            } catch {
                return text;
            }
        })() : null;

        if (!res.ok) {
            const errorMessage = `Request failed: ${res.status} ${res.statusText}`;
            throw new Error(body.message || errorMessage);
        }

        return body;
    }

    private async nonAuthFetch(url: string, options?: RequestInit) {
        console.log(`Request URL: ${this.API_BASE_URL}${url}`);
        console.log(`Request options:`, options);
        const res = await fetch(`${this.API_BASE_URL}${url}`, options);
        return this.parseResponse(res);
    }

    private async authFetch(url: string, options?: RequestInit) {
        console.log('Fetching:', `${this.API_BASE_URL}${url}`);
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

        return this.parseResponse(res);
    }

    //
    //
    // Auth Endpoints
    //
    //
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
            this.id = res.data.id;
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

    async mfa(enable: boolean) {
        return await this.authFetch('/auths/mfa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enable }),
        });
    }

    /*
    async sessions() {}
    */

    //
    //
    // User Endpoints
    //
    //
    async getUsers() {
        return await this.authFetch('/users');
    }

    async getUser(userId: string) {
        return await this.authFetch(`/users/${encodeURIComponent(userId)}`);
    }

    async createUser(payload: any) {
        return await this.authFetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    }

    async updateUser(userId: string, userLink: any | null, userData: any | null) {
        const res = await this.authFetch(`/users/${encodeURIComponent(userId)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userLink, userData }),
        });
        const { accessToken, refreshToken } = res;
        this.saveTokens(accessToken, refreshToken);
        return res;
    }

    async deleteUser(userId: string) {
        return await this.authFetch(`/users/${encodeURIComponent(userId)}`, { method: 'DELETE' });
    }

    async updatePassword(userId: string, newPassword: string) {
        return await this.authFetch(`/users/${encodeURIComponent(userId)}/password`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
        });
    }

    async updateStatus(userId: string, status: string) {
        return await this.authFetch(`/users/${encodeURIComponent(userId)}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
    }

    //
    //
    // Role Endpoints
    //
    //
    async getRoles() {
        return await this.authFetch('/roles');
    }

    async getRole(roleId: string) {
        return await this.authFetch(`/roles/${roleId}`);
    }

    async patchRole(roleId: string, newRoleId: string) {
        return await this.authFetch(`/roles/${roleId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roleId: newRoleId }),
        });
    }

    async deleteRole(roleId: string) {
        return await this.authFetch(`/roles/${roleId}`, { method: 'DELETE' });
    }

    async createRole(roleId: string) {
        return await this.authFetch('/roles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roleId }),
        });
    }

    async addMemberToRole(roleId: string, userId: string) {
        return await this.authFetch(`/roles/${roleId}/members/${userId}`, { method: 'POST' });
    }

    async removeMemberFromRole(roleId: string, userId: string) {
        return await this.authFetch(`/roles/${roleId}/members/${userId}`, { method: 'DELETE' });
    }

    async transferOwner(roleId: string, newOwner: String) {
        return await this.authFetch(`/roles/${roleId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newOwner }),
        });
    }

    async updatePermission(roleId: string, update: "push" | "pop", allowedToPushUser: string[], allowedToPopUser: string[]) {
        return await this.authFetch(`/roles/${roleId}/permissions`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update, allowedToPushUser, allowedToPopUser }),
        });
    }

    //
    //
    // Storage Endpoints
    //
    //
    async getStorageItems(id: string, path: string) {
        const res = await this.authFetch(`/storages/${id}/${this.platform}/${this.organization}/${this.company}/${this.app}/${path}`);
        return res?.[this.platform]?.[this.organization]?.[this.company]?.[this.app];
    }

    postStorageItems(id: string, path: string, value: any) {
        return this.authFetch(`/storages/${id}/${this.platform}/${this.organization}/${this.company}/${this.app}/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value }),
        });
    }

    patchStorageItems(id: string, path: string, value: any) {
        return this.authFetch(`/storages/${id}/${this.platform}/${this.organization}/${this.company}/${this.app}/${path}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value }),
        });
    }

    putStorageItems(id: string, path: string, value: any) {
        return this.authFetch(`/storages/${id}/${this.platform}/${this.organization}/${this.company}/${this.app}/${path}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value }),
        });
    }

    deleteStorageItems(id: string, path: string) {
        return this.authFetch(`/storages/${id}/${this.platform}/${this.organization}/${this.company}/${this.app}/${path}`, { method: 'DELETE' });
    }

    //
    //
    // Process Endpoints
    //
    //
    generateText(message: string, context?: string) {
        return this.authFetch('/processes/generatives/txts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context }),
        });
    }

    generateJson(payload: any) {
        return this.authFetch('/processes/generatives/jsons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    }
}








//Custom Alert
/**
 * Displays a custom styled alert overlay in the browser.
 *
 * @param text        - The message to display
 * @param hexColor    - Background color of the alert (e.g. "#ff4757")
 * @param displayTime - Duration in milliseconds before the alert auto-dismisses
 */
function customAlert(
    text: string,
    hexColor: string,
    displayTime: number
): void {
    if (typeof window === "undefined") return; // SSR guard

    const ALERT_ID = "custom-alert-overlay";

    // Remove any existing alert
    document.getElementById(ALERT_ID)?.remove();

    // ── Overlay ────────────────────────────────────────────────────────────────
    const overlay = document.createElement("div");
    overlay.id = ALERT_ID;

    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "top",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        zIndex: "99999",
        opacity: "0",
        transition: "opacity 200ms ease",
    } satisfies Partial<CSSStyleDeclaration>);

    // ── Card ───────────────────────────────────────────────────────────────────
    const card = document.createElement("div");

    Object.assign(card.style, {
        backgroundColor: hexColor,
        color: getContrastColor(hexColor),
        padding: "28px 36px",
        borderRadius: "12px",
        maxWidth: "420px",
        width: "90%",
        height: "fit-content",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
        transform: "scale(0.9)",
        transition: "transform 200ms ease",
        position: "relative",
    } satisfies Partial<CSSStyleDeclaration>);

    // ── Message ────────────────────────────────────────────────────────────────
    const message = document.createElement("p");
    message.textContent = text;
    Object.assign(message.style, {
        margin: "0 0 20px 0",
        wordBreak: "break-word",
    } satisfies Partial<CSSStyleDeclaration>);

    // ── Progress bar ───────────────────────────────────────────────────────────
    const progressWrap = document.createElement("div");
    Object.assign(progressWrap.style, {
        height: "4px",
        borderRadius: "2px",
        backgroundColor: "rgba(255,255,255,0.25)",
        overflow: "hidden",
    } satisfies Partial<CSSStyleDeclaration>);

    const progressBar = document.createElement("div");
    Object.assign(progressBar.style, {
        height: "100%",
        width: "100%",
        backgroundColor: getContrastColor(hexColor),
        opacity: "0.6",
        transition: `width ${displayTime}ms linear`,
    } satisfies Partial<CSSStyleDeclaration>);

    progressWrap.appendChild(progressBar);

    // ── Close button ───────────────────────────────────────────────────────────
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";

    Object.assign(closeBtn.style, {
        position: "absolute",
        top: "10px",
        right: "14px",
        background: "none",
        border: "none",
        color: getContrastColor(hexColor),
        fontSize: "16px",
        cursor: "pointer",
        opacity: "0.7",
        lineHeight: "1",
        padding: "0",
    } satisfies Partial<CSSStyleDeclaration>);

    // ── Dismiss logic ──────────────────────────────────────────────────────────
    const dismiss = () => {
        overlay.style.opacity = "0";
        card.style.transform = "scale(0.9)";
        setTimeout(() => overlay.remove(), 220);
    };

    closeBtn.addEventListener("click", dismiss);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) dismiss();
    });

    // ── Assemble ───────────────────────────────────────────────────────────────
    card.appendChild(closeBtn);
    card.appendChild(message);
    card.appendChild(progressWrap);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // ── Animate in ────────────────────────────────────────────────────────────
    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        card.style.transform = "scale(1)";

        // Kick off progress bar shrink on the next paint so the transition fires
        requestAnimationFrame(() => {
            progressBar.style.width = "0%";
        });
    });

    // ── Auto-dismiss ───────────────────────────────────────────────────────────
    const timer = setTimeout(dismiss, displayTime);

    // Clean up timer if card is manually dismissed before timeout
    closeBtn.addEventListener("click", () => clearTimeout(timer));
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) clearTimeout(timer);
    });
}

// ── Helper: pick black or white text based on hex background luminance ────────
function getContrastColor(hex: string): "#ffffff" | "#1a1a1a" {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    // Perceived luminance (WCAG formula)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? "#1a1a1a" : "#ffffff";
}







// ─────────────────────────────────────────────────────────────────────────────
// Util for data storing
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

/** A plain JSON-serialisable object. */
export type JsonRecord = Record<string, unknown>;

/**
 * The global store: each key maps to an ordered array of JsonRecord objects.
 * e.g.  { users: [...], products: [...] }
 */
export type DataStore = Record<string, JsonRecord[]>;

/** Whether to operate on the first or last matching element. */
export type SelectionEdge = "first" | "last";

/**
 * A partial JsonRecord used as a match filter.
 * Every key/value pair in the filter must exist (and be equal) in the target record.
 */
export type MatchFilter = Partial<JsonRecord>;

/** A comparator that receives two records and returns a numeric sort order. */
export type RecordComparator = (a: JsonRecord, b: JsonRecord) => number;

// ── Internal state ────────────────────────────────────────────────────────────

/**
 * The singleton store for this page.
 * You may pre-populate it before importing other functions:
 *
 *   import { globalData } from "./dataStore";
 *   globalData.users = [{ id: 1, name: "Alice" }];
 */
export const globalData: DataStore = {};

// ── Internal helpers ──────────────────────────────────────────────────────────

/**
 * Returns true when every key/value pair in `filter` matches the given record.
 */
function matchesFilter(record: JsonRecord, filter: MatchFilter): boolean {
    return Object.entries(filter).every(([k, v]) => record[k] === v);
}

/**
 * Ensures a key exists in the store, initialising it to [] if absent.
 */
function ensureKey(key: string): JsonRecord[] {
    if (!Array.isArray(globalData[key])) {
        globalData[key] = [];
    }
    return globalData[key];
}

// ── Write operations ──────────────────────────────────────────────────────────

/**
 * Appends a single record to the array stored under `key`.
 *
 * @param key    - Store key (created automatically if it does not exist).
 * @param record - The JSON record to append.
 * @returns      The updated array for that key.
 *
 * @example
 * pushRecord("users", { id: 3, name: "Charlie" });
 */
function pushRecord(key: string, record: JsonRecord): JsonRecord[] {
    const bucket = ensureKey(key);
    bucket.push(record);
    return bucket;
}

/**
 * Appends multiple records to the array stored under `key`.
 *
 * @param key     - Store key.
 * @param records - Array of JSON records to append.
 * @returns       The updated array for that key.
 *
 * @example
 * pushRecords("users", [{ id: 4, name: "Dave" }, { id: 5, name: "Eve" }]);
 */
function pushRecords(key: string, records: JsonRecord[]): JsonRecord[] {
    const bucket = ensureKey(key);
    bucket.push(...records);
    return bucket;
}

/**
 * Removes **one** record that matches `filter` from the array stored under `key`.
 * Use `edge` to control whether the first or last match is removed.
 *
 * @param key    - Store key.
 * @param filter - Partial record whose key/value pairs must all match.
 * @param edge   - `"first"` (default) removes the earliest match; `"last"` removes the latest.
 * @returns      The removed record, or `null` if no match was found.
 *
 * @example
 * popRecord("users", { name: "Alice" }, "first");
 */
function popRecord(
    key: string,
    filter: MatchFilter,
    edge: SelectionEdge = "first"
): JsonRecord | null {
    const bucket = globalData[key];
    if (!bucket) return null;

    const indices = bucket.reduce<number[]>((acc, rec, i) => {
        if (matchesFilter(rec, filter)) acc.push(i);
        return acc;
    }, []);

    if (indices.length === 0) return null;

    const targetIndex = edge === "first" ? indices[0] : indices[indices.length - 1];
    const [removed] = bucket.splice(targetIndex, 1);
    return removed;
}

/**
 * Removes **all** records that match `filter` from the array stored under `key`.
 *
 * @param key    - Store key.
 * @param filter - Partial record whose key/value pairs must all match.
 * @returns      Array of removed records (empty array if none matched).
 *
 * @example
 * popRecords("users", { role: "guest" });
 */
function popRecords(key: string, filter: MatchFilter): JsonRecord[] {
    const bucket = globalData[key];
    if (!bucket) return [];

    const removed: JsonRecord[] = [];
    globalData[key] = bucket.filter((rec) => {
        if (matchesFilter(rec, filter)) {
            removed.push(rec);
            return false;
        }
        return true;
    });

    return removed;
}

// ── Read operations ───────────────────────────────────────────────────────────

/**
 * Returns **one** record from the array stored under `key` that matches `filter`.
 * Use `edge` to control whether the first or last match is returned.
 *
 * @param key    - Store key.
 * @param filter - Partial record whose key/value pairs must all match.
 * @param edge   - `"first"` (default) returns the earliest match; `"last"` returns the latest.
 * @returns      The matching record, or `null` if not found.
 *
 * @example
 * findRecord("users", { id: 2 }, "first");
 */
function findRecord(
    key: string,
    filter: MatchFilter,
    edge: SelectionEdge = "first"
): JsonRecord | null {
    const bucket = globalData[key];
    if (!bucket) return null;

    if (edge === "first") {
        return bucket.find((rec) => matchesFilter(rec, filter)) ?? null;
    }

    for (let i = bucket.length - 1; i >= 0; i--) {
        if (matchesFilter(bucket[i], filter)) return bucket[i];
    }
    return null;
}

/**
 * Returns **all** records from the array stored under `key` that match `filter`.
 *
 * @param key    - Store key.
 * @param filter - Partial record whose key/value pairs must all match.
 * @returns      Array of matching records (empty array if none matched or key absent).
 *
 * @example
 * findRecords("users", { role: "admin" });
 */
function findRecords(key: string, filter: MatchFilter): JsonRecord[] {
    const bucket = globalData[key];
    if (!bucket) return [];
    return bucket.filter((rec) => matchesFilter(rec, filter));
}

// ── Sort & Search ─────────────────────────────────────────────────────────────

/**
 * Returns a **new** sorted array from `records` without mutating the original.
 *
 * The `comparator` follows the standard `Array.prototype.sort` signature:
 *   - Return < 0  → a comes before b
 *   - Return > 0  → b comes before a
 *   - Return 0    → order is unchanged
 *
 * Built-in named comparators are available via `Comparators`.
 *
 * @param records    - Array of JSON records to sort.
 * @param comparator - Custom sort function, or one from `Comparators`.
 * @returns          A new array of the same length, sorted by the comparator.
 *
 * @example
 * // Custom formula
 * sortRecords(myList, (a, b) => (a.price as number) - (b.price as number));
 *
 * // Built-in helper
 * sortRecords(myList, Comparators.byKey("name", "alphabetical"));
 */
function sortRecords(
    records: JsonRecord[],
    comparator: RecordComparator
): JsonRecord[] {
    return [...records].sort(comparator);
}

/**
 * A collection of ready-made comparators for use with `sortRecords`.
 */
export const Comparators = {
    /**
     * Sort by a single key.
     *
     * @param key       - The record key to sort by.
     * @param direction - `"alphabetical"` (A→Z), `"reverse-alphabetical"` (Z→A),
     *                    `"ascending"` (0→9), or `"descending"` (9→0).
     */
    byKey(
        key: string,
        direction: "alphabetical" | "reverse-alphabetical" | "ascending" | "descending" = "ascending"
    ): RecordComparator {
        return (a, b) => {
            const av = a[key];
            const bv = b[key];

            if (direction === "ascending" || direction === "descending") {
                const diff = (av as number) - (bv as number);
                return direction === "ascending" ? diff : -diff;
            }

            const as = String(av ?? "");
            const bs = String(bv ?? "");
            const cmp = as.localeCompare(bs);
            return direction === "alphabetical" ? cmp : -cmp;
        };
    },

    /**
     * Sort by multiple keys in priority order.
     * The first comparator in the list takes precedence; ties fall through to the next.
     *
     * @example
     * Comparators.compound(
     *   Comparators.byKey("department", "alphabetical"),
     *   Comparators.byKey("salary", "descending")
     * )
     */
    compound(...comparators: RecordComparator[]): RecordComparator {
        return (a, b) => {
            for (const cmp of comparators) {
                const result = cmp(a, b);
                if (result !== 0) return result;
            }
            return 0;
        };
    },

    /** Sort randomly (Fisher-Yates-style shuffle via sort). */
    random(): RecordComparator {
        return () => Math.random() - 0.5;
    },
} as const;

/**
 * Performs a fuzzy search over `records` by `fieldKey`, ranking each record
 * by its similarity to `query`.
 *
 * - Returns a **new array of the same length** as `records`.
 * - Records with no value for `fieldKey` are ranked last.
 * - Matching is case-insensitive.
 * - Similarity score (higher = more similar):
 *   1. Exact match           → score 4
 *   2. Starts with query     → score 3
 *   3. Contains query        → score 2
 *   4. Shared characters (%) → score 0–1
 *
 * @param records  - Array of JSON records to search within.
 * @param fieldKey - The record key whose value is compared against `query`.
 * @param query    - The search string.
 * @returns        A new array sorted from most → least similar to `query`.
 *
 * @example
 * searchRecords(products, "name", "shoe");
 */
function searchRecords(
    records: JsonRecord[],
    fieldKey: string,
    query: string
): JsonRecord[] {
    const normalised = query.toLowerCase().trim();

    function score(record: JsonRecord): number {
        const raw = record[fieldKey];
        if (raw == null) return -1;
        const value = String(raw).toLowerCase();

        if (value === normalised) return 4;
        if (value.startsWith(normalised)) return 3;
        if (value.includes(normalised)) return 2;

        // Character-overlap ratio as a fractional score in [0, 1)
        const queryChars = new Set(normalised);
        const overlap = [...value].filter((c) => queryChars.has(c)).length;
        return overlap / Math.max(value.length, normalised.length);
    }

    return [...records].sort((a, b) => score(b) - score(a));
}

// ── Store management ──────────────────────────────────────────────────────────

/**
 * Returns a shallow snapshot of the current store (safe to serialise to JSON).
 */
function getStoreSnapshot(): DataStore {
    return Object.fromEntries(
        Object.entries(globalData).map(([k, v]) => [k, [...v]])
    );
}

/**
 * Replaces the entire store with `snapshot`.
 * Useful for hydrating from localStorage, an API, or SSR page props.
 *
 * @example
 * hydrateStore({ users: [...], products: [...] });
 */
function hydrateStore(snapshot: DataStore): void {
    Object.keys(globalData).forEach((k) => delete globalData[k]);
    Object.entries(snapshot).forEach(([k, v]) => {
        globalData[k] = [...v];
    });
}

/**
 * Removes all records for a given key without deleting the key itself.
 */
function clearKey(key: string): void {
    if (globalData[key]) globalData[key] = [];
}

/**
 * Deletes a key and its records from the store entirely.
 */
function deleteKey(key: string): void {
    delete globalData[key];
}

/**
 * Returns the number of records stored under `key`.
 */
function countRecords(key: string): number {
    return globalData[key]?.length ?? 0;
}

const coreApi = new ApiClient(
    initialData.version,
    initialData.platform,
    initialData.organization,
    initialData.company,
    initialData.app,
    initialData.urlDomain
);
export default coreApi;