import React, { useState, useEffect } from 'react';
import { Users, RefreshCcw, ShieldCheck } from 'lucide-react';
import { initializeApp } from 'firebase/app';

// 1. Firebase 설정 (공백 제거 및 직접 입력)
const firebaseConfig = {
  apiKey: "AIzaSyD_DClGhfkG-kQHrt-dGXN1Czf2PuZuRFkY", // 띄어쓰기 주의!
  authDomain: "wos-tracker-e1b3c.firebaseapp.com",
  projectId: "wos-tracker-e1b3c",
  storageBucket: "wos-tracker-e1b3c.firebasestorage.app",
  messagingSenderId: "250608724158",
  appId: "1:250608724158:web:1d89a541149e90d5fc16ef",
  measurementId: "G-TMCD693X1M"
};

initializeApp(firebaseConfig);

const App = () => {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. 구글 시트 웹 앱 URL을 여기에 꼭 넣어주세요!
  const GAS_URL = "https://script.google.com/macros/s/AKfycbw5TWahcLUkpgBdwJfn5lurYnigQVNZN-iD6GvFAL30Vup7Bf4SdU_1nLBwHIVa3B1x/exec";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GAS_URL);
      const data = await response.json();
      // 시트의 헤더가 '이름', '등급', '분류'인지 확인하세요.
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
      <div className="max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-black text-blue-400">WOS TRACKER</h1>
              <p className="text-slate-400 text-sm">연맹원 현황</p>
            </div>
            <button onClick={fetchData} className="p-3 bg-slate-700 rounded-xl">
              <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-500">데이터 로딩 중...</div>
          ) : (
            <div className="space-y-3">
              {memberList.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-blue-400" size={20} />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-100">{member.이름}</span>
                      <span className="text-xs text-slate-500">{member.분류}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs font-black">
                    {member.등급}
                  </span>
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
