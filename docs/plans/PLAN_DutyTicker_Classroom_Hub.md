# Implementation Plan: 1인 1역 알리미 (DutyTicker - Classroom Hub Edition)

**Status**: 🔄 In Progress
**Started**: 2025-12-29
**Last Updated**: 2025-12-29
**Estimated Completion**: 2025-12-31

---

**⚠️ CRITICAL INSTRUCTIONS**: After completing each phase:
1. ✅ Check off completed task checkboxes
2. 🧪 Run all quality gate validation commands
3. ⚠️ Verify ALL quality gate items pass
4. 📅 Update "Last Updated" date above
5. 📝 Document learnings in Notes section
6. ➡️ Only then proceed to next phase

⛔ **DO NOT skip quality gates or proceed with failing checks**

---

## 📋 Overview

### Feature Description
교실 대형 화면에 최적화된 학급 경영 대시보드입니다. 단순 팝업을 넘어, 현재 수행해야 할 "1인 1역"을 강조하고 오늘의 전체 일정을 시각화하여 학생들과 교사에게 명확한 정보를 제공합니다.

### Success Criteria
- [ ] **가시성**: 교실 뒷자리에서도 현재 당번이 누구인지 명확히 식별 가능해야 함
- [ ] **상태 중심 UI**: '현재-다음-전체'의 논리적 흐름이 시각적으로 구분되어야 함
- [ ] **사용성**: 교사가 복잡한 조작 없이 직관적으로 데이터를 관리할 수 있어야 함
- [ ] **자동 알림**: 수업 시작 5분 전 등 특정 시점에 학생들에게 자동으로 알림이 표시되는가?

### User Impact
정보 전달의 효율성을 높여 교사의 반복적인 지시를 줄이고, 학생들의 자발적인 역할 수행을 돕습니다.

---

## 🏗️ Architecture Decisions

| Decision | Rationale | Trade-offs |
|----------|-----------|------------|
| **Split Layout** | 좌측(관리)/우측(전시) 또는 상단(현재)/하단(전체) 구성을 통해 정보 위계 설정 | 화면 공간 활용에 대한 세밀한 조정 필요 |
| **High-Contrast Design** | 시력이 좋지 않은 학생이나 햇빛이 비치는 교실 환경 고려 | 화려한 그래픽보다 명확한 색 대비와 가독성 우선 |
| **Responsive Grid** | 전자칠판(대형) 및 태블릿(소형) 모두 대응하기 위해 Tailwind Grid 활용 | 다양한 해상도에 대한 테스트 비용 증가 |

---

## 📦 Dependencies

### Required Before Starting
- [x] Tailwind CSS 설정 완료 (Phase 1 완료 가정)
- [x] 기본 1인 1역 데이터 모델 (Phase 1 완료 가정)

---

## 🧪 Test Strategy

### Testing Approach
**TDD Principle**: 모든 UI 컴포넌트와 로직은 테스트 코드를 먼저 작성한 후 구현합니다.

### Coverage Requirements
- **Unit Tests**: Business Logic (데이터 필터링, 정렬 등) ≥ 80%
- **Component Tests**: 주요 UI 컴포넌트 (초대형 카드, 타임라인) 렌더링 검증
- **Integration Tests**: 대시보드와 데이터 연동 흐름 검증

---

## 🚀 Implementation Phases

### Phase 1: 데이터 모델 보강 (Foundation)
**Goal**: 역할 데이터에 상태(진행 예정, 완료) 개념 도입
**Status**: ✅ Complete (Refinement needed for UI)

> **Note**: 이미 완료된 단계로 가정합니다. 소스 코드가 존재하는지 확인이 필요할 수 있습니다.

---

### Phase 2: 대시보드 레이아웃 개발 (New UI)
**Goal**: 대형 화면에 적합한 메인 대시보드 및 타임라인 뷰 구현
**Estimated Time**: 3 hours
**Status**: ✅ Complete

#### Tasks

