import { getCookie } from "../JWT/cookie";

export function fetchMain(UserId: string) {
  return fetch(`/main?userId=${UserId}`, {
    method: "GET",
    headers: {
      "X-AUTH-TOKEN": getCookie("token"),
    },
  }).then((response) => {
    if (response.status !== 200) throw new Error(response.statusText);
    else return response.json();
  });
}

//로그인한 사용자의 정보를 불러오는 함수
export function fetchUser(UserId: any) {
  //API 받아서 연결하기
  return fetch(`/user/profile?id=${UserId}`, {
    method: "GET",
    headers: {
      "X-AUTH-TOKEN": getCookie("token"),
    },
  }).then((response) => response.json());
}

//관리자용 전체 사용자 리스트 불러오는 함수
export function fetchUserList() {
  //API 받아서 연결하기
  return fetch(`/admin/userList`, {
    method: "GET",
    headers: {
      "X-AUTH-TOKEN": getCookie("token"),
    },
  })
    .then((response) => response.json())
    .catch(() => console.log("fetch error"));
}
