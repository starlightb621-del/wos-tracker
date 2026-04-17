import React, { useState, useEffect } from 'react';
import { Users, RefreshCcw, ShieldCheck } from 'lucide-react';
import { initializeApp } from 'firebase/app';

// 1. Firebase 설정 (공백 없이 정확히 입력됨)
const firebaseConfig = {
  apiKey: "AIzaSyD_DClGhfkG-kQHrt-dGXN1Czf2PuZuRFkY",
  authDomain: "wos-tracker-e1b3c.firebaseapp.com",
  projectId: "wos-tracker-e1b3c",
  storageBucket: "wos-tracker-e1b3c.firebasestorage.app",
  messagingSenderId: "250608724158",
  appId: "1:250608724158:web:1d89a541149e90d5fc16ef",
  measurementId: "G-TMCD693X1M"
};

// Firebase 초기화 (하얀 화면 에러 방지)
initializeApp(firebaseConfig);

const App = () => {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. 구글 시트 데이터 연결 주소
  const GAS_URL = "https://script.google.com/macros/s/AKfycbw5TWahcLUkpgBdwJfn5lurYnigQVNZN-iD6GvFAL30Vup7Bf4SdU_1nLBwHIVa3B1x/exec";

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
    <div className="min-h-screen bg-slate-900 text-white p-4 font-sans flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-black text-blue-400 tracking-tighter text-shadow-sm">WOS TRACKER</h1>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Fortress Siege Status</p>
            </div>
            <button 
              onClick={fetchData} 
              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-2xl transition-all active:scale-90 shadow-inner"
            >
              <RefreshCcw size={20} className={loading ? "animate-spin text-blue-400" : "text-slate-300"} />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">명단을 불러오는 중...</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {memberList.length > 0 ? (
                memberList.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/40 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                        <ShieldCheck className="text-blue-400" size={22} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-100 text-lg">{member.이름 || "이름 없음"}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{member.분류 || "미분류"}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg text-xs font-black shadow-lg">
                      {member.등급 || "N/A"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-500">표시할 데이터가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
