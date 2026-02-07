
export interface LinuxCommand {
  cmd: string;
  desc: string;
}

export interface LinuxDay {
  id: number;
  week: number;
  title: string;
  goal: string;
  theory: string;
  commands: LinuxCommand[]; // Diubah menjadi array objek
  commonErrors: string[];
  challenge: string;
}

export interface Progress {
  completedDays: number[];
  currentDay: number;
  isDarkMode: boolean;
  isErrorMode: boolean;
}

export interface CommandResponse {
  output: string;
  type: 'success' | 'error' | 'info';
}
