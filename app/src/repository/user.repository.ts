import api from "../service/api";

interface BaseResponse {
  error?: string;
}

interface LoginResponse extends BaseResponse {
  currentBalance: number;
}

export default class UserRepository {
  async login(pin: string) {
    return await api.post<LoginResponse>("/pin", { pin });
  }
}
