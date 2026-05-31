# 신장질환을 이긴 고양이 케어

네이버 카페 회원들이 무료로 사용할 수 있는 고양이 환묘 케어 웹서비스 프로토타입입니다. Node 서버가 정적 SPA와 API를 함께 제공하며, Render PostgreSQL이 연결되면 회원가입 승인, 로그인, 케어 데이터가 DB에 저장됩니다. DB가 없는 로컬 개발 환경에서는 브라우저 `localStorage`로 동작합니다.

## 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열면 됩니다.

DB 없이 실행하면 브라우저 `localStorage`에 저장됩니다. 로컬 PostgreSQL까지 함께 테스트하려면 Docker Compose로 DB를 띄운 뒤 `dev:db`를 사용합니다.

```bash
npm run db:up
npm run dev:db
```

로컬 DB 접속 정보는 다음과 같습니다.

- Host: `localhost`
- Port: `5432`
- Database: `sinego_care`
- User: `sinego`
- Password: `sinego_dev_password`
- DATABASE_URL: `postgresql://sinego:sinego_dev_password@localhost:5432/sinego_care`

로컬 관리자 토큰 기본값은 `dev-admin-token`입니다. 가입 신청을 승인하려면:

```bash
curl -H "x-admin-token: dev-admin-token" \
  "http://localhost:5173/api/admin/users?status=pending"

curl -X PATCH \
  -H "content-type: application/json" \
  -H "x-admin-token: dev-admin-token" \
  -d '{"approvalStatus":"approved"}' \
  "http://localhost:5173/api/admin/users/USER_ID"
```

로컬 DB를 중지하려면:

```bash
npm run db:down
```

## Render 배포

PostgreSQL 연동을 위해 Render Static Site가 아니라 Node Web Service로 배포합니다. `render.yaml`에는 Node 웹 서비스와 Render PostgreSQL 인스턴스가 함께 정의되어 있습니다. 베타 비용을 줄이기 위해 DB는 `free` 플랜으로 두었고, 실제 회원 데이터가 쌓이기 시작하면 유료 플랜과 백업 정책을 검토해야 합니다.

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Required env: `DATABASE_URL`
- Admin env: `ADMIN_TOKEN`

기존에 Static Site로 만든 서비스는 런타임을 Node로 직접 바꾸기 어려울 수 있습니다. 이 경우 Render에서 새 Web Service를 만들거나 Blueprint를 다시 적용해야 합니다.

## 관리자 승인 API

가입 신청자는 기본 `pending` 상태이며, 운영자가 신이고 닉네임과 네이버 ID를 확인한 뒤 승인해야 로그인할 수 있습니다.

브라우저 관리자 화면은 `/admin`에서 사용할 수 있습니다.

- 로컬: `http://localhost:5173/admin`
- 배포: `<서비스 주소>/admin`

관리자 화면에서 `ADMIN_TOKEN`을 입력하면 승인 대기, 승인됨, 보류 회원을 확인하고 상태를 변경할 수 있습니다.

```bash
curl -H "x-admin-token: $ADMIN_TOKEN" \
  "<서비스 주소>/api/admin/users?status=pending"

curl -X PATCH \
  -H "content-type: application/json" \
  -H "x-admin-token: $ADMIN_TOKEN" \
  -d '{"approvalStatus":"approved"}' \
  "<서비스 주소>/api/admin/users/USER_ID"
```

## 포함 기능

- 첫 화면 회원가입/로그인, 네이버 ID와 신이고 닉네임 입력, 둘러보기 계정
- 고양이 프로필과 체중/나이/건강상태 기반 하루 칼로리 계산
- 수액 종류 선택, 스케줄 생성, 오늘 일정, 완료 기록
- 영양제/처방약/식이섬유 투약 스케줄 생성, 체크리스트, 오늘 일정, 완료 기록
- 구토/설사 횟수와 색 기록
- 건식/습식 영양 성분 검색, DM 기준 변환, 하루 급여량 계산
- 습식+건식 혼합 급여 계획표
- 간식 g수별 칼로리와 하루 비율 계산
- 혈액검사 PDF 자동 입력, 신장수치/췌장수치 기록, 최근 수치 요약, 이전 기록 대비 변화 표시
- 체중 기록, 추세 차트
- 게시판, 댓글
- 운영비+서버비 후원 안내 메뉴
- 홈 화면 추가용 PWA manifest
- 베타테스트 중 빠른 업데이트 확인을 위해 브라우저/오프라인 캐시는 비활성화

## 중요한 한계

이 프로젝트는 커뮤니티용 케어 보조 도구입니다. 질병 진단, 처방, 수액량 결정, 인슐린 조절, 치료식 선택은 반드시 담당 수의사 지시를 우선해야 합니다. 현재 저장 방식은 로컬 전용이므로 실제 서비스화 시에는 인증, DB, 권한, 개인정보 보호, 백업, 신고/관리자 기능을 별도로 구현해야 합니다.

## 참고한 공개 자료

- [Merck Veterinary Manual: Nutritional Requirements of Small Animals](https://www.merckvetmanual.com/management-and-nutrition/nutrition-small-animals/nutritional-requirements-of-small-animals): RER 계산식과 반려동물 영양 요구량
- [AAHA/AAFP Feline Life Stage Guidelines](https://www.aaha.org/resources/2021-aaha-aafp-feline-life-stage-guidelines/nutrition-and-weight-young-adult-cats/): BCS, 영양 평가, 성묘 에너지 요구량
- [AAHA Nutrition and Weight Management Guidelines](https://www.aaha.org/resources/2021-aaha-nutrition-and-weight-management-guidelines/home/): 영양 평가와 간식 열량 비율
- [IRIS CKD Guidelines](https://www.iris-kidney.com/guidelines/): 고양이 CKD 단계와 치료 목표 확인
- [Dietary phosphorus and renal disease in cats: where are we?](https://pmc.ncbi.nlm.nih.gov/articles/PMC11529143/): 신장질환 고양이의 인 관리 관련 리뷰
