import React, { useState } from 'react';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Community from './components/Community';
import Career from './components/Career';
import Matching from './components/Matching';
import MyHome from './components/MyHome';

export default function App() {
  const [step, setStep] = useState('landing'); // landing, auth, main
  const [currentTab, setCurrentTab] = useState('community'); // community, career, matching, myhome
  const [user, setUser] = useState(null); // 로그인 유저 정보 (role: 'student' 또는 'alumni')

  // 1. 서비스 소개 진입 화면
  if (step === 'landing') {
    return <Landing onNext={() => setStep('auth')} />;
  }

  // 2. 로그인 / 회원가입 화면
  if (step === 'auth') {
    return <Auth onLogin={(loggedInUser) => {
      setUser(loggedInUser);
      setStep('main');
    }} />;
  }

  // 3. 메인 서비스 화면 (로그인 완료 후)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 글로벌 네비게이션 바 */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Univ-Bridge</h1>
        <nav className="flex space-x-6">
          <button onClick={() => setCurrentTab('community')} className={`font-medium ${currentTab === 'community' ? 'text-indigo-600' : 'text-gray-500'}`}>커뮤니티</button>
          <button onClick={() => setCurrentTab('career')} className={`font-medium ${currentTab === 'career' ? 'text-indigo-600' : 'text-gray-500'}`}>커리어</button>
          <button onClick={() => setCurrentTab('matching')} className={`font-medium ${currentTab === 'matching' ? 'text-indigo-600' : 'text-gray-500'}`}>1:1 매칭</button>
          <button onClick={() => setCurrentTab('myhome')} className={`font-medium ${currentTab === 'myhome' ? 'text-indigo-600' : 'text-gray-500'}`}>마이홈</button>
        </nav>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">{user.name}</span>({user.role === 'student' ? '재학생' : '졸업생'})
        </div>
      </header>

      {/* 탭별 콘텐츠 렌더링 */}
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {currentTab === 'community' && <Community user={user} />}
        {currentTab === 'career' && <Career user={user} />}
        {currentTab === 'matching' && <Matching user={user} />}
        {currentTab === 'myhome' && <MyHome user={user} />}
      </main>
    </div>
  );
}