import http from "@/services/http";
import { ref } from "vue";

export interface UserInfo {
  nickName: string;
  avatarUrl: string;
}

const useUserInfo = () => {
  const userInfo = ref<UserInfo>({} as UserInfo);

  const getUserInfo = async () => {
    const data = await http<UserInfo>("/api/getUserInfo");
    userInfo.value = data;
  };

  return { userInfo, getUserInfo };
};

export default useUserInfo;