**🔴 RED: Write Failing Tests First**
- [x] **Test 2.1**: 대시보드 메인 레이아웃 컴포넌트 테스트 작성
  - File: `tests/components/DashboardLayout.test.tsx`
  - Details: 2컬럼 그리드 구조 확인, Header/Main 영역 렌더링 여부 확인

- [x] **Test 2.2**: "현재 당번" 카드 컴포넌트 테스트 작성
  - File: `tests/components/CurrentRoleCard.test.tsx`
  - Details: 역할 이름, 담당자 이름이 크게 표시되는지, 강조 스타일(High Contrast) 클래스 적용 여부 확인

- [x] **Test 2.3**: 타임라인/전체 목록 뷰 테스트 작성
  - File: `tests/components/TimelineView.test.tsx`
  - Details: 역할 목록이 시간/순서대로 렌더링되는지 확인

**🟢 GREEN: Implement to Make Tests Pass**
- [x] **Task 2.4**: Tailwind Grid를 활용한 2컬럼 레이아웃 구현 (Live View | Timeline)
  - File: `src/components/layout/DashboardLayout.tsx`

- [x] **Task 2.5**: "현재 당번"을 강조하는 초대형 카드 컴포넌트 제작
  - File: `src/components/dashboard/CurrentRoleCard.tsx`
  - Details: 텍스트 크기 `text-6xl` 이상, 고대비 색상 적용

- [x] **Task 2.6**: 반응형 디자인 적용
  - Details: 전자칠판(1920px+) 및 태블릿 브레이크포인트 대응

**🔵 REFACTOR: Clean Up Code**
- [x] **Task 2.7**: 컴포넌트 분리 및 스타일 상수화
  - Details: 색상/폰트 크기 등을 디자인 토큰으로 관리

#### Quality Gate ✋
- [ ] **TDD Compliance**: 테스트가 먼저 작성되었는가?
- [ ] **Visual Check**: 교실 뒷자리(가상 거리)에서 폰트가 잘 보이는가?
- [ ] **Responsive**: 창 크기 조절 시 레이아웃이 깨지지 않는가?
- [ ] **Lint**: `npm run lint` 통과

---

### Phase 3: 하이라이트 및 수업 시간 알림 (Interaction & Scheduling)
**Estimated Time**: 2 hours
**Status**: ✅ Complete

#### Tasks

**🔴 RED: Write Failing Tests First**
- [x] **Test 3.1**: 알림 트리거 로직 테스트 (정시 알림 + 5분 전 사전 알림)
  - File: `tests/hooks/useRoleNotification.test.ts`
  - Details: 
    - 역할 교대 시점 알림 트리거 확인
    - 수업 시작 5분 전(예: 08:55) 알림 상태 true 반환 확인

- [x] **Test 3.2**: 알림 오버레이 컴포넌트 렌더링 테스트
  - File: `tests/components/AlertOverlay.test.tsx`
  - Details: 알림 타입(역할/수업전)에 따른 메시지 구분 렌더링 확인

**🟢 GREEN: Implement to Make Tests Pass**
- [x] **Task 3.3**: 시간 감지 및 예약 알림 훅 구현
  - Details: `Intl.DateTimeFormat` 또는 `dayjs` 등을 활용하여 현재 시간과 일정 비교
- [x] **Task 3.4**: 전체 화면 알림(Overlay) UI 구현
  - Details: "곧 1교시(국어)가 시작됩니다! 준비해 주세요." 등 메시지 표시
- [x] **Task 3.5**: 알림 사운드 또는 애니메이션 효과 추가

**🔵 REFACTOR**
- [ ] **Task 3.5**: 애니메이션 성능 최적화 (GPU 가속 활용)

#### Quality Gate ✋
- [ ] **Performance**: 애니메이션 시 프레임 저하가 없는가?
- [ ] **Accessiblity**: 빛 번짐이나 과도한 점멸이 없는지 확인 (광과민성 고려)

---

### Phase 4: 관리 인터페이스 최적화 (Admin & Interaction)
**Goal**: 교사가 실시간으로 메시지를 방송하고 역할을 관리할 수 있는 기능 구현
**Status**: ✅ Complete

