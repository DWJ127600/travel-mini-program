interface Response<T> {
  code: number;
  msg: string;
  data: T;
}

const baseURL = "https://m1.apifoxmock.com/m1/4728220-0-default";

const http = <T>(
  url: string,
  data: object = {},
  method:
    | "GET"
    | "OPTIONS"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT" = "GET"
) =>
  new Promise<T>((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      data,
      method,
      header: {
        token: uni.getStorageSync("token") || "",
      },
      success: (res) => {
        const response = res.data as Response<T>;

        if (res.statusCode === 200) {
          if (response.code === 1) {
            resolve(response.data);
          } else if (response.code === 0) {
            uni.showToast({
              title: response.msg,
              icon: "none",
            });
            reject(response.msg);
          }
        }
      },
      fail: (e) =>
        uni.showToast({
          title: e.errMsg,
          icon: "none",
        }),
    });
  });

export default http;
