interface IResponse<D> {
    result: "success",
    data: D
}

interface IErrorResponse {
    result: "error",
    message: string,
}

export async function POSTApiRequest<B, D>(url: string, body: B, signal?: AbortSignal ): Promise<IResponse<D> | IErrorResponse> {
    try {
        const response = await fetch(`http://localhost:3001${url}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
            signal
        })

        return await response.json();
    } catch(error) {
        console.log(error);
        return { result: "error", message: "Произошла непредвиденная ошибка" };
    }
}