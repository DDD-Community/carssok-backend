# Carssok

### 서비스 소개
- Carssok은 차량을 탈것 이상의 의미로 소중하게 여기는 사람들을 위한 차량 관리형 서비스입니다. 차량을 자신의 한 부분처럼 특별하게 여기는 유저들은 Carssok의 서비스를 이용하여 정비, 주유, 사고, 주행에 대한  일지 및 일어난 이벤트를 기록할수있습니다. 기록한 날짜나 관리타입 시기에 따라 적잘한 정비 시기를 자동으로 알림받거나 일어난 이벤트에 유저가 적절하게 대응할수 있도록 도와주는 차량 관리 유틸 서비스입니다.

### 기술 스택
- nestJs
- typeorm
- mysql
- AWS S3
- docker
- github actions
- sentry
- winston


### Carssok 폴더구조

```
📦src
 ┣ 📂car
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜createCarInfo.dto.ts
 ┃ ┃ ┗ 📜updateCarInfo.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┣ 📜brand.entity.ts
 ┃ ┃ ┣ 📜car.entity.ts
 ┃ ┃ ┣ 📜detail.entity.ts
 ┃ ┃ ┗ 📜model.entity.ts
 ┃ ┣ 📜car.controller.ts
 ┃ ┣ 📜car.module.ts
 ┃ ┣ 📜car.service.ts
 ┃ ┣ 📜carlist.controller.ts
 ┃ ┗ 📜carlist.service.ts
 ┣ 📂common
 ┃ ┣ 📂filter
 ┃ ┃ ┗ 📜common-exception.filter.ts
 ┃ ┗ 📂interceptor
 ┃ ┃ ┣ 📜response.interceptor.spec.ts
 ┃ ┃ ┣ 📜response.interceptor.ts
 ┃ ┃ ┣ 📜sentry.interceptor.spec.ts
 ┃ ┃ ┗ 📜sentry.interceptor.ts
 ┣ 📂image
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜image.entity.ts
 ┃ ┗ 📜image.service.ts
 ┣ 📂record
 ┃ ┣ 📂accident
 ┃ ┃ ┣ 📜accident.controller.spec.ts
 ┃ ┃ ┣ 📜accident.controller.ts
 ┃ ┃ ┣ 📜accident.service.spec.ts
 ┃ ┃ ┗ 📜accident.service.ts
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📂filter
 ┃ ┃ ┃ ┣ 📜base-filter.ts
 ┃ ┃ ┃ ┗ 📜record-filter.ts
 ┃ ┃ ┣ 📜accident-list-record-response.ts
 ┃ ┃ ┣ 📜accident-record-request.ts
 ┃ ┃ ┣ 📜accident-record-response.ts
 ┃ ┃ ┣ 📜fuel-list-record-response.ts
 ┃ ┃ ┣ 📜fuel-record-request.ts
 ┃ ┃ ┣ 📜fuel-record-response.ts
 ┃ ┃ ┣ 📜maintenance-list-record-response.ts
 ┃ ┃ ┣ 📜maintenance-record-request.ts
 ┃ ┃ ┣ 📜maintenance-record-response.ts
 ┃ ┃ ┣ 📜run-record-request.ts
 ┃ ┃ ┗ 📜run-record-response.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┣ 📜accident.entity.ts
 ┃ ┃ ┣ 📜fuel.entity.ts
 ┃ ┃ ┣ 📜maintenacnepart.entity.ts
 ┃ ┃ ┣ 📜maintenance.entity.ts
 ┃ ┃ ┣ 📜maintenancetime.entity.ts
 ┃ ┃ ┣ 📜record.entity.ts
 ┃ ┃ ┗ 📜run.entity.ts
 ┃ ┣ 📂fuel
 ┃ ┃ ┣ 📜fuel.controller.spec.ts
 ┃ ┃ ┣ 📜fuel.controller.ts
 ┃ ┃ ┣ 📜fuel.service.spec.ts
 ┃ ┃ ┗ 📜fuel.service.ts
 ┃ ┣ 📂maintenance
 ┃ ┃ ┣ 📜maintenance.controller.spec.ts
 ┃ ┃ ┣ 📜maintenance.controller.ts
 ┃ ┃ ┣ 📜maintenance.service.spec.ts
 ┃ ┃ ┗ 📜maintenance.service.ts
 ┃ ┣ 📂run
 ┃ ┃ ┣ 📜run.controller.spec.ts
 ┃ ┃ ┣ 📜run.controller.ts
 ┃ ┃ ┣ 📜run.service.spec.ts
 ┃ ┃ ┗ 📜run.service.ts
 ┃ ┣ 📜record.controller.ts
 ┃ ┗ 📜record.module.ts
 ┣ 📂simple-auth
 ┃ ┣ 📜simple-auth.controller.spec.ts
 ┃ ┣ 📜simple-auth.controller.ts
 ┃ ┣ 📜simple-auth.guard.spec.ts
 ┃ ┣ 📜simple-auth.guard.ts
 ┃ ┣ 📜simple-auth.middleware.spec.ts
 ┃ ┣ 📜simple-auth.middleware.ts
 ┃ ┗ 📜simple-auth.module.ts
 ┣ 📂user
 ┃ ┣ 📂entities
 ┃ ┃ ┣ 📜device.entity.ts
 ┃ ┃ ┗ 📜user.entity.ts
 ┃ ┣ 📜user.controller.spec.ts
 ┃ ┣ 📜user.controller.ts
 ┃ ┣ 📜user.module.ts
 ┃ ┣ 📜user.service.spec.ts
 ┃ ┗ 📜user.service.ts
 ┣ 📂utils
 ┃ ┣ 📜aws.ts
 ┃ ┣ 📜encryption.ts
 ┃ ┣ 📜type.ts
 ┃ ┗ 📜winston.util.ts
 ┣ 📜app.module.ts
 ┗ 📜main.ts
```

### Carssok ERD

![카쏙](https://private-user-images.githubusercontent.com/79198426/287697726-b1198588-51ac-4255-8348-3b3b26eeee69.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDE2OTM0MTksIm5iZiI6MTcwMTY5MzExOSwicGF0aCI6Ii83OTE5ODQyNi8yODc2OTc3MjYtYjExOTg1ODgtNTFhYy00MjU1LTgzNDgtM2IzYjI2ZWVlZTY5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjA0VDEyMzE1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJjNzJiYmRmZTQ0ODg2NzAxMmZkYjFhZDRiODUwOWY1MGUwMDIxZmNjYmY1OTIxZjUxMTVjNGRiM2VlMWRhZjQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Rdh6Gq-i_AvSgOOwpo-weFUIPHvhZ-9VuCCk4k5Ap7A)