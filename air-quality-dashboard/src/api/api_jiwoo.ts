export function fetchMain(UserId : string) {
    return fetch(`/main?userId=${UserId}`).then((response) =>
        response.json()
    );
}

//로그인한 사용자의 정보를 불러오는 함수
export function fetchUser() {
    //API 받아서 연결하기
    /*return fetch(``).then((response) =>
        response.json()
    );*/
}

//관리자용 전체 사용자 리스트 불러오는 함수
export function fetchUserList() {
    //API 받아서 연결하기
    /*return fetch(``).then((response) =>
        response.json()
    );*/
}