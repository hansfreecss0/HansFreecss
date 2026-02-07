
import React, { useState, useEffect, useMemo } from 'react';
import { COURSE_DATA } from './constants';
import { Progress, LinuxDay } from './types';
import Terminal from './components/Terminal';
import { tutorService } from './services/geminiService';
import { 
  CheckCircle2, 
  BookOpen, 
  Terminal as TerminalIcon, 
  AlertTriangle, 
  Trophy, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  Menu,
  X,
  Bug,
  Moon,
  Sun,
  Copy,
  Zap,
  Star,
  Lock,
  Info
} from 'lucide-react';

const App: React.FC = () => {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('linux_30_progress');
    return saved ? JSON.parse(saved) : {
      completedDays: [],
      currentDay: 1,
      isDarkMode: true,
      isErrorMode: false
    };
  });

  const [sessionCommands, setSessionCommands] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentDayData = useMemo(() => 
    COURSE_DATA.find(d => d.id === progress.currentDay) || COURSE_DATA[0]
  , [progress.currentDay]);

  const isDayRequirementsMet = useMemo(() => {
    const required = currentDayData.commands.map(c => c.cmd.split(' ')[0].toLowerCase());
    const used = sessionCommands.map(c => c.split(' ')[0].toLowerCase());
    return required.every(req => used.includes(req));
  }, [currentDayData, sessionCommands]);

  useEffect(() => {
    localStorage.setItem('linux_30_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    setSessionCommands([]);
    setAiResponse(null);
  }, [progress.currentDay]);

  const toggleDayCompletion = (dayId: number) => {
    if (!isDayRequirementsMet && !progress.completedDays.includes(dayId)) {
      alert("Waduh! Kamu harus nyobain semua command di terminal dulu sebelum lanjut. Jangan curang ya!");
      return;
    }

    setProgress(prev => {
      const isCompleted = prev.completedDays.includes(dayId);
      const newCompleted = isCompleted 
        ? prev.completedDays.filter(id => id !== dayId)
        : [...prev.completedDays, dayId];
      
      if (!isCompleted) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      
      return { ...prev, completedDays: newCompleted };
    });
  };

  const nextDay = () => {
    if (progress.currentDay < 30) {
      setProgress(prev => ({ ...prev, currentDay: prev.currentDay + 1 }));
    }
  };

  const prevDay = () => {
    if (progress.currentDay > 1) {
      setProgress(prev => ({ ...prev, currentDay: prev.currentDay - 1 }));
    }
  };

  const handleAskAI = async () => {
    setAiLoading(true);
    const answer = await tutorService.askTutor(
      `Saya bingung di materi ${currentDayData.title}. Bisa jelaskan lagi?`,
      currentDayData.theory
    );
    setAiResponse(answer || "Maaf, AI lagi istirahat.");
    setAiLoading(false);
  };

  const handleCommandSuccess = (cmd: string) => {
    setSessionCommands(prev => [...new Set([...prev, cmd])]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const progressPercentage = (progress.completedDays.length / 30) * 100;

  return (
    <div className={`min-h-screen ${progress.isDarkMode ? 'bg-[#050505] text-zinc-100' : 'bg-gray-50 text-gray-900'} font-sans transition-colors duration-300 selection:bg-emerald-500/30`}>
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-80 ${progress.isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} border-r ${progress.isDarkMode ? 'border-zinc-800' : 'border-gray-200'} z-50 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <TerminalIcon className="text-emerald-500" size={24} />
              </div>
              <h1 className="font-black text-xl tracking-tighter uppercase italic">
                Linux<span className="text-emerald-500">30</span>
              </h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-zinc-500">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            {[1, 2, 3, 4].map(week => (
              <div key={week}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${progress.isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'}`}>
                    MINGGU {week}
                  </span>
                  <div className="flex-1 h-px bg-zinc-800/50"></div>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {COURSE_DATA.filter(d => d.week === week).map(day => (
                    <button
                      key={day.id}
                      onClick={() => {
                        setProgress(prev => ({ ...prev, currentDay: day.id }));
                        setIsSidebarOpen(false);
                      }}
                      className={`group flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        progress.currentDay === day.id 
                          ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 scale-[1.02]' 
                          : progress.isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-100' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs border transition-colors ${
                        progress.completedDays.includes(day.id) 
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500' 
                          : progress.currentDay === day.id ? 'bg-white/20 border-white/40' : 'border-zinc-800'
                      }`}>
                        {progress.completedDays.includes(day.id) ? <CheckCircle2 size={16} /> : day.id}
                      </div>
                      <span className="flex-1 text-left truncate">{day.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-8 pt-6 border-t ${progress.isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Kesiapan Kerja</span>
              <span className="text-xs font-black text-emerald-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-1000 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:ml-80 flex flex-col min-h-screen relative">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
             <div className="bg-emerald-500 text-white px-10 py-5 rounded-3xl shadow-2xl animate-bounce flex items-center gap-4 border-4 border-white">
                <Star className="fill-white" />
                <span className="text-2xl font-black uppercase italic">DAY COMPLETE!</span>
                <Star className="fill-white" />
             </div>
          </div>
        )}

        <nav className={`sticky top-0 z-30 px-6 py-5 flex items-center justify-between ${progress.isDarkMode ? 'bg-[#050505]/80' : 'bg-gray-50/80'} backdrop-blur-xl border-b ${progress.isDarkMode ? 'border-zinc-900' : 'border-gray-200'}`}>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-3">
               <div className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded tracking-tighter">HARI {currentDayData.id}</div>
               <h2 className="font-bold text-xl tracking-tight">{currentDayData.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setProgress(prev => ({ ...prev, isErrorMode: !prev.isErrorMode }))}
              title="Toggle Troubleshooting Training"
              className={`p-2.5 rounded-xl transition-all ${progress.isErrorMode ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100'}`}
            >
              <Bug size={18} />
            </button>
            <button 
              onClick={() => setProgress(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }))}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-all"
            >
              {progress.isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>

        <div className="p-6 lg:p-12 max-w-5xl mx-auto w-full space-y-16 flex-1">
          <section className="relative">
            <div className="absolute -top-10 -left-10 text-[120px] font-black text-emerald-500/5 select-none pointer-events-none">
              {currentDayData.id.toString().padStart(2, '0')}
            </div>
            <div className="relative space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-black tracking-[0.3em] uppercase">
                <Zap size={14} className="fill-emerald-500" />
                <span>Misi Hari Ini</span>
              </div>
              <h3 className="text-3xl lg:text-5xl font-black leading-tight max-w-3xl">
                {currentDayData.goal}
              </h3>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-6">
               <div className="flex items-center gap-3 font-black text-xs tracking-widest text-zinc-500">
                <BookOpen size={16} />
                <span>KULIAH SINGKAT</span>
              </div>
              <div className={`p-6 rounded-3xl border ${progress.isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-gray-200'} leading-relaxed text-zinc-400 italic`}>
                 "Ingat: Linux bukan cuma soal command, tapi soal mindset problem solving."
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className={`text-xl lg:text-2xl font-medium leading-relaxed ${progress.isDarkMode ? 'text-zinc-200' : 'text-gray-700'}`}>
                {currentDayData.theory}
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 font-black text-xs tracking-widest text-zinc-500">
                <TerminalIcon size={16} />
                <span>LABORATORIUM CLI & FUNGSI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-zinc-500">Dikuasai:</span>
                <span className="text-xs font-black text-emerald-500">{sessionCommands.length}/{currentDayData.commands.length}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {currentDayData.commands.map((cmdObj, i) => (
                <div 
                  key={i} 
                  onClick={() => copyToClipboard(cmdObj.cmd)}
                  className={`cursor-pointer group relative flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                    sessionCommands.includes(cmdObj.cmd.toLowerCase()) 
                      ? 'bg-emerald-500/10 border-emerald-500/30' 
                      : progress.isDarkMode ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-600' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${sessionCommands.includes(cmdObj.cmd.toLowerCase()) ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`}></div>
                      <code className="text-lg font-bold text-emerald-500 group-hover:text-emerald-400 transition-colors">$ {cmdObj.cmd}</code>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-zinc-500 mt-1 pl-5">
                      <Info size={14} className="mt-0.5 flex-shrink-0" />
                      <p>{cmdObj.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-3">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Salin Perintah</span>
                    <Copy size={16} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            <Terminal 
              expectedCommands={currentDayData.commands.map(c => c.cmd)} 
              isErrorMode={progress.isErrorMode} 
              onCommandSuccess={handleCommandSuccess}
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-3xl border ${progress.isDarkMode ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-100'}`}>
              <div className="flex items-center gap-3 text-rose-500 font-black text-xs tracking-widest mb-6">
                <AlertTriangle size={18} />
                <span>LAPORAN ERROR UMUM</span>
              </div>
              <ul className="space-y-4">
                {currentDayData.commonErrors.map((err, i) => (
                  <li key={i} className="flex gap-4 text-sm leading-relaxed text-zinc-400">
                    <span className="text-rose-500/50 font-bold">#0{i+1}</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-8 rounded-3xl border-2 border-dashed flex flex-col items-center text-center justify-center ${progress.isDarkMode ? 'border-zinc-800 bg-zinc-900/20' : 'border-gray-200 bg-gray-50'}`}>
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                <Trophy size={32} />
              </div>
              <h4 className="font-black text-xl mb-3 tracking-tight">Challenge Terakhir</h4>
              <p className="text-zinc-500 text-sm mb-8 max-w-xs">{currentDayData.challenge}</p>
              
              <button 
                onClick={() => toggleDayCompletion(currentDayData.id)}
                className={`w-full max-w-[240px] py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-2xl ${
                  progress.completedDays.includes(currentDayData.id)
                    ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                    : isDayRequirementsMet 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 border border-zinc-700'
                }`}
              >
                {!isDayRequirementsMet && !progress.completedDays.includes(currentDayData.id) && <Lock size={16} />}
                {progress.completedDays.includes(currentDayData.id) ? 'MISSION COMPLETED' : 'SELESAIKAN HARI INI'}
              </button>
            </div>
          </section>

          <section className="pt-20 border-t border-zinc-900">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/3">
                <div className="flex items-center gap-3 font-black text-xs tracking-widest text-zinc-500 mb-6">
                  <HelpCircle size={18} />
                  <span>KONSULTASI TUTOR AI</span>
                </div>
                <h5 className="text-2xl font-black tracking-tight mb-4">Masih Mentok?</h5>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Tanya langsung ke tutor AI kita. Dia bakal jelasin pake bahasa yang lebih nyantai kalo kamu belum paham teori di atas.
                </p>
                <button 
                  onClick={handleAskAI}
                  disabled={aiLoading}
                  className="mt-8 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-sm hover:border-emerald-500 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {aiLoading ? (
                    <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : <Zap size={16} className="text-emerald-500 fill-emerald-500" />}
                  Jelasin Lagi Dong!
                </button>
              </div>

              <div className="lg:w-2/3">
                {aiResponse ? (
                  <div className={`p-8 rounded-3xl border animate-in slide-in-from-bottom-5 duration-500 ${progress.isDarkMode ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'}`}>
                    <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-black text-white shadow-lg">AI</div>
                       <div className={`text-base leading-relaxed ${progress.isDarkMode ? 'text-emerald-100/80' : 'text-emerald-900'}`}>
                          {aiResponse}
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className={`h-full min-h-[150px] border-2 border-dashed rounded-3xl flex items-center justify-center text-zinc-700 ${progress.isDarkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                     <p className="text-xs uppercase font-black tracking-widest">Klik tombol tanya untuk jawaban</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <footer className={`p-6 mt-10 border-t ${progress.isDarkMode ? 'bg-[#050505] border-zinc-900' : 'bg-white border-gray-100'}`}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button 
              onClick={prevDay}
              disabled={progress.currentDay === 1}
              className={`group flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition-all ${
                progress.currentDay === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Sebelumnya</span>
            </button>
            <button 
              onClick={nextDay}
              disabled={progress.currentDay === 30}
              className={`group flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition-all ${
                progress.currentDay === 30 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <span>Hari Berikutnya</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