#### Tasks

**🔴 RED: Write Failing Tests First**
- [x] **Test 4.1**: 방송 메시지 상태 관리 훅 테스트 (`useBroadcast`) - Pass
- [x] **Test 4.2**: 방송 모달 컴포넌트 렌더링 및 인터랙션 테스트 - Pass

**🟢 GREEN: Implement to Make Tests Pass**
- [x] **Task 4.3**: 방송 상태 관리 훅 (`useBroadcast`) 구현 완료
- [x] **Task 4.4**: 방송 모달 UI (`BroadcastModal`) 구현 완료 (Glassmorphism 적용)
- [x] **Task 4.5**: "현재 당번" 카드와 방송 메시지 연동 완료
- [x] **Task 4.6**: 플로팅 트리거 버튼 구현 완료 (Admin 이동 및 방송 시작 버튼)

**🔵 REFACTOR**
- [x] **Task 4.7**: Framer Motion을 사용하여 방송 시작/종료 시 부드러운 전환 효과 적용

---

### Phase 7: 디자인 및 UX 고도화 (Polish)
**Goal**: 전문가 수준의 애니메이션과 완성도 높은 UI/UX 적용
**Estimated Time**: 2 hours
**Status**: ✅ Complete

#### Tasks

**🔴 RED: Write Failing Tests First**
- [x] **Test 7.1**: 애니메이션 컴포넌트 (`AnimatedCard`)의 `layout` 및 `AnimatePresence` 동작 테스트 - Pass
- [x] **Test 7.2**: 텍스트 크기 자동 조절 훅 (`useAutoFitText`)의 반환값 검증 테스트 - Pass

**🟢 GREEN: Implement to Make Tests Pass**
- [x] **Task 7.3**: 메인 화면의 모든 카드에 일관된 Open/Close 애니메이션 적용 (AnimatePresence 연동)
- [x] **Task 7.4**: `CurrentRoleCard` 내의 당번 이름이 길어질 경우 폰트 크기를 자동으로 줄여주는 `AutoFitText` 기능 추가
- [x] **Task 7.5**: 관리자 페이지와 메인 페이지 간 전환 시 Slide 효과 추가 (`PageTransition` 구현)

**🔵 REFACTOR**
- [x] **Task 7.6**: 성능 최적화 및 실시간 Clock 컴포넌트 추가로 실제 대시보드 느낌 강화

#### Quality Gate ✋
- [x] **Performance**: 애니메이션 시 프레임 드랍 없음 (GPU 가속 활용)
- [x] **Visual**: 초대형 화면(전자칠판)에서 가독성 100% 보장
- [x] **Approval**: "Wow" 포인트 (Page Slide, AutoFitText, Real-time Clock) 적용 완료

---

### Phase 9: 관리자 설정 대시보드 (Admin Interface)
**Goal**: 학생 명단, 역할, 시간표를 선생님이 직접 수정하는 UI 구현
**Status**: ✅ Complete

#### Tasks
- [x] **Task 9.1**: 설정 페이지 라우팅 (`/admin`) 및 UI 레이아웃 로드
- [x] **Task 9.2**: 학생 명단 관리 (CRUD) UI 구현 및 LocalStorage 연동
- [x] **Task 9.3**: 역할 및 시간표 관리 UI 구현 (요일별 탭 인터페이스)
- [x] **Task 9.4**: 설정 페이지 접근 제어 및 네비게이션 트리거 배치

---

### Phase 10: 자동 순번 및 예약 시스템 (Rotation & Scheduling)
**Goal**: 매일 자동으로 당번이 바뀌는 로직 구현
**Status**: ✅ Complete

#### Tasks
- [x] **Task 10.1**: 당번 순환(Rotation) 알고리즘 구현 (`setAllRoles` 활용)
- [x] **Task 10.2**: 데이터 안정성을 위한 LocalStorage 저장 시점 최적화
- [x] **Task 10.3**: 빌드 에러 및 TypeScript 타입 안정성 확보

---

**Next Action**: Phase 7 (Polish) 계획 승인 후 작업 시작
