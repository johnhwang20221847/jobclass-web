import React, { useState } from 'react';

// 가상의 현직자 데이터 리스트
const dummyMentors = [
  { id: 1, name: '김선배', company: '네이버', job: '프론트엔드 개발자', univ: '한국대학교' },
  { id: 2, name: '이선배', company: '삼성전자', job: '반도체 공정설계', univ: '서울대학교' },
];

export default function Matching({ user }) {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [applyReason, setApplyReason] = useState('');
  const [requests, setRequests] = useState([
    { id: 101, studentName: '박재학', reason: '비전공자 개발자 취업 팁이 궁금합니다.', status: 'PENDING' }
  ]);
  const [activeChat, setActiveChat] = useState(false);

  // 재학생: 1:1 매칭 신청서 제출
  const handleApply = (e) => {
    e.preventDefault();
    alert(`${selectedMentor.name} 선배님께 매칭 신청이 전송되었습니다. 수락 시 대화방이 열립니다.`);
    setSelectedMentor(null);
    setApplyReason('');
  };

  // 졸업생: 신청 수락
  const handleAccept = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'ACCEPTED' } : r));
    setActiveChat(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 왼쪽 레이아웃: 유저 성격에 따른 분기 */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
        {user.role === 'student' ? (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">멘토 선택하여 1:1 대화 신청하기</h2>
            <div className="space-y-4">
              {dummyMentors.map(mentor => (
                <div key={mentor.id} className="p-4 border rounded-xl flex justify-between items-center hover:border-indigo-500 transition">
                  <div>
                    <h3 className="font-bold text-gray-900">{mentor.name} <span className="text-sm font-normal text-gray-500">| {mentor.univ} 졸</span></h3>
                    <p className="text-sm text-indigo-600 font-medium mt-1">{mentor.company} · {mentor.job}</p>
                  </div>
                  <button onClick={() => setSelectedMentor(mentor)} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100">신청</button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">나에게 들어온 1:1 매칭 신청 리스트</h2>
            {requests.map(req => (
              <div key={req.id} className="p-4 border rounded-xl bg-slate-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-800">{req.studentName} 후배님</span>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${req.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{req.status}</span>
                </div>
                <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border">{req.reason}</p>
                {req.status === 'PENDING' && (
                  <div className="mt-3 flex space-x-2 justify-end">
                    <button className="text-sm text-gray-500 px-3 py-1.5 hover:bg-gray-200 rounded-lg">거절</button>
                    <button onClick={() => handleAccept(req.id)} className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg font-bold hover:bg-indigo-700">수락 및 채팅열기</button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* 팝업 모달: 재학생이 신청서 적는 양식 */}
        {selectedMentor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <form onSubmit={handleApply} className="bg-white p-6 rounded-2xl max-w-md w-full">
              <h3 className="text-lg font-bold text-gray-900">{selectedMentor.name} 선배님께 1:1 대화 신청</h3>
              <p className="text-xs text-gray-500 mt-1">상세히 적을수록 선배의 매칭 수락 확률이 올라갑니다.</p>
              <textarea 
                required 
                rows="5"
                value={applyReason}
                onChange={(e) => setApplyReason(e.target.value)}
                placeholder="대화를 신청하는 이유와 궁금한 질문들을 자세히 적어주세요."
                className="w-full border rounded-xl mt-3 p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
              <div className="flex space-x-2 mt-4 justify-end">
                <button type="button" onClick={() => setSelectedMentor(null)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">취소</button>
                <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">신청서 발송</button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* 오른쪽 레이아웃: 매칭 완료 시 활성화되는 채팅방 예시 */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col h-[400px]">
        <h2 className="text-md font-bold text-gray-800 border-b pb-3">실시간 매칭 채팅방</h2>
        {activeChat ? (
          <div className="flex-1 flex flex-col justify-between mt-2">
            <div className="flex-1 overflow-y-auto space-y-2 text-sm">
              <div className="bg-indigo-50 p-2.5 rounded-xl rounded-tl-none max-w-[85%]">안녕하세요! 신청해주셔서 감사해요. 어떤 부분이 가장 궁금하신가요?</div>
            </div>
            <div className="flex mt-2 border-t pt-2">
              <input type="text" placeholder="메시지를 입력하세요." className="flex-1 text-sm outline-none p-1" />
              <button className="text-indigo-600 font-bold text-sm px-2">전송</button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 text-sm">
            <p>매칭이 완료된 대화방이 없습니다.<br/>신청을 보내거나 수락을 기다려보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}