import http from "@/services/http";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

export interface Attraction {
  id: number;
  title: string;
  img: string;
  dot: boolean;
  isDot: string;
  times: string;
  introduce: string;
  tag: string[];
}

const useAttraction = () => {
  const attractionList = ref<Attraction[]>([]);

  onLoad(async () => {
    const data = await http<Attraction[]>("/api/user/getHomeList");
    attractionList.value = data;
  });

  return { attractionList };
};

export default useAttraction;
