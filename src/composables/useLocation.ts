import http from "@/services/http";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

interface Location {
  id: number;
  title: string;
  count: number;
  location: string[];
  markers: {
    id: number;
    latitude: number;
    longitude: number;
    width: number;
    height: number;
    iconPath: "";
  }[];
  other: {
    id: number;
    name: string;
    url: string;
  }[];
}

const useLocation = () => {
  const location = ref<Location>({} as Location);

  onLoad(async (props: AnyObject | undefined) => {
    const data = await http<Location>(`/api/project/info?id=${props?.id}`);
    location.value = data;
  });

  return { location };
};

export default useLocation;
