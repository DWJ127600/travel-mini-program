import http from "@/services/http";
import { ref } from "vue";

interface Data {
  token: string;
}

interface Body {
  code: string;
}

const useLogin = () => {
  const token = ref("");

  const login = async (code: string) => {
    const data = await http<Data>("/api/login", { code }, "POST");
    token.value = data.token;
  };

  return { token, login };
};

export default useLogin;
