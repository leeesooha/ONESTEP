IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'자립수당 지원사업')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'자립수당 지원사업', N'금융', N'전국', '2026-12-31', N'보호종료 후 5년 이내 자립준비청년에게 월 40만 원 자립수당을 현금으로 지급합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'보호종료아동 자립정착금')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'보호종료아동 자립정착금', N'금융', N'전국', '2026-12-31', N'아동복지시설 퇴소 시 자립 초기 비용 마련을 위해 1인당 최대 500만 원을 일시 지급합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'청년도약계좌 우선 가입 지원')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'청년도약계좌 우선 가입 지원', N'금융', N'전국', '2026-09-30', N'자립준비청년을 대상으로 청년도약계좌 우선 가입 기회를 제공하고 정부 기여금을 추가 지원합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'LH 전세임대주택 지원')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'LH 전세임대주택 지원', N'주거', N'전국', '2026-08-31', N'LH가 기존 주택을 전세 계약 후 자립준비청년에게 시세 대비 저렴한 임대료로 재임대합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'청년 매입임대주택 우선 공급')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'청년 매입임대주택 우선 공급', N'주거', N'전국', '2026-09-30', N'자립준비청년을 위한 시세 30% 수준의 공공 매입임대주택을 우선 공급합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'청년 월세 한시 특별지원')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'청년 월세 한시 특별지원', N'주거', N'전국', '2026-10-31', N'무주택 저소득 청년에게 월 최대 20만 원의 월세를 최대 12개월간 한시 지원합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'서울시 자립준비청년 주거안정 지원')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'서울시 자립준비청년 주거안정 지원', N'주거', N'서울', '2026-11-30', N'서울 거주 자립준비청년에게 보증금 및 월세 일부를 추가 지원하는 서울시 자체 주거 사업입니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'국민취업지원제도 1유형')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'국민취업지원제도 1유형', N'취업', N'전국', '2026-12-31', N'취업 취약계층 청년에게 구직촉진수당(월 50만 원 × 6개월)과 취업 활동 계획 수립을 지원합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'자립준비청년 드림스타트 직업훈련')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'자립준비청년 드림스타트 직업훈련', N'취업', N'경기', '2026-09-30', N'직업 훈련, 이력서·면접 컨설팅, 취업 연계까지 원스톱으로 지원하는 직업훈련 프로그램입니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'보호종료아동 의료급여 특례')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'보호종료아동 의료급여 특례', N'의료', N'전국', '2026-12-31', N'만 24세 이하 보호종료아동의 입원·통원 의료비를 의료급여 특례로 전액 지원합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'자립준비청년 건강검진 지원')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'자립준비청년 건강검진 지원', N'의료', N'서울', '2026-11-30', N'서울 거주 자립준비청년에게 종합 건강검진(기본 항목 + 정신건강 선별검사)을 무료로 지원합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'자립준비청년 학자금 대출 특례')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'자립준비청년 학자금 대출 특례', N'교육', N'전국', '2026-08-15', N'재학 중인 자립준비청년의 등록금 전액을 무이자 학자금 대출로 지원합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'아동복지 자립 장학금(희망리본)')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'아동복지 자립 장학금(희망리본)', N'교육', N'전국', '2026-07-31', N'대학 재학 중인 자립준비청년에게 학기당 최대 150만 원의 생활비 장학금을 지원합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'청년 마음건강 바우처')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'청년 마음건강 바우처', N'심리정서', N'전국', '2026-12-31', N'심리적 어려움을 겪는 자립준비청년에게 심리상담 서비스 이용권(연 24회, 회당 5만 원)을 지원합니다.')
GO
IF NOT EXISTS (SELECT 1 FROM support WHERE title = N'법률홈닥터 무료 법률 상담')
    INSERT INTO support (title, category, region, deadline, description) VALUES (N'법률홈닥터 무료 법률 상담', N'법률', N'전국', '2026-12-31', N'자립준비청년의 전세 계약, 임금체불, 소비자 분쟁 등 생활 법률 문제를 변호사가 무료로 상담합니다.')
GO
