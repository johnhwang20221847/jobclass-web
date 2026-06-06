import React from 'react';

export default function Landing({ onNext }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 flex flex-col justify-center items-center text-white px-4">
      <div className="text-center max-w-2xl">
        <span className="bg-indigo-500/30 text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full">대학생 X 현직자 멘토링 커뮤니티</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-6 tracking-tight leading-tight">
          답답한 취업 고민,<br/>
          <span className="text-indigo-400">앞서간 선배들</span>에게 직접 묻다.
        </h1>
        <p className="mt-6 text-lg text-slate-300 leading-relaxed">
          유니브브릿지는 막막한 취업을 준비하는 재학생과, 실무에서 활약 중인 졸업생을 1:1로 안전하게 연결하는 커뮤니티 플랫폼입니다.
        </p>
        
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="font-bold text-indigo-300">익명 커뮤니티</h3>
            <p className="text-sm text-slate-400 mt-2">재학생과 졸업생이 함께 나누는 현실적인 취업 고민</p>
          </div>
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="font-bold text-indigo-300">커리어 스토리</h3>
            <p className="text-sm text-slate-400 mt-2">현직자 선배들의 솔직한 실패담과 성공 노하우</p>
          </div>
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="font-bold text-indigo-300">1:1 비밀 매칭</h3>
            <p className="text-sm text-slate-400 mt-2">원하는 선배에게 목적을 담아 신청하는 프라이빗 대화</p>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="mt-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          서비스 안내를 확인했습니다 ➔
        </button>
      </div>
    </div>
  );
}