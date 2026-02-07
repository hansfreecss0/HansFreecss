
import { LinuxDay } from './types';

export const COURSE_DATA: LinuxDay[] = [
  {
    id: 1,
    week: 1,
    title: "Apa itu Linux?",
    goal: "Kenalan sama Linux dan paham kenapa hacker & sysadmin suka Linux.",
    theory: "Linux itu kayak mesin mobil yang terbuka. Bedanya sama Windows? Windows itu tertutup (proprietary), Linux itu terbuka (open source). Di Linux, kita rajanya. CLI (Command Line Interface) itu cara kita ngomong langsung ke inti sistem tanpa perantara tombol-tombol visual (GUI).",
    commands: [
      { cmd: "whoami", desc: "Cek nama user yang lagi aktif sekarang." },
      { cmd: "uname -a", desc: "Liat info lengkap sistem operasi dan kernel kamu." },
      { cmd: "date", desc: "Nampilin tanggal dan jam sistem saat ini." }
    ],
    commonErrors: ["Typo: uname-a (seharusnya ada spasi)", "Lupa pake huruf kecil semua."],
    challenge: "Coba cek nama OS lengkap kamu pake uname -a."
  },
  {
    id: 2,
    week: 1,
    title: "Instalasi & Login",
    goal: "Bisa masuk ke sistem Linux pertama kali.",
    theory: "Biasanya kita pake Ubuntu Server atau Desktop. Login butuh username dan password. Inget: pas ngetik password di terminal Linux, karakter emang gak muncul (kosong), tapi tetep kerekam. Jangan panik!",
    commands: [
      { cmd: "login", desc: "Masuk ke sistem pake user lain." },
      { cmd: "exit", desc: "Keluar dari sesi terminal atau logout." },
      { cmd: "clear", desc: "Bersihin layar terminal yang penuh biar rapi lagi." }
    ],
    commonErrors: ["Bingung password gak muncul bintang-bintang (emang gitu!)."],
    challenge: "Coba login dan bersihkan layar terminal kamu."
  },
  {
    id: 3,
    week: 1,
    title: "Struktur Direktori",
    goal: "Paham 'peta' di dalam Linux.",
    theory: "Di Linux gak ada C:\\ atau D:\\. Semuanya mulai dari / (root). /home buat user, /etc buat konfigurasi, /var buat data yang berubah-ubah (kayak log).",
    commands: [
      { cmd: "ls", desc: "Nampilin daftar file dan folder di posisi kamu sekarang." },
      { cmd: "cd /", desc: "Pindah ke folder paling dasar (root)." },
      { cmd: "pwd", desc: "Nunjukin 'Alamat' lengkap folder tempat kamu berada (Print Working Directory)." },
      { cmd: "ls -l", desc: "Liat daftar file versi detail (ada info ijin akses & ukuran)." }
    ],
    commonErrors: ["Lupa dimana posisi sekarang (pake pwd!)", "Salah ngetik path."],
    challenge: "Pindah ke folder root dan cek isinya apa aja."
  },
  {
    id: 4,
    week: 1,
    title: "File & Folder Magic",
    goal: "Jago bikin dan hapus file/folder lewat terminal.",
    theory: "Lupakan klik kanan -> New Folder. Kita pake mkdir (make directory) dan touch (bikin file kosong). Pindah file? Pake mv (move). Copy? Pake cp (copy).",
    commands: [
      { cmd: "mkdir belajar", desc: "Bikin folder baru namanya 'belajar'." },
      { cmd: "touch file.txt", desc: "Bikin file kosong baru namanya 'file.txt'." },
      { cmd: "cp file.txt file_backup.txt", desc: "Copy file jadi file baru." },
      { cmd: "mv file.txt belajar/", desc: "Pindahin file ke dalam folder belajar." },
      { cmd: "rm file_backup.txt", desc: "Hapus file secara permanen." }
    ],
    commonErrors: ["Hapus folder isi pake rm doang (kudu rm -r)", "Hapus file penting (HATI-HATI!)."],
    challenge: "Bikin folder 'tugas' terus di dalamnya bikin file 'laporan.txt'."
  },
  {
    id: 5,
    week: 1,
    title: "Permissions: Siapa Boleh Apa?",
    goal: "Paham rwx (Read, Write, Execute).",
    theory: "Linux itu pelit akses. Ada 3 level: User, Group, Other. chmod buat ganti ijin akses, chown buat ganti pemilik. Angka ajaib: 7 (semua), 5 (baca+jalan), 0 (gak boleh apa-apa).",
    commands: [
      { cmd: "ls -l", desc: "Cek ijin akses (sebelah kiri yang rwx-rwx)." },
      { cmd: "chmod 700 file.txt", desc: "Bikin file cuma bisa diakses kamu sendiri (Privat)." },
      { cmd: "chmod 777 file.txt", desc: "Bikin file bisa diapa-apain siapa aja (Bahaya!)." },
      { cmd: "chown user:group file.txt", desc: "Ganti pemilik file ke user lain." }
    ],
    commonErrors: ["Akses denied (kurang ijin)", "Salah kasih ijin 777 ke file sensitif."],
    challenge: "Ubah file.txt biar cuma bisa dibaca sama kamu sendiri."
  },
  {
    id: 6,
    week: 1,
    title: "User & Sudo",
    goal: "Jadi 'Tuhan' di Linux lewat Sudo.",
    theory: "User biasa terbatas kekuatannya. Sudo (SuperUser Do) bikin kita jadi root sementara. Hati-hati, dengan sudo kamu bisa ancurin sistem kalau ceroboh.",
    commands: [
      { cmd: "sudo su", desc: "Masuk mode 'Dewa' (Root) selamanya." },
      { cmd: "sudo adduser budi", desc: "Tambah user baru bernama budi." },
      { cmd: "sudo deluser budi", desc: "Hapus user bernama budi." },
      { cmd: "groups", desc: "Cek kamu masuk ke kelompok mana aja." }
    ],
    commonErrors: ["Lupa password sudo", "Ngetik sudo buat hal-hal yang gak perlu."],
    challenge: "Bikin user baru namanya 'magang'."
  },
  {
    id: 7,
    week: 1,
    title: "Review Minggu 1",
    goal: "Tes ingatan kamu!",
    theory: "Kamu udah tau cara navigasi, bikin file, ganti ijin, dan manage user. Ini pondasi paling penting.",
    commands: [
      { cmd: "history", desc: "Nampilin semua perintah yang pernah kamu ketik." },
      { cmd: "man ls", desc: "Buka buku manual (bantuan) buat perintah ls." }
    ],
    commonErrors: ["Lupa command (pake history!)"],
    challenge: "Bikin folder 'minggu1', isi file 'catatan.txt', kasih ijin 755, terus hapus foldernya lagi."
  },
  {
    id: 8,
    week: 2,
    title: "Text Editor: Nano & Vim",
    goal: "Edit file konfigurasi tanpa mouse.",
    theory: "Nano itu gampang (pake shortcut di bawah). Vim itu powerful tapi bikin bingung pemula (keluarnya aja susah). Pake Nano aja dulu biar gak stres.",
    commands: [
      { cmd: "nano file.txt", desc: "Edit file pake editor Nano (Gampang)." },
      { cmd: "vim file.txt", desc: "Edit file pake editor Vim (Hardcore)." }
    ],
    commonErrors: ["Gak tau cara simpan di Nano (Ctrl+O, terus Ctrl+X)", "Terjebak di Vim (ketik :q! buat kabur)."],
    challenge: "Buka file pake nano, tulis 'Linux Seru', terus simpan."
  },
  {
    id: 9,
    week: 2,
    title: "Package Manager (APT)",
    goal: "Install software kayak di Playstore/AppStore tapi CLI.",
    theory: "Di Ubuntu kita pake apt. Sebelum install, wajib 'update' dulu biar Linux tau versi terbaru ada dimana.",
    commands: [
      { cmd: "sudo apt update", desc: "Update daftar aplikasi terbaru dari internet." },
      { cmd: "sudo apt install htop", desc: "Download dan install aplikasi htop." },
      { cmd: "sudo apt remove htop", desc: "Hapus aplikasi htop dari sistem." }
    ],
    commonErrors: ["Lupa sudo pas install", "Gak update repo dulu."],
    challenge: "Coba install package 'neofetch'."
  },
  {
    id: 10,
    week: 2,
    title: "Service & Process",
    goal: "Ngintip apa yang lagi jalan di belakang layar.",
    theory: "Systemctl itu remot buat nyalain/matiin aplikasi (service). htop itu task manager versi keren.",
    commands: [
      { cmd: "htop", desc: "Task manager keren, liat RAM & CPU." },
      { cmd: "ps aux", desc: "List semua proses yang lagi jalan di sistem." },
      { cmd: "sudo systemctl status ssh", desc: "Cek apakah aplikasi SSH lagi jalan." },
      { cmd: "sudo systemctl stop ssh", desc: "Matiin aplikasi SSH." }
    ],
    commonErrors: ["Nge-kill process sembarangan.", "Aplikasi gak jalan padahal cuma belum di-start."],
    challenge: "Cek status service 'ssh', kalau mati coba nyalain."
  },
  {
    id: 11,
    week: 2,
    title: "Log System: Detektif Linux",
    goal: "Cari tau kenapa sistem error.",
    theory: "Semua kejadian di Linux dicatat di /var/log. Error? Cek lognya. Journalctl itu cara modern baca log.",
    commands: [
      { cmd: "tail -f /var/log/syslog", desc: "Pantau log sistem secara real-time." },
      { cmd: "journalctl -u ssh", desc: "Liat catatan kejadian khusus aplikasi SSH." },
      { cmd: "cat /var/log/auth.log", desc: "Liat siapa aja yang nyoba login ke server." }
    ],
    commonErrors: ["Pusing baca log karena terlalu banyak (pake grep!)"],
    challenge: "Coba liat 10 baris terakhir dari syslog."
  },
  {
    id: 12,
    week: 2,
    title: "Networking Dasar",
    goal: "Cek koneksi dan IP Address.",
    theory: "Linux itu OS Server, koneksi itu nyawa. 'ip a' buat liat IP kamu. 'ping' buat cek tetangga sebelah online apa gak.",
    commands: [
      { cmd: "ip a", desc: "Liat alamat IP kamu (Cari inet)." },
      { cmd: "ping 8.8.8.8", desc: "Tes koneksi ke internet (DNS Google)." },
      { cmd: "ip route", desc: "Liat gerbang (gateway) internet kamu." }
    ],
    commonErrors: ["Kabel putus tapi nyalahin Linux", "DNS error."],
    challenge: "Cari tau IP Address lokal kamu."
  },
  {
    id: 13,
    week: 2,
    title: "Port & Firewall (UFW)",
    goal: "Tutup pintu biar gak kemasukan hacker.",
    theory: "UFW (Uncomplicated Firewall) itu satpam kita. Kita cuma buka pintu (port) yang perlu aja. Web itu port 80/443. SSH port 22.",
    commands: [
      { cmd: "sudo ufw status", desc: "Cek status pagar pengaman (Firewall)." },
      { cmd: "sudo ufw allow 80", desc: "Buka pintu buat jalur Website." },
      { cmd: "sudo ufw enable", desc: "Aktifkan pagar pengaman." }
    ],
    commonErrors: ["Nyalain firewall tapi lupa allow SSH (Ke-lockout sendiri!)"],
    challenge: "Buka port 80 buat persiapan web server nanti."
  },
  {
    id: 14,
    week: 2,
    title: "Troubleshooting Challenge",
    goal: "Benerin masalah network buatan.",
    theory: "Biasanya masalah itu: Port ketutup, Service mati, atau IP salah. Cek satu-satu pake ilmu yang udah dipelajari.",
    commands: [
      { cmd: "ss -tulpn", desc: "Liat aplikasi apa aja yang lagi nunggu koneksi (Listen)." },
      { cmd: "netstat -plntu", desc: "Cara lama buat liat port yang kebuka." }
    ],
    commonErrors: ["Panik sebelum baca error message."],
    challenge: "Cek port mana aja yang lagi kebuka (Listen) di PC kamu."
  },
  {
    id: 15,
    week: 3,
    title: "Konsep Web Server",
    goal: "Paham gimana website dikirim ke browser.",
    theory: "Web server itu nunggu request di port 80. Browser minta file, web server ngirim filenya. Simple kan?",
    commands: [
      { cmd: "curl localhost", desc: "Coba akses website kamu sendiri lewat terminal." }
    ],
    commonErrors: ["Port 80 udah dipake aplikasi lain."],
    challenge: "Coba akses localhost pake perintah curl."
  },
  {
    id: 16,
    week: 3,
    title: "Install Apache",
    goal: "Nyalain web server pertama kamu.",
    theory: "Apache itu web server paling legendaris. Habis install, dia otomatis jalan.",
    commands: [
      { cmd: "sudo apt install apache2", desc: "Install web server Apache." },
      { cmd: "sudo systemctl start apache2", desc: "Nyalain mesin Apache." }
    ],
    commonErrors: ["Apache gagal start karena ada Nginx."],
    challenge: "Install apache2 terus pastikan statusnya 'active (running)'."
  },
  {
    id: 17,
    week: 3,
    title: "Struktur Apache",
    goal: "Tau dimana naruh file website.",
    theory: "Defaultnya, file web ada di /var/www/html/index.html. Ganti file itu, maka tampilan web kamu berubah.",
    commands: [
      { cmd: "cd /var/www/html", desc: "Pindah ke dapur utama file website." },
      { cmd: "sudo nano index.html", desc: "Edit tampilan depan website kamu." }
    ],
    commonErrors: ["Gak bisa edit index.html (pake sudo!)"],
    challenge: "Ganti isi index.html jadi 'Halo Linuxer Indonesia!'."
  },
  {
    id: 18,
    week: 3,
    title: "Virtual Host Apache",
    goal: "Satu server buat banyak website.",
    theory: "Kita bisa punya website budi.com dan iwan.com di satu IP. Caranya bikin config di /etc/apache2/sites-available/.",
    commands: [
      { cmd: "a2ensite", desc: "Aktifkan konfigurasi website baru." },
      { cmd: "a2dissite", desc: "Nonaktifkan website tertentu." },
      { cmd: "systemctl reload apache2", desc: "Segarkan Apache biar config baru kebaca." }
    ],
    commonErrors: ["Lupa reload apache setelah ganti config."],
    challenge: "Cek folder sites-available, ada file apa aja?"
  },
  {
    id: 19,
    week: 3,
    title: "Install Nginx",
    goal: "Coba web server saingan Apache.",
    theory: "Nginx itu lebih ringan dan jago nanganin banyak pengunjung. Konfigurasinya juga lebih bersih.",
    commands: [
      { cmd: "sudo apt install nginx", desc: "Install web server Nginx yang kenceng." },
      { cmd: "sudo systemctl stop apache2", desc: "Matiin Apache biar gak tabrakan." }
    ],
    commonErrors: ["Dua-duanya mau rebutan port 80."],
    challenge: "Matiin apache, terus install dan nyalain nginx."
  },
  {
    id: 20,
    week: 3,
    title: "Nginx Reverse Proxy",
    goal: "Jadi jembatan buat aplikasi lain.",
    theory: "Nginx sering dipake buat nerusin request ke aplikasi (kayak Node.js atau Python). Ini disebut Reverse Proxy.",
    commands: [
      { cmd: "nginx -t", desc: "Cek apakah ada salah ketik di config Nginx." },
      { cmd: "sudo systemctl restart nginx", desc: "Mulai ulang Nginx buat terapkan config." }
    ],
    commonErrors: ["Salah ngetik titik koma (;) di config nginx."],
    challenge: "Cek syntax config nginx kamu pake nginx -t."
  },
  {
    id: 21,
    week: 3,
    title: "Review Web Server",
    goal: "Paham beda Apache vs Nginx.",
    theory: "Apache itu modular & fleksibel. Nginx itu kenceng & stabil. Keduanya skill wajib sysadmin.",
    commands: [
      { cmd: "apache2ctl -S", desc: "Liat ringkasan config Apache." },
      { cmd: "nginx -v", desc: "Cek versi Nginx yang terpasang." }
    ],
    commonErrors: ["Bingung pilih yang mana (Pilih Nginx buat modern apps)."],
    challenge: "Hapus apache, sisakan nginx aja."
  },
  {
    id: 22,
    week: 4,
    title: "Permission Web Directory",
    goal: "Website aman, hacker susah masuk.",
    theory: "Jangan kasih ijin 777 ke folder web! Biasanya usernya itu 'www-data'.",
    commands: [
      { cmd: "sudo chown -R www-data:www-data /var/www/html", desc: "Kasih hak milik folder web ke user khusus web." },
      { cmd: "sudo chmod -R 755 /var/www/html", desc: "Atur ijin standar: Folder bisa dibuka, tapi gak sembarang orang bisa nulis." }
    ],
    commonErrors: ["Forbidden 403 (Ijin salah)."],
    challenge: "Ubah owner folder html jadi milik user www-data."
  },
  {
    id: 23,
    week: 4,
    title: "Firewall Web Server",
    goal: "Cuma buka pintu buat orang baik.",
    theory: "Kita cuma butuh 80 (HTTP) dan 443 (HTTPS). Tutup sisanya.",
    commands: [
      { cmd: "sudo ufw allow 'Nginx Full'", desc: "Otomatis buka port 80 & 443 buat Nginx." },
      { cmd: "sudo ufw status verbose", desc: "Liat status firewall dengan sangat detail." }
    ],
    commonErrors: ["Lupa SSH dibuka (Ke-lock lagi!)"],
    challenge: "Hapus ijin port yang gak penting di UFW."
  },
  {
    id: 24,
    week: 4,
    title: "SSL & HTTPS",
    goal: "Bikin website aman (Gembok Hijau).",
    theory: "SSL nge-enkripsi data. Kita bisa pake Self-Signed buat latihan, atau Let's Encrypt buat beneran.",
    commands: [
      { cmd: "openssl req -x509", desc: "Bikin sertifikat keamanan sendiri (Self-signed)." },
      { cmd: "ls /etc/ssl/certs", desc: "Liat daftar sertifikat yang ada di sistem." }
    ],
    commonErrors: ["Browser bilang 'Connection not private' (Wajar kalo self-signed)."],
    challenge: "Cek dimana lokasi file cert default di /etc/ssl/."
  },
  {
    id: 25,
    week: 4,
    title: "Monitoring & Autostart",
    goal: "Bikin server tahan banting.",
    theory: "Service harus otomatis nyala pas PC restart. Pake 'enable'.",
    commands: [
      { cmd: "sudo systemctl enable nginx", desc: "Setel Nginx biar otomatis nyala pas server hidup." },
      { cmd: "uptime", desc: "Liat udah berapa lama server kamu nyala." }
    ],
    commonErrors: ["Aplikasi mati sendiri pas server reboot."],
    challenge: "Pastikan nginx otomatis nyala pas restart."
  },
  {
    id: 26,
    week: 4,
    title: "Backup & Restore",
    goal: "Sedia payung sebelum hujan.",
    theory: "Backup itu wajib. Paling simpel pake tar buat kompres file config.",
    commands: [
      { cmd: "tar -cvzf backup.tar.gz /etc/nginx", desc: "Bungkus semua config Nginx jadi satu file kompres." },
      { cmd: "ls -lh", desc: "Liat ukuran file dengan format yang gampang dibaca (MB/GB)." }
    ],
    commonErrors: ["Lupa dimana naruh file backup."],
    challenge: "Backup folder config nginx kamu ke home folder."
  },
  {
    id: 27,
    week: 4,
    title: "Simulasi Error",
    goal: "Latihan mental saat server down.",
    theory: "Saya sengaja matiin service atau ganti port. Kamu harus cari tau kenapa.",
    commands: [
      { cmd: "grep -i 'error' /var/log/nginx/error.log", desc: "Cari kata 'error' di dalam catatan Nginx." },
      { cmd: "find /etc -name '*.conf'", desc: "Cari semua file konfigurasi di folder /etc." }
    ],
    commonErrors: ["Gak tau mau mulai ngecek darimana."],
    challenge: "Cek log nginx buat liat ada error request apa hari ini."
  },
  {
    id: 28,
    week: 4,
    title: "Akses LAN",
    goal: "Website kamu bisa dibuka dari HP.",
    theory: "Kalo HP dan Laptop satu WiFi, kamu bisa buka IP laptop kamu dari HP.",
    commands: [
      { cmd: "hostname -I", desc: "Cek semua IP Address yang kamu punya dengan cepat." }
    ],
    commonErrors: ["Firewall nge-block akses dari luar."],
    challenge: "Dapetin IP Address yang bisa diakses client lain."
  },
  {
    id: 29,
    week: 4,
    title: "Sysadmin Best Practice",
    goal: "Kebiasaan orang jago.",
    theory: "Jangan pake root langsung, rajin update, pake key SSH bukan password, dan selalu cek log.",
    commands: [
      { cmd: "sudo apt list --upgradable", desc: "Liat daftar aplikasi yang punya versi baru." }
    ],
    commonErrors: ["Males update (Bahaya security!)."],
    challenge: "Cek list aplikasi yang butuh update."
  },
  {
    id: 30,
    week: 4,
    title: "FINAL PROJECT",
    goal: "Gelar Sysadmin Dasar!",
    theory: "Install Linux, setup Nginx, ganti index.html, nyalain firewall, dan pastikan web bisa diakses. Kamu resmi lulus!",
    commands: [
      { cmd: "whoami", desc: "Siapa pahlawan Linux hari ini?" },
      { cmd: "echo 'I AM A LINUX SYSADMIN'", desc: "Teriakkan gelar baru kamu!" }
    ],
    commonErrors: ["Lupa semua ilmu hari 1."],
    challenge: "Tulis di terminal: echo 'LULUS'!"
  }
];
