# 티오더 필리핀 사업 프로젝트

### application method:

```
npm i
npm i json-server <- 없을 예정(DB 추가 후)
npm run serve
npm start
```

`npm i` : 프로젝트 설치  
`npm i json-server` : json-server 설치 <- 없을 예정(DB 추가 후)
`npm run serve` : mock server 실행(json-server / port:3001)
`npm start` : 프로젝트 실행

### Tech spec:

- language : typescript
- SPA framework : react
- CSS in JS : styled-components, scss
- global state management : react-redux, redux-toolkit

## 요구사항

### todos

- 장바구니의 모든 상품이 제거되면, 장바구니가 닫혀야 한다.
- 장바구니가 비어있을 때 주문하기를 누르면, 장바구니가 비어있다는 알림이 뜨고, 주문하기 기능이 작동하지 않아야 한다.