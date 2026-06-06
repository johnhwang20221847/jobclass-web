import React, { useState } from 'react';

export default function Career({ user }) {
  const [stories, setStories] = useState([
    { id: 1, author: "이현우 선배", company: "카카오", job: "서비스 기획자", title: "최종 면접에서만 5번 떨어진 이야기 (멘탈 회복 꿀팁)", content: "처음엔 세상이 무너지는 것 같았지만, 면접 피드백을 철저히 복기하면서 제 부족함을 채웠습니다. 결국 6번째에 가고 싶던 카카오에 합격했죠. 여러분도 절대 꺾이지 마세요.", likes: 42 },
    { id: 2, author: "최민지 선배", company: "토스", job: "UI/UX 디자이너", title: "비전공자 디자인 독학 1년 만에 핀테크 대기업 이직 성공기", content: "포트폴리오 구성할 때 실무 중심의 문제 해결 프로세스를 녹여낸 것이 핵심이었습니다. 질문이 있으시다면 언제든 1:1 매칭으로 물어보세요!", likes: 15 },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // 공감(좋아요) 누르기 로직
  const handleLike = (id) => {
    setStories(stories.map(story => story.id === id ? { ...story, likes: story.likes + 1 } : story));
  };

  const handleCreateStory = (e) => {
    e.preventDefault();
    if (user.role !== 'alumni') {
      alert("커리어 스토리는 졸업생(현직자) 선배님들만 작성할 수 있습니다.");
      return;
    }
    const newStory = {
      id: Date.now(),
      author: `${user.name} 선배`,
      company: "인증된 기업", 
      job: "현직 프로필",
      title: newTitle,
      content: newContent,
      likes: 0
    };
    setStories([newStory, ...stories]);
    setNewTitle('');
    setNewContent('');
  };

  // 기획 반영: 공감 수가 많은 순서대로 상단 인기 게시물 추출 (예: 좋아요 20개 이상)
  const popularStories = stories.filter(s => s.likes >= 20);

  return (
    <div className="space-y-8">
      {/* 실시간 인기 게시물 섹션 */}
      {popularStories.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-amber-600 mb-3">🔥 이번 주 공감을 많이 받은 인기 스토리</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularStories.map(story => (
              <div key={`pop-${story.id}`} className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200 shadow-sm">
                <span className="text-[11px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded">POPULAR</span>
                <h3 className="font-bold text-gray-900 mt-2 line-clamp-1">{story.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{story.author} ({story.company} · {story.job})</p>
                <div className="mt-3 flex justify-between items-center text-xs">
                  <span className="text-amber-700 font-bold">❤️ 공감 {story.likes}개</span>
                  <span className="text-indigo-600 font-semibold">⚡️ 1:1 매칭 추천 글</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 졸업생 전용 글쓰기 구역 */}
      {user.role === 'alumni' && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-indigo-100">
          <h2 className="text-lg font-bold text-indigo-900 mb-1">나의 커리어 스토리 들려주기 🎓</h2>
          <p className="text-xs text-gray-500 mb-3">선배님의 실패담이나 성공담은 후배들에게 가장 큰 위로와 자산이 됩니다.</p>
          <form onSubmit={handleCreateStory} className="space-y-3">
            <input 
              type="text" required placeholder="제목 (예: 첫 이직 대실패 후 깨달은 자소서 작성법)" value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <textarea 
              required rows="4" placeholder="내용을 입력하세요. 하단에 1:1 매칭 유도 멘트를 남겨주시면 매칭 확률이 높아집니다." value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>
            <div className="flex justify-end">
              <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700">스토리 발행</button>
            </div>
          </form>
        </div>
      )}

      {/* 전체 스토리 목록 */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">선배들의 전체 스토리 리스트</h2>
        {stories.map(story => (
          <div key={story.id} className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-snug">{story.title}</h3>
                <p className="text-xs text-gray-500 mt-1">작성자: <span className="font-semibold text-gray-700">{story.author}</span> ({story.company} · {story.job})</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed mb-4">{story.content}</p>
            <div className="flex justify-between items-center pt-3 border-t">
              <button 
                onClick={() => handleLike(story.id)}
                className="flex items-center space-x-1.5 text-xs bg-gray-100 hover:bg-pink-50 hover:text-pink-600 text-gray-600 font-semibold px-3 py-1.5 rounded-lg transition"
              >
                <span>❤️ 공감하기</span>
                <span className="bg-white text-gray-800 text-[11px] px-1.5 py-0.2 rounded border font-bold">{story.likes}</span>
              </button>
              {user.role === 'student' && (
                <p className="text-xs text-indigo-600 font-medium animate-pulse">💡 이 선배의 스토리가 맘에 든다면? '1:1 매칭' 탭으로 이동해보세요!</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}