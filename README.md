# Chalkak<img src="https://user-images.githubusercontent.com/78731710/201506727-f2e0d189-25c1-4a39-bc9c-54f9445502ae.png" width="100px" align="left" />

<br>
<br>

## Contributors
|기획자|디자이너|FrontEnd 개발자|FrontEnd 개발자|BackEnd 개발자|
| :------------------------------------------------------------: | :------------------------------------------------------------: | :------------------------------------------------------------: | :------------------------------------------------------------: | :------------------------------------------------------------: |
|순|키키|스텔라|재이|미나|

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
