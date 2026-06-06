import React, { useState } from 'react';

export default function MyHome({ user }) {
  // 사용자가 채워나가는 프로필 정보 상태 관리
  const [profile, setProfile] = useState({
    univ: user.role === 'student' ? '한국대학교' : '서울대학교',
    major: '컴퓨터공학과',
    company: user.role === 'alumni' ? '네이버' : '',
    job: user.role === 'alumni' ? '프론트엔드 개발자' : '',
    status: user.role === 'alumni' ? '재직 중' : '3학년 재학',
    bio: '안녕하세요! 반갑습니다. 서로 좋은 영향력을 나눴으면 좋겠습니다.'
  });

  const [isEditing, setIsEditing] = useState(false);

  // 프로필 완성도 계산 로직 (기획의 '정보가 많을수록 신뢰성 증가' 반영)
  const calculateCompleteness = () => {
    let filledFields = 0;
    const fields = Object.values(profile);
    fields.forEach(f => { if (f && f.trim() !== '') filledFields++; });
    return Math.round((filledFields / fields.length) * 100);
  };

  const completeness = calculateCompleteness();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border p-6 md:p-8">
      {/* 상단 프로필 헤더 */}
      <div className="flex items-center space-x-4 border-b pb-6 mb-6">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 font-bold text-xl rounded-full flex items-center justify-center">
          {user.name[0]}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${user.role === 'student' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {user.role === 'student' ? '재학생 멤버' : '졸업생 멘토'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>

      {/* 기획 반영: 프로필 완성도 (신뢰도 바) */}
      <div className="bg-slate-50 p-4 rounded-2xl border mb-6">
        <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
          <span className="text-gray-700">내 프로필 신뢰도 지표</span>
          <span className="text-indigo-600">{completeness}% 완성</span>
        </div>
        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
          <div className="bg-indigo-600 h-full transition-all duration-500" style={{ width: `${completeness}%` }}></div>
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5">※ 프로필 정보를 상세히 적을수록 상대방에게 노출되는 신뢰도가 올라갑니다.</p>
      </div>

      {/* 상세 정보 폼 / 뷰 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800">프로필 상세 정보</h3>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100"
          >
            {isEditing ? "저장하기" : "수정하기"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">학교 정보</label>
            <input 
              type="text" disabled={!isEditing} value={profile.univ}
              onChange={(e) => setProfile({...profile, univ: e.target.value})}
              className="w-full p-2.5 text-sm bg-gray-50 disabled:bg-gray-50/50 border rounded-xl outline-none focus:border-indigo-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">학과/전공</label>
            <input 
              type="text" disabled={!isEditing} value={profile.major}
              onChange={(e) => setProfile({...profile, major: e.target.value})}
              className="w-full p-2.5 text-sm bg-gray-50 disabled:bg-gray-50/50 border rounded-xl outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {user.role === 'alumni' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">직장/회사명</label>
                <input 
                  type="text" disabled={!isEditing} value={profile.company}
                  onChange={(e) => setProfile({...profile, company: e.target.value})}
                  className="w-full p-2.5 text-sm bg-gray-50 disabled:bg-gray-50/50 border rounded-xl outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">담당 직무</label>
                <input 
                  type="text" disabled={!isEditing} value={profile.job}
                  onChange={(e) => setProfile({...profile, job: e.target.value})}
                  className="w-full p-2.5 text-sm bg-gray-50 disabled:bg-gray-50/50 border rounded-xl outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </>
          )}

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1">현재 상태 (경력/이력/직위 등)</label>
            <input 
              type="text" disabled={!isEditing} value={profile.status}
              onChange={(e) => setProfile({...profile, status: e.target.value})}
              placeholder="예: 무직, 피엔지 주임, 취업 준비 중"
              className="w-full p-2.5 text-sm bg-gray-50 disabled:bg-gray-50/50 border rounded-xl outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1">자기소개 및 각오</label>
            <textarea 
              rows="3" disabled={!isEditing} value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full p-2.5 text-sm bg-gray-50 disabled:bg-gray-50/50 border rounded-xl outline-none focus:border-indigo-500 font-medium resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}