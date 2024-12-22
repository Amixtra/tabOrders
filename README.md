# t오더 프론트엔드개발자 기술 면접 과제

## 프로젝트 실행

```
npm i
npm i json-server
npm run serve
npm start
```

`npm i` : 프로젝트 설치  
`npm i json-server` : json-server 설치  
`npm run serve` : mock server 실행(json-server / port:3001)
`npm start` : 프로젝트 실행

## 폴더 구조

```bash
├─ public
│   ├─ assets
│       ├─ icon
│       └─ img
└─ src
   ├─ components
   │   ├─ @share
   │   │   ├─ Button
   │   │   ├─ Layout
   │   │   └─ Toast
   │   ├─ Cart
   │   ├─ Nav
   │   └─ Product
   ├─ constants
   ├─ db
   ├─ features
   └─ types
```

`@share` : 공통으로 쓰이는 버튼, 토스트, 헤더, 푸터, 전체 레이아웃 등에 쓰이는 컴포넌트 폴더  
`Cart` : 장바구니 폴더  
`Nav` : 헤더에 있는 카테고리 네비게이션 폴더  
`Product` : 상품 리스트 폴더  
`constants` : palette 처럼 전역 상수로 쓰일 요소들을 모을 폴더  
`db` : mock server 데이터  
`features` : redux-toolkit 전역 상태관리 폴더  
`types` : 공용 타입 지정 폴더

## 기술 스택

- build : create-react-app
- language : typescript
- SPA framework : react
- CSS in JS : styled-components, scss
- global state management : react-redux, redux-toolkit

## 요구사항

### 상품 리스트 페이지

- 상품 리스트를 조회 할 수 있다.
- 상품은 좌측으로 정렬된다.
- 단일 상품을 장바구니에 추가 할 수 있다.

### 장바구니

- 현재 장바구니에 담긴 상품들을 조회 할 수 있다.
- 현재 장바구니에 담긴 상품들을 N 개 주문 할 수 있다.
- 현재 장바구니에 담긴 상품들을 N 개 제거 할 수 있다.
- 최종 결제 금액을 조회 할 수 있다.
- 증가한 장바구니 가로 영역만큼 상품 리스트 가로 비율이 감소한다.

### 주문

- 장바구니에 담긴 상품들을 제거한다.
- 장바구니를 닫는다.
- "주문이 완료되었습니다" 메시지 박스가 나타나며, 3초 후 사라진다.
- 상품 리스트의 가로 비율이 원상 복구 된다.

### 가산 사항

- [ ] 카테고리 클릭 시 ScrollSpy 기능을 제공한다.

## todos

- 상품이 품절일 때는 경고메시지를 띄우며 장바구니를 열지 않아야 한다.
- 장바구니의 모든 상품이 제거되면, 장바구니가 닫혀야 한다.
- 장바구니가 비어있을 때 주문하기를 누르면, 장바구니가 비어있다는 알림이 뜨고, 주문하기 기능이 작동하지 않아야 한다.

### 프로젝트 작가

```
@hayoung-jeremy
```