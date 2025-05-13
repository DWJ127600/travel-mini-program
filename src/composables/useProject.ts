import http from "@/services/http";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

interface Project {
  id: number;
  url: string;
  tag: string;
  title: string;
  desc: string;
}

const useProject = () => {
  const projectList = ref<Project[]>([]);

  onLoad(async () => {
    const data = await http<Project[]>("/api/detail/project");
    projectList.value = data;
  });

  return { projectList };
};

export default useProject;
