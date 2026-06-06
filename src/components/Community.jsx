import React, { useState } from 'react';

export default function Community({ user }) {
  const [posts, setPosts] = useState([
    { id: 1, title: "하반기 공채 준비 다들 어떻게 하시나요? 너무 불안해요ㅠㅠ", content: "스펙은 어학 성적이랑 자격증 몇 개가 전부인데 자소서를 쓰려니 막막하네요. 선배님들 조언 부탁드립니다.", authorRole: "student", anonymousName: "익명 1", date: "10분 전", commentsCount: 4 },
    { id: 2, title: "불안해하는 후배님들을 위한 멘탈 관리 팁", content: "저도 대학생 때 매일 밤 잠 못 이룰 정도로 취업 불안감이 심했어요. 하지만 첫 단추를 완벽하게 꿰려 하지 말고, 작은 기업이라도 실무 경험을 먼저 쌓는 걸 추천합니다.", authorRole: "alumni", anonymousName: "익명 선배 1", date: "1시간 전", commentsCount: 12 },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      authorRole: user.role, // 현재 로그인한 유저의 역할 (student 또는 alumni)
      anonymousName: user.role === 'student' ? '익명(재학생)' : '익명(졸업생 선배)',
      date: "방금 전",
      commentsCount: 0
    };
    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-6">
      {/* 글쓰기 구역 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-bold text-gray-800 mb-3">고민 나누기 (익명)</h2>
        <form onSubmit={handleCreatePost} className="space-y-3">
          <input 
            type="text" 
            required
            placeholder="제목을 입력하세요" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea 
            required
            rows="3"
            placeholder="취업에 대한 고민이나 조언하고 싶은 내용을 자유롭게 적어주세요." 
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
          <div className="flex justify-end">
            <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700">
              등록하기
            </button>
          </div>
        </form>
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
            <div className="flex items-center space-x-2 mb-3">
              {/* 기획 반영: 재학생/졸업생 배지 구분 */}
              {post.authorRole === 'student' ? (
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">재학생 📝</span>
              ) : (
                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">졸업생 🎓</span>
              )}
              <span className="text-sm font-semibold text-gray-700">{post.anonymousName}</span>
              <span className="text-xs text-gray-400">• {post.date}</span>
            </div>
            <h3 className="text-md font-bold text-gray-900 mb-1.5">{post.title}</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            <div className="mt-4 pt-3 border-t flex items-center text-xs text-gray-500">
              <span>💬 댓글 {post.commentsCount}개</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}