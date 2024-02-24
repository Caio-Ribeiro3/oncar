export class Fetcher {
    private baseURL: string;

    constructor({ baseURL }: { baseURL: string }) {
        this.baseURL = baseURL
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
    }

    get<Response>(to: string) {
        return fetch(`${this.baseURL}${to}`, {
            headers: {
                'content-type': 'application/json'
            }

        }).then(res => {
            if (!res.ok) {
                throw new Error('request error')
            }
            return res.json()
        }) as unknown as Response
    }

    post<Response>(to: string, body?: Record<string, unknown>) {
        return fetch(`${this.baseURL}${to}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error('request error')
            }
            return res.json()
        }) as unknown as Response
    }
}

export const fetcher = new Fetcher({
    baseURL: process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3001/api/v1'
})