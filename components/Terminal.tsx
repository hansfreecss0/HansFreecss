
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronRight, AlertCircle, Command } from 'lucide-react';
import { CommandResponse } from '../types';

interface TerminalProps {
  expectedCommands: string[];
  isErrorMode: boolean;
  onCommandSuccess?: (cmd: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ expectedCommands, isErrorMode, onCommandSuccess }) => {
  const [history, setHistory] = useState<CommandResponse[]>([
    { output: 'Linux Kernel 5.15.0-76-generic x86_64', type: 'info' },
    { output: 'Welcome to the Linux Training Terminal. Type your commands below.', type: 'info' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const detectTypo = (cmd: string, expected: string[]) => {
    for (const target of expected) {
      const targetBase = target.split(' ')[0];
      const cmdBase = cmd.split(' ')[0];
      
      if (cmdBase !== targetBase && targetBase.includes(cmdBase) && cmdBase.length > 2) {
        return `Mungkin maksud kamu '${targetBase}'? Kamu ngetik '${cmdBase}'.`;
      }
    }
    return null;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const cmd = trimmedInput.toLowerCase();
    let response: CommandResponse | null = null;

    // "Error Sengaja" simulation
    if (isErrorMode && Math.random() > 0.6) {
      const errors = [
        "Segmentation fault (core dumped)",
        "Bus error",
        "Permission denied (are you root?)",
        "Device or resource busy",
        "No space left on device"
      ];
      response = { 
        output: `bash: error fatal: ${errors[Math.floor(Math.random() * errors.length)]}`, 
        type: 'error' 
      };
    } else if (cmd === 'clear') {
      // PENTING: Panggil success callback sebelum hapus history agar progress tetap kerekam
      if (expectedCommands.some(ec => ec.toLowerCase() === 'clear')) {
        onCommandSuccess?.('clear');
      }
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'help') {
      response = { 
        output: `Command yang harus kamu coba: ${expectedCommands.join(', ')}`, 
        type: 'info' 
      };
    } else {
      const isExpected = expectedCommands.some(ec => cmd.startsWith(ec.split(' ')[0]));
      const typoHint = detectTypo(cmd, expectedCommands);

      if (isExpected) {
        let output = 'Command berhasil dijalankan.';
        
        if (cmd.includes('ls')) output = 'total 24\ndrwxr-xr-x 2 user user 4096 Oct 25 10:00 .\ndrwxr-xr-x 4 user user 4096 Oct 25 10:00 ..\n-rw-r--r-- 1 user user    0 Oct 25 10:00 file_latihan.txt';
        if (cmd.includes('pwd')) output = '/home/user/workspace';
        if (cmd.includes('whoami')) output = 'linux_trainee';
        if (cmd.includes('ip a')) output = '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000\n    inet 192.168.1.15/24 brd 192.168.1.255 scope global eth0';
        if (cmd.includes('htop')) output = '[||||||||||||||||||| 85.2%] Tasks: 120, 1 thr; 1 running\nMem[|||||||||        420MB/2048MB] Swp[0MB/1024MB]';
        if (cmd.includes('systemctl status')) output = '● service.service - Linux Learning Service\n     Loaded: loaded (/lib/systemd/system/service.service; enabled; vendor preset: enabled)\n     Active: active (running) since Wed 2023-10-25 12:00:00 UTC; 1h 20min ago';
        if (cmd.includes('uname')) output = 'Linux learn-box 5.15.0-76-generic #83-Ubuntu SMP Thu Jun 15 19:16:32 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux';
        if (cmd.includes('sudo')) output = '[sudo] password for linux_trainee: (diketik tapi tidak muncul)\nCommand executed with superuser privileges.';

        response = { output, type: 'success' };
        onCommandSuccess?.(cmd);
      } else if (typoHint) {
        response = { output: `bash: ${cmd}: command not found. ${typoHint}`, type: 'error' };
      } else {
        response = { output: `bash: ${cmd}: command not found. Ketik 'help' untuk melihat tugas kamu.`, type: 'error' };
      }
    }

    if (response) {
      setHistory(prev => [...prev, { output: `linux_trainee@ubuntu:~$ ${trimmedInput}`, type: 'info' }, response!]);
    }
    setInput('');
  };

  return (
    <div className="bg-[#0c0c0c] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col h-[450px] font-mono">
      <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-3 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
          <TerminalIcon size={14} />
          <span>Shell Simulator</span>
        </div>
        {isErrorMode && (
          <div className="ml-auto flex items-center gap-1.5 text-red-500 text-[10px] animate-pulse font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
            <AlertCircle size={12} />
            <span>TROUBLESHOOTING MODE</span>
          </div>
        )}
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-5 text-sm overflow-y-auto space-y-2 custom-scrollbar"
      >
        {history.map((h, i) => (
          <div key={i} className={`leading-relaxed whitespace-pre-wrap ${
            h.type === 'success' ? 'text-emerald-400' : 
            h.type === 'error' ? 'text-rose-400' : 
            h.type === 'info' && h.output.startsWith('linux_trainee') ? 'text-sky-400' :
            'text-zinc-400'
          }`}>
            {h.output}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="p-4 bg-[#141414] border-t border-zinc-800 flex items-center gap-3 group">
        <span className="text-emerald-500 font-bold">➜</span>
        <span className="text-sky-400 font-bold">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-zinc-100 flex-1 caret-emerald-500"
          placeholder="Masukkan perintah..."
          autoFocus
        />
      </form>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0c0c0c;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #222;
        }
      `}</style>
    </div>
  );
};

export default Terminal;
