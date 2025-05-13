import { ref } from "vue";
import type { Attraction } from "./useAttraction";
import { onLoad } from "@dcloudio/uni-app";
import http from "@/services/http";

const useLike = () => {
  const likeList = ref<Attraction[]>([]);

  onLoad(async () => {
    const data = await http<Attraction[]>("/api/like/list");
    likeList.value = data;
  });

  return { likeList };
};

export default useLike;
