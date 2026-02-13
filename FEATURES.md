# Todo App 기능 정리

**GitHub**: https://github.com/yslim-github/todo-app
**배포 URL**: https://proj29-kohl.vercel.app

## 기술 스택
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- React useState (클라이언트 사이드 상태 관리)

## 구현 기능

| 기능 | 설명 |
|------|------|
| **투두 추가** | 텍스트 입력 후 Enter 키 또는 "추가" 버튼 |
| **완료/미완료 토글** | 체크박스 클릭으로 완료 상태 전환 (취소선 표시) |
| **투두 삭제** | 개별 항목 "삭제" 버튼 |
| **전체 삭제** | 모든 항목 일괄 삭제 |
| **인라인 수정** | 텍스트 더블클릭으로 수정, Enter 저장, Escape 취소 |
| **드래그 정렬** | 마우스 드래그로 순서 변경 (시각적 피드백) |
| **터치 드래그** | 모바일 터치로 순서 변경 |
| **필터** | 전체 / 미완료 / 완료 탭 필터링 |
| **다크모드** | 토글 버튼으로 전환, 시스템 설정 감지 |
| **데이터 영속성** | localStorage에 저장, 새로고침해도 유지 |
| **완료 카운터** | "완료 N / 전체 N" 표시 |

## 커밋 히스토리
1. `35c1adc` - feat: Next.js 투두 앱 초기 구현
2. `ba0eb06` - fix: remove Windows-only native binaries
3. `e03ac3b` - feat: add dark mode toggle button
4. `3f20d8b` - feat: display todo completion count
5. `4134fa0` - feat: persist todos in localStorage
6. `e4ffca2` - feat: add clear all button
7. `53347c6` - feat: add inline todo editing
8. `8574f16` - feat: add drag-and-drop todo reordering
9. `ffb7cc2` - feat: add touch support for drag-and-drop
10. `13d7c3b` - feat: add filter tabs (all/active/completed)
