import React, { useState, useEffect, useCallback, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  updateDoc, 
  deleteDoc, 
  query 
} from 'firebase/firestore';
import { 
  Camera, 
  Clock, 
  Copy, 
  RefreshCcw, 
  Users, 
  Trash2, 
  Plus, 
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Edit2,
  Cloud,
  Snowflake,
  ExternalLink
} from 'lucide-react';

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'wos-fortress-tracker';
const apiKey = ""; // Gemini API Key

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedTime, setSelectedTime] = useState('12시');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // --- Auth & Initialization ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth Error:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // --- Real-time Data Sync (Firestore) ---
  useEffect(() => {
    if (!user) return;

    // RULE 1 준수: /artifacts/{appId}/public/data/{collectionName}/{docId}
    // Master List Sync (Collection)
    const masterRef = collection(db, 'artifacts', appId, 'public', 'data', 'masterList');
    const unsubscribeMaster = onSnapshot(masterRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMasterList(data);
    }, (err) => {
      console.error("Firestore Error (Master):", err);
    });

    // Participants Sync (Document) - 경로 세그먼트를 6개(짝수)로 맞춤
    // artifacts(1) / appId(2) / public(3) / data(4) / participants(5) / {selectedTime}(6)
    const participantsDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'participants', selectedTime);
    const unsubscribeParticipants = onSnapshot(participantsDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setParticipants(Array.isArray(data.list) ? data.list : []);
      } else {
        setParticipants([]);
      }
    }, (err) => {
      console.error("Firestore Error (Participants):", err);
    });

    return () => {
      unsubscribeMaster();
      unsubscribeParticipants();
    };
  }, [user, selectedTime]);

  // --- Helper: Update Firestore ---
  const saveParticipants = async (newList) => {
    if (!user) return;
    // 짝수 세그먼트 경로 사용
    const ref = doc(db, 'artifacts', appId, 'public', 'data', 'participants', selectedTime);
    try {
      await setDoc(ref, { 
        list: newList, 
        lastUpdated: new Date().toISOString() 
      });
    } catch (err) {
      console.error("Save Error:", err);
      setStatusMessage({ type: 'error', text: '데이터 저장에 실패했습니다.' });
    }
  };

  // --- Image Analysis (Gemini) ---
  const analyzeImage = async (file) => {
    if (!user) return;
    setIsAnalyzing(true);
    setStatusMessage({ type: 'info', text: '이미지 분석 중... 잠시만 기다려주세요.' });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result.split(',')[1];
      const prompt = `이 이미지는 화이트아웃 서바이벌 게임의 집결/행군 화면이야. 닉네임만 추출해서 ["닉네임1", "닉네임2"] 형태의 JSON 배열로만 응답해줘. [GOM] 같은 연맹 태그는 제거해.`;

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/png", data: base64Data } }] }]
          })
        });

        const result = await response.json();
        const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const match = textResponse.match(/\[.*\]/s);
        
        if (match) {
          const extractedNames = JSON.parse(match[0]);
          const newEntries = extractedNames.map(name => {
            const cleanName = String(name);
            const masterUser = masterList.find(u => cleanName.includes(u.name) || u.name.includes(cleanName));
            return {
              name: masterUser ? masterUser.name : cleanName,
              role: masterUser ? masterUser.role : '본캐',
              timestamp: new Date().toLocaleTimeString('ko-KR', { hour12: false })
            };
          });

          const combined = [...participants];
          newEntries.forEach(entry => {
            if (!combined.some(p => p.name === entry.name)) combined.push(entry);
          });

          await saveParticipants(combined);
          setStatusMessage({ type: 'success', text: '인원을 성공적으로 추출하고 동기화했습니다.' });
        }
      } catch (e) {
        console.error("Analysis Error:", e);
        setStatusMessage({ type: 'error', text: '이미지 분석에 실패했습니다. 파일 형식을 확인해주세요.' });
      } finally {
        setIsAnalyzing(false);
      }
    };
  };

  // --- Master List Actions ---
  const addMasterUser = async () => {
    if (!newUserName.trim() || !user) return;
    const masterColRef = collection(db, 'artifacts', appId, 'public', 'data', 'masterList');
    const docRef = doc(masterColRef);
    await setDoc(docRef, { name: newUserName.trim(), role: '본캐' });
    setNewUserName('');
  };

  const updateMasterUser = async (id, newName) => {
    if (!newName.trim()) return;
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'masterList', id);
    await updateDoc(docRef, { name: newName.trim() });
    setEditingId(null);
  };

  const deleteMasterUser = async (id) => {
    if (confirm('이 유저를 리스트에서 삭제할까요?')) {
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'masterList', id);
      await deleteDoc(docRef);
    }
  };

  const copyToClipboard = () => {
    const text = `❄️ [WOS ${selectedTime} 요새 참여 명단]\n` + 
      participants.map((p, i) => `${i + 1}. ${p.name} (${p.role})`).join('\n') +
      `\n\n━━━━━━━━━━━━━━\n총 ${participants.length}명 참여 확정`;
    
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setStatusMessage({ type: 'success', text: '명단이 클립보드에 복사되었습니다!' });
  };

  const resetParticipants = async () => {
    if (confirm(`${selectedTime} 명단을 완전히 비우시겠습니까?`)) {
      await saveParticipants([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-800 font-sans p-4 md:p-8 relative overflow-hidden">
      {/* Background Snow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <Snowflake 
            key={i} 
            className="absolute text-blue-100/60 animate-snow-slow" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              transform: `scale(${Math.random() + 0.5})`
            }} 
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center rotate-3 border-2 border-white">
              <Snowflake className="text-white w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-md flex items-center gap-1">
                  <Cloud size={10} /> CLOUD SYNC
                </div>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">화이트아웃 요새 정찰기</h1>
            </div>
          </div>
          
          <div className="flex p-1.5 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-sm overflow-hidden">
            {['12시', '18시', '22시'].map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-8 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                  selectedTime === time 
                  ? 'bg-blue-600 text-white shadow-lg scale-105' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </header>

        {statusMessage && (
          <div className={`mb-8 p-4 rounded-2xl border backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            statusMessage.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-700' :
            statusMessage.type === 'error' ? 'bg-rose-50/80 border-rose-200 text-rose-700' :
            'bg-blue-50/80 border-blue-100 text-blue-700'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-bold">{statusMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-100/50 border border-white relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
                <Users size={120} />
              </div>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Current Participants</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-slate-900 leading-none">{participants.length}</span>
                <span className="text-slate-300 font-bold text-lg">/ 30</span>
              </div>
              <div className="mt-8 h-3.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((participants.length / 30) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-[2rem] p-8 shadow-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                  <Camera size={20} className="text-blue-400" />
                  스크린샷 스캔
                </h3>
                <label className="flex flex-col items-center justify-center w-full h-44 bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer transition-all group">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-10 h-10 animate-spin mb-3 text-blue-400" />
                      <p className="font-bold text-sm">추출 중...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="text-blue-400" />
                      </div>
                      <p className="font-bold text-sm">이미지 추가</p>
                      <p className="text-[10px] text-slate-500 mt-1">집결/행군 화면 업로드</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && analyzeImage(e.target.files[0])} disabled={isAnalyzing} />
                </label>

                <div className="mt-8 space-y-3">
                  <button onClick={copyToClipboard} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-lg active:scale-95">
                    <Copy size={18} /> 명단 복사
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setIsModalOpen(true)} className="py-4 bg-slate-800 text-slate-300 font-bold rounded-2xl border border-white/5 hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                      <Users size={18} /> 리스트 관리
                    </button>
                    <button onClick={resetParticipants} className="py-4 bg-rose-500/10 text-rose-400 font-bold rounded-2xl border border-rose-500/10 hover:bg-rose-500/20 transition-all flex items-center justify-center gap-2">
                      <RefreshCcw size={18} /> 초기화
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-white shadow-xl shadow-blue-100/30 min-h-[600px] flex flex-col overflow-hidden">
              <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-blue-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-blue-50">
                    <Clock size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">도착 인원 명단</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{selectedTime} MISSION STATUS</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                {participants.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 p-10 opacity-50">
                    <Snowflake size={60} className="mb-6 animate-pulse" />
                    <p className="font-black text-xl">데이터가 비어있습니다.</p>
                    <p className="text-sm mt-1 text-slate-400">정찰을 시작하여 인원을 확인하세요.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {participants.map((p, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 rounded-[1.5rem] p-5 flex items-center justify-between group hover:bg-white hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-blue-300 border border-slate-100">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-lg">{p.name || "Unknown"}</p>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                              p.role === '운영진' ? 'bg-rose-100 text-rose-500' : 'bg-blue-100 text-blue-500'
                            }`}>
                              {p.role || "본캐"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-emerald-500 flex items-center justify-end gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> ARRIVED
                          </p>
                          <p className="text-[9px] text-slate-400 font-mono mt-1">{p.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-white animate-in zoom-in-95 duration-300">
            <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">유저 관리</h3>
                <p className="text-xs text-slate-400 font-bold">인원 데이터 및 닉네임 수정</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">✕</button>
            </div>
            
            <div className="p-10">
              <div className="flex gap-3 mb-10">
                <input 
                  type="text" 
                  placeholder="추가할 닉네임 입력"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addMasterUser()}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-[1.25rem] px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
                <button 
                  onClick={addMasterUser}
                  className="bg-slate-900 px-8 rounded-[1.25rem] text-white font-black hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <Plus size={20} /> 추가
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto pr-3 custom-scrollbar space-y-3">
                {[...masterList].sort((a, b) => (a.name || "").localeCompare(b.name || "")).map(userItem => (
                  <div key={userItem.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 group">
                    <div className="flex-1 mr-4">
                      {editingId === userItem.id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            autoFocus
                            defaultValue={userItem.name}
                            onBlur={(e) => updateMasterUser(userItem.id, e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && updateMasterUser(userItem.id, e.target.value)}
                            className="flex-1 bg-white border border-blue-400 rounded-xl px-3 py-2 text-sm font-bold outline-none shadow-sm"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="font-black text-slate-800 text-lg">{userItem.name || "No Name"}</p>
                          <button onClick={() => setEditingId(userItem.id)} className="p-2 text-slate-300 hover:text-blue-500 transition-all rounded-lg hover:bg-blue-50">
                            <Edit2 size={14} />
                          </button>
                        </div>
                      )}
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">{userItem.role || "본캐"}</p>
                    </div>
                    <button 
                      onClick={() => deleteMasterUser(userItem.id)}
                      className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-300 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all flex items-center justify-center shadow-sm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-10">
              <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                <Users size={14} /> Total: {masterList.length}
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-10 py-4 bg-blue-600 text-white text-sm font-black rounded-2xl hover:bg-blue-500 transition-all shadow-lg"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes snow-slow {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-snow-slow { animation: snow-slow linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}} />
    </div>
  );
};

export default App;
