import { ApiResponse } from "../_types/api-response.type";

export interface ICaseContract {
    handler: (...args: any[]) => Promise<ApiResponse>
}