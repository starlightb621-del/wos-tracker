import React, { useState, useEffect } from 'react';
import { Users, RefreshCcw, ShieldCheck } from 'lucide-react';
import { initializeApp } from 'firebase/app';

// 1. Firebase 설정 (보내주신 스크린샷 정보를 적용했습니다)
const firebaseConfig = {
  apiKey: "AIzaSyD_DClGhfkG-kQHrt dGXN1Czf2PuZuRFkY",
  authDomain: "wos-tracker-e1b3c.firebaseapp.com",
  projectId: "wos-tracker-e1b3c",
  storageBucket: "wos-tracker-e1b3c.firebasestorage.app",
  messagingSenderId: "250608724158",
  appId: "1:250608724158:web:1d89a541149e90d5fc16ef",
  measurementId: "G-TMCD693X1M"
};

// Firebase 초기화
initializeApp(firebaseConfig);

const App = () => {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. 구글 시트 웹 앱 URL (GAS 배포 후 받은 URL을 여기에 꼭 넣어주세요!)
  const GAS_URL = "여기에_구글_시트_웹앱_URL을_입력하세요";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GAS_URL);
      const data = await response.json();
      setMemberList(data);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 font-sans">
      <div className="max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-black text-blue-400 tracking-tight">WOS TRACKER</h1>
              <p className="text-slate-400 text-sm">요새쟁탈 참여 명단</p>
            </div>
            <button 
              onClick={fetchData} 
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all active:scale-95"
            >
              <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="animate-bounce mb-4"><Users size={40} /></div>
              <p>연맹원 데이터를 불러오는 중...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {memberList.map((member, index) => (
                <div key={index} className="group flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/60 rounded-xl border border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-slate-100">{member.이름}</span>
                      <span className="text-xs text-slate-500 uppercase font-semibold">{member.분류}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs font-black shadow-lg shadow-blue-500/20">
                      {member.등급}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
