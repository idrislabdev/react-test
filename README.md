E-Commerce Digital Product - Paket Data Internet
Proyek ini adalah solusi untuk Frontend Developer Technical Test yang berfokus pada redesign website pembelian paket data internet. Aplikasi ini dibangun dengan standar Engineering Quality tinggi menggunakan React 19 dan arsitektur fitur modern.
Tech Stack Utama
• Framework: React v19+ (Vite 8)
• Styling: Tailwind CSS v4
• State Management: Zustand v5 (Minimal re-render & no prop drilling)
• Navigation: React Router DOM v7
• UI Components: Radix UI & Shadcn/UI
• Mock Backend: JSON-Server

---

Struktur Proyek (Feature-Based Architecture)
Proyek menerapkan Service Pattern dan Modular Features untuk skalabilitas:
• src/features/: Folder utama berisi logika per-modul (Auth, Home, Checkout, Histories).
• src/features/_/services/: API Abstraction Layer menggunakan Axios untuk memisahkan logika data dari UI.
• src/features/_/stores/: Modular State Management. Menggunakan Zustand yang dipisahkan per fitur untuk menghindari God Store (satu store raksasa). Strategi ini efektif untuk meminimalkan unnecessary re-render karena komponen hanya mendengarkan state yang relevan dengan fiturnya.src/app/: Konfigurasi inti seperti routing global dan Protected Routes.
• src/app/: Pusat konfigurasi aplikasi, mencakup pengaturan routing global dan implementasi Protected Routes untuk membatasi akses halaman bagi user yang belum terautentikasi.
• src/components/ui/: Kumpulan komponen atomik yang mendukung Reusable Component.

---

UX & State Management Strategy

1. Menghindari Prop Drilling
   Saya menggunakan Zustand sebagai Centralized State Management. Dengan memindahkan state global (seperti Data User, Cart, atau History) ke dalam Store, komponen dapat langsung mengakses data yang dibutuhkan tanpa harus mengoper props melalui banyak level komponen perantara.
2. Mencegah Unnecessary Re-render
   • Atomic State: Store dipecah per-fitur agar perubahan di satu fitur tidak memicu render di fitur lain.
   • Selector Pattern: Mengambil bagian state yang spesifik (misal: const user = useAuthStore(s => s.user)) sehingga komponen hanya akan re-render jika data user berubah.
3. Memoization (useMemo, useCallback, memo)
   Memoization diimplementasikan pada:
   • Komponen List: Untuk mencegah re-render ribuan item saat state yang tidak relevan berubah.
   • Kalkulasi Berat: Saat melakukan filter/sorting pada data paket data yang besar di sisi client.
   • Kapan Perlu?: Hanya ketika sebuah komponen memiliki kalkulasi mahal atau sering re-render tanpa perubahan props yang nyata.
4. Handling Race Condition (Double Checkout)
   Untuk menangani klik cepat 2x pada tombol checkout:
   • Button Loading State: Tombol akan otomatis disabled segera setelah klik pertama (isLoading = true).
   • Idempotency Logic: Mengunci eksekusi fungsi di dalam Store jika proses sebelumnya belum selesai.

---

Analisis UX & User Persona

1. Target User Persona
   • Digital Savvy (Gen Z/Millennials): Mencari kecepatan, interface bersih, dan promo yang terlihat jelas.
   • Budget-Conscious User: User yang sangat memperhatikan perbandingan harga dan kuota.
2. Strategi Meningkatkan "Page Per Visit"
3. Exploration via "Best Deals" Section:
   Di halaman utama, saya memisahkan produk promo ke dalam section khusus yang menonjol secara visual. Ini berfungsi sebagai "magnet" untuk menarik perhatian user agar melakukan klik dan melihat detail paket, meskipun tujuan awal user mungkin hanya melakukan pengecekan harga rutin.
4. Advanced Filtering System:
   Sistem filter yang komprehensif (Provider, Harga, Kuota) memungkinkan user untuk melakukan perbandingan antar paket dengan mudah. Proses membandingkan berbagai opsi ini secara alami meningkatkan interaksi user dengan berbagai data produk di aplikasi.
5. Seamless Auth Experience (Modal System):
   Saya menggunakan sistem Modal untuk Login dan Register. Strategi ini sangat krusial karena:
   o User tidak perlu meninggalkan halaman produk saat ingin login.
   o Mengurangi bounce rate karena tidak ada interupsi full-page reload.
   o Menjaga momentum user dalam menjelajah produk hingga ke tahap checkout.
6. Transaction History Visibility:
   Fitur Riwayat Transaksi didesain agar mudah diakses, memberikan alasan bagi user untuk kembali mengunjungi aplikasi setelah transaksi selesai (untuk memantau status atau melakukan pembelian ulang).

---

Jawaban Performance & Edge Case (Real-World Scenario)

1. Strategi Menangani 10.000 Item
   Dalam kondisi produksi (Real-World), strategi yang saya terapkan adalah:
   • Server-Side Filtering & Pagination: Data 10.000 tidak ditarik sekaligus. Frontend hanya meminta data per page (misal 20 item) dan menyerahkan proses filter (Provider/Harga) ke Backend melalui query params API.
   • Virtual Scrolling: Menggunakan teknik windowing (seperti react-window) jika list harus ditampilkan sangat panjang, sehingga browser hanya merender elemen yang tampak di layar.
   • Debouncing Input: Menambahkan delay pada kolom pencarian agar tidak menembak API setiap kali user mengetik satu karakter.
2. Handling API Lambat (>3 detik)
   • Skeleton Loading: Memberikan feedback visual instan agar user tidak merasa aplikasi "hang".
   • Optimistic UI: Memberikan respon sukses pada UI segera setelah user klik tombol, sementara proses di background tetap berjalan.

---

Cara Menjalankan Project

1. Install Dependensi: npm install
2. Jalankan Mock API: npx json-server --watch db.json
3. Jalankan Aplikasi: npm run dev
4. Jangan lupa .env (VITE_BASE_URL=http://localhost:3000
   Akses melalui: http://localhost:5173

---

Estimasi Pengerjaan
Total waktu: ~10 Jam (Termasuk Slicing, Logic, Recording, dan Dokumentasi).

---
