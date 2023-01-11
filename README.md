# 네이버 지도 구현해보기

-   페이지 로드 -> 내 위치 정보를 받기 -> 마커 생성과 함께 확대된 위치 보이기

-   로컬에서 실행해보니, 내 위치 정보가 항상 정확한 위치는 아니고 그 근처에 찍히는 경우도 있다.

## 실행해보기

1. [클라이언트 아이디 발급](https://navermaps.github.io/maps.js.ncp/docs/tutorial-1-Getting-Client-ID.html)

-   `Web Dynamic Map API`의 Application을 생성해서 client id를 발급 받습니다.

-   프로젝트 폴더 최상위에 `.env` 파일 생성

```ini
VITE_NAVER_MAP_CLIENT_ID={Client id를 넣어주세요.}
```

2. npm 생성 & 로컬 서버 실행

```bash
$ npm install

$ npm run dev
```
