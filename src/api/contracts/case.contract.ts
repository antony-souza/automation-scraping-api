import { ApiResponse } from "../_types/api-response.type";

export interface ICaseContract {
    handler: (data: any) => Promise<ApiResponse>
}