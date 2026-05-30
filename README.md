# 신장질환을 이긴 고양이 케어

네이버 카페 회원들이 무료로 사용할 수 있는 고양이 환묘 케어 웹서비스 프로토타입입니다. 외부 의존성 없이 동작하는 정적 SPA이며, 회원가입/로그인과 케어 데이터는 현재 브라우저의 `localStorage`에 저장됩니다.

## 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열면 됩니다.

## Render 배포

이 프로토타입은 정적 SPA이므로 Render Static Site로 배포할 수 있습니다. 저장소를 GitHub에 올린 뒤 Render에서 Blueprint 또는 Static Site를 선택하면 됩니다.

- Build Command: `npm run build`
- Publish Directory: `dist`
- SPA Rewrite: `/*` -> `/index.html`

`render.yaml`에 위 설정을 포함해두었습니다.

## 포함 기능

- 회원가입, 로그인, 둘러보기 계정
- 고양이 프로필과 체중/나이/건강상태 기반 하루 칼로리 계산
- 수액 스케줄 생성, 오늘 일정, 완료 기록
- 건식/습식 영양 성분 검색, DM 기준 변환, 하루 급여량 계산
- 습식+건식 혼합 급여 계획표
- 간식 g수별 칼로리와 하루 비율 계산
- 체중 기록, 추세 차트
- 자료실과 회원 추가 자료
- 게시판, 댓글
- 홈 화면 추가용 PWA manifest와 오프라인 캐시

## 중요한 한계

이 프로젝트는 커뮤니티용 케어 보조 도구입니다. 질병 진단, 처방, 수액량 결정, 인슐린 조절, 치료식 선택은 반드시 담당 수의사 지시를 우선해야 합니다. 현재 저장 방식은 로컬 전용이므로 실제 서비스화 시에는 인증, DB, 권한, 개인정보 보호, 백업, 신고/관리자 기능을 별도로 구현해야 합니다.

## 참고한 공개 자료

- [Merck Veterinary Manual: Nutritional Requirements of Small Animals](https://www.merckvetmanual.com/management-and-nutrition/nutrition-small-animals/nutritional-requirements-of-small-animals): RER 계산식과 반려동물 영양 요구량
- [AAHA/AAFP Feline Life Stage Guidelines](https://www.aaha.org/resources/2021-aaha-aafp-feline-life-stage-guidelines/nutrition-and-weight-young-adult-cats/): BCS, 영양 평가, 성묘 에너지 요구량
- [AAHA Nutrition and Weight Management Guidelines](https://www.aaha.org/resources/2021-aaha-nutrition-and-weight-management-guidelines/home/): 영양 평가와 간식 열량 비율
- [IRIS CKD Guidelines](https://www.iris-kidney.com/guidelines/): 고양이 CKD 단계와 치료 목표 확인
- [Dietary phosphorus and renal disease in cats: where are we?](https://pmc.ncbi.nlm.nih.gov/articles/PMC11529143/): 신장질환 고양이의 인 관리 관련 리뷰
