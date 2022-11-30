# Chalkak<img src="https://user-images.githubusercontent.com/78731710/201506727-f2e0d189-25c1-4a39-bc9c-54f9445502ae.png" width="100px" align="left" />
필름 현상/스캔 과정을 돕고, 필름 사진 및 관련 정보를 공유하는 서비스

<br>
<br>

## Contributors
|기획자|디자이너|FrontEnd 개발자|FrontEnd 개발자|BackEnd 개발자|
| :------------------------------------------------------------: | :------------------------------------------------------------: | :------------------------------------------------------------: | :------------------------------------------------------------: | :------------------------------------------------------------: |
|순|키키|스텔라|재이|미나|

## App Preview
<img width="990" alt="스크린샷 2022-11-30 오전 11 10 05" src="https://user-images.githubusercontent.com/78731710/204690641-ec2f9f32-bd5c-468f-ac1e-61efe363a333.png">
<img width="995" alt="스크린샷 2022-11-30 오전 11 09 19" src="https://user-images.githubusercontent.com/78731710/204690736-b1ed3708-1d00-4c6f-8838-b3efea7aba45.png">

## Library
- React-native
- TypeScript
- React-Query
- Recoil

## Folder Architecture
```
.
|-- src
|   |-- api                        // api 별로 파일을 구분해서 관리
|   |   |-- client.ts
|   |-- assets
|   |-- atoms
|   |-- components                 // 기능별로 개별 사용 컴포넌트 분리
|   |   |-- Community
|   |   |-- Home
|   |   |-- Login
|   |   |-- Map
|   |   |-- Mypage
|   |   |-- Pickup
|   |   |-- Search
|   |-- constants
|   |-- hooks
|   |-- queries
|   |-- screens                    // 기능별 Screen 폴더 분리
|   |   |-- Community
|   |   |-- Home
|   |   |-- Login
|   |   |-- Map
|   |   |-- Mypage
|   |   |-- Pickup
|   |   |-- Search
|   |-- storages
|   |-- MainTab.tsx                
|   |-- RootStack.tsx
|   |-- types.ts
|-- App.tsx
|-- tsconfig.json
|-- tsconfig.json
|-- package.json
|-- yarn.lock
```
