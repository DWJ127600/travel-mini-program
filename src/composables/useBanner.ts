import http from "@/services/http";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

interface BannerList {
  image: string;
  title: string;
}

interface Data {
  bannerList: BannerList[];
}

const useBanner = () => {
  const bannerList = ref<BannerList[]>([]);

  onLoad(async () => {
    const data = await http<Data>("/api/user/getBanner");
    bannerList.value = data.bannerList;
  });

  return { bannerList };
};

export default useBanner;
