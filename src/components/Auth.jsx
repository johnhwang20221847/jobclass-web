import React, { useState } from 'react';

export default function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('student'); // student, alumni
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null); // 졸업생 증빙용 파일 상태

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      alert(`${role === 'student' ? '학교 메일 인증 완료!' : '증빙 서류 제출 완료! 관리자 승인 후 가입됩니다.'}`);
      setIsSignUp(false);
    } else {
      // 임시 로그인 처리 (데모용)
      onLogin({ name: name || '홍길동', role: role, email: email });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignUp ? '계정 생성' : '로그인'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">이름</label>
                <input type="text" required value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2.5 border" />
              </div>
              <div className="flex space-x-4 p-1 bg-gray-100 rounded-lg">
                <button type="button" onClick={() => setRole('student')} className={`flex-1 py-2 text-sm font-medium rounded-md ${role === 'student' ? 'bg-white shadow' : 'text-gray-500'}`}>재학생</button>
                <button type="button" onClick={() => setRole('alumni')} className={`flex-1 py-2 text-sm font-medium rounded-md ${role === 'alumni' ? 'bg-white shadow' : 'text-gray-500'}`}>졸업생(현직자)</button>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isSignUp && role === 'student' ? '학교 이메일 (@univ.ac.kr)' : '이메일 계정'}
            </label>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2.5 border" />
          </div>

          {isSignUp && role === 'alumni' && (
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <label className="block text-sm font-medium text-indigo-900">현직자 인증 (명함 또는 재직증명서)</label>
              <input type="file" required onChange={(e) => setFile(e.target.files[0])} className="mt-2 text-xs text-gray-600 block w-full" />
              <p className="text-[11px] text-indigo-700 mt-1">※ 승인은 평균 10분 소요되며 승인 후 로그인이 가능합니다.</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2.5 border" />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700">
            {isSignUp ? '인증 및 가입하기' : '로그인'}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-500">
          <button type="button" className="hover:underline">계정 찾기</button>
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-semibold hover:underline">
            {isSignUp ? '기존 계정으로 로그인' : '새 계정 만들기'}
          </button>
        </div>
      </div>
    </div>
  );
}