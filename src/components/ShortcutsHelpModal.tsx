import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Keyboard, 
  BookOpen, 
  Zap, 
  HelpCircle, 
  Compass, 
  Sliders, 
  Trophy, 
  User, 
  Tv, 
  Flame, 
  Award, 
  Cpu, 
  Sparkles, 
  LayoutDashboard,
  BrainCircuit,
  Volume2,
  Maximize2
} from "lucide-react";

interface ShortcutsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsHelpModal({ isOpen, onClose }: ShortcutsHelpModalProps) {
  const [activeSubTab, setActiveSubTab] = useState<"keys" | "handbook" | "engine">("keys");

  if (!isOpen) return null;

  const shortcutsList = [
    { key: "H", desc: "Phi thẳng về góc học tập (Tab Ôn Tập Học Thẻ)", icon: <BookOpen className="w-4 h-4 text-emerald-500" /> },
    { key: "U", desc: "Mở Đầu Não AI - Trình bóc tách Flashcard (V3 Engine)", icon: <Cpu className="w-4 h-4 text-cyan-500" /> },
    { key: "R", desc: "Xem Bảng Xếp Hạng tuần (Leaderboard rực cháy)", icon: <Trophy className="w-4 h-4 text-yellow-500" /> },
    { key: "K", desc: "Mở Cây Kỹ Năng rèn luyện & Lộ trình học (Skill Tree)", icon: <BrainCircuit className="w-4 h-4 text-indigo-500" /> },
    { key: "C", desc: "Bước vào Cinematic Study Room (Phòng học Cyberpunk)", icon: <Tv className="w-4 h-4 text-purple-500" /> },
    { key: "O", desc: "Qua CoStudy Room (Học nhóm thời gian thực)", icon: <LayoutDashboard className="w-4 h-4 text-pink-500" /> },
    { key: "A", desc: "Xem Kho Thành Tựu danh giá", icon: <Award className="w-4 h-4 text-amber-500" /> },
    { key: "P", desc: "Vào quản lý Trang Cá Nhân (Profile)", icon: <User className="w-4 h-4 text-blue-500" /> },
    { key: "M", desc: "Xem Lịch sử rèn luyện & Biểu đồ phân tích (Chart)", icon: <Sliders className="w-4 h-4 text-stone-400" /> },
    { key: "S", desc: "Toggle Menu Cài đặt hệ thống (Settings Side Menu)", icon: <Sliders className="w-4 h-4 text-amber-500 animate-pulse" /> },
    { key: "E", desc: "Bật/Tắt Chế độ Mượt (Giảm lag, tắt hiệu ứng thừa)", icon: <Zap className="w-4 h-4 text-green-500" /> },
    { key: "F", desc: "Bật/Tắt Toàn màn hình (Fullscreen mode)", icon: <Maximize2 className="w-4 h-4 text-teal-500" /> },
    { key: "?", desc: "Mở / Tắt Cẩm nang cứu cánh này của tao", icon: <HelpCircle className="w-4 h-4 text-red-500" /> },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Blurred dark overlay backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/80 dark:bg-black/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-3xl h-[600px] max-h-[90vh] bg-stone-900 border border-stone-800 dark:bg-zinc-950 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col font-sans text-stone-100"
      >
        {/* Decorative ambient gradient glowing on top */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 opacity-80" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <Keyboard className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-xl font-display font-black tracking-tight text-white flex items-center gap-2">
                Hệ Thống Phím Tắt & Cẩm Nang Sử Dụng
              </h3>
              <p className="text-xs text-stone-400 font-medium">Bí kíp luyện tập Stoic và làm chủ đỉnh cao công nghệ Henosis Web</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800/80 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 px-8 py-3 bg-stone-900/50 dark:bg-zinc-900/40 border-b border-stone-800/60 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveSubTab("keys")}
            className={`py-2 px-4 rounded-xl text-xs font-black tracking-tight transition flex items-center gap-1.5 shrink-0 ${
              activeSubTab === "keys"
                ? "bg-yellow-500 text-stone-950 shadow-md"
                : "bg-stone-800 hover:bg-stone-700 text-stone-300"
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            Hệ Thống Phím Tắt
          </button>
          <button
            onClick={() => setActiveSubTab("handbook")}
            className={`py-2 px-4 rounded-xl text-xs font-black tracking-tight transition flex items-center gap-1.5 shrink-0 ${
              activeSubTab === "handbook"
                ? "bg-yellow-500 text-stone-950 shadow-md"
                : "bg-stone-800 hover:bg-stone-700 text-stone-300"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Cẩm Nang Sống Còn chống Lag
          </button>
          <button
            onClick={() => setActiveSubTab("engine")}
            className={`py-2 px-4 rounded-xl text-xs font-black tracking-tight transition flex items-center gap-1.5 shrink-0 ${
              activeSubTab === "engine"
                ? "bg-yellow-500 text-stone-950 shadow-md"
                : "bg-stone-800 hover:bg-stone-700 text-stone-300"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Đầu Não AI Ingestion Engine V3
          </button>
        </div>

        {/* Modal content body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <AnimatePresence mode="wait">
            {activeSubTab === "keys" && (
              <motion.div
                key="keys-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {shortcutsList.map((item) => (
                  <div 
                    key={item.key} 
                    className="flex items-center justify-between p-4 bg-stone-900/60 dark:bg-zinc-900/30 border border-stone-850 dark:border-zinc-900/60 rounded-2xl hover:border-stone-750 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-stone-800 dark:bg-zinc-900 rounded-lg">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold text-stone-300 leading-snug">{item.desc}</span>
                    </div>
                    <kbd className="px-2.5 py-1 text-xs font-mono font-black bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded-lg shadow-sm">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </motion.div>
            )}

            {activeSubTab === "handbook" && (
              <motion.div
                key="handbook-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {/* Fix Lag Section */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    <Zap className="w-5 h-5 text-green-500" />
                    <span>HƯỚNG DẪN BẬT "FIX LAG" (CHẾ ĐỘ MƯỢT)</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-medium">
                    Nếu mày lướt card hoặc mở Cinematic room thấy có hiện tượng giật lag, đơ đơ thì do máy mày đang quá gánh các hiệu ứng mượt mà (3D, Canvas, hạt lơ lửng, tuyết rơi, chuyển màu gradient...).
                    <br />
                    <strong className="text-white block mt-2">👉 Cách xử lý siêu tốc:</strong>
                    - Nhấn phím <kbd className="px-1 py-0.5 font-mono text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 rounded">E</kbd> trên bàn phím (hoặc nhấn <kbd className="px-1 py-0.5 font-mono text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 rounded">S</kbd> mở Cài đặt rồi bật <strong>Chế độ Mượt (Fix Lag)</strong>).
                    - Hệ thống sẽ ngay lập tức vô hiệu hóa particle background, tắt chuyển động phức tạp, tối ưu lại các tiến trình chạy ngầm. Giảm tải RAM, CPU tức thì để mày tha hồ ôn từ vựng mướt rượt!
                  </p>
                </div>

                {/* Font Size Section */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Sliders className="w-5 h-5 text-cyan-500" />
                    <span>ĐIỀU CHỈNH CỠ CHỮ LINH HOẠT</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-medium">
                    Mỗi người có một khẩu vị đọc chữ khác nhau. Có người thích to rõ ràng, có người thích thanh mảnh, trực quan.
                    <br />
                    <strong className="text-white block mt-2">👉 Phương pháp:</strong>
                    - Hãy nhấn <kbd className="px-1 py-0.5 font-mono text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 rounded">S</kbd> để kéo thanh zoom slider cỡ chữ. 
                    - Henosis áp dụng <strong>Cơ chế Phóng To Tỉ Lệ Bản Vị Động</strong>, tự dãn rộng mọi paddings, margins, components tương xứng 100% tỉ lệ vàng chứ không chỉ thô bạo tăng size chữ, đảm bảo UI UX của mày lúc nào cũng đỉnh cao mỹ thuật.
                  </p>
                </div>

                {/* Modules Guide */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-500 font-bold">
                    <Compass className="w-5 h-5 text-amber-500" />
                    <span>LÀM CHỦ CÁC MODULE CHỦ CHỐT</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                    <div className="space-y-1.5 p-3 rounded-xl bg-stone-900/40 border border-stone-850">
                      <span className="text-yellow-500 font-display font-black block">🏆 Leaderboard (Bảng Xếp Hạng)</span>
                      <p className="text-stone-400 text-[11px] leading-relaxed">
                        Nơi tôn vinh bảng vàng tuần. Mày siêng năng học Flashcard, rèn Quiz, điểm XP sẽ nhảy vọt đưa mày bay thẳng lên Top 3 được bao bọc bởi vòng sáng hoàng kim.
                      </p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-xl bg-stone-900/40 border border-stone-850">
                      <span className="text-indigo-400 font-display font-black block">🌳 Skill Tree (Cây Bản Đồ Lộ Trình)</span>
                      <p className="text-stone-400 text-[11px] leading-relaxed">
                        Khác với học vẹt thông thường, mày sẽ mở khóa rẽ nhánh các tri thức Stoicism, ngoại ngữ, phát triển bản thân theo độ thông thạo tăng dần của các bộ thẻ.
                      </p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-xl bg-stone-900/40 border border-stone-850">
                      <span className="text-purple-400 font-display font-black block">🍿 Study Room (Cinematic & CoStudy)</span>
                      <p className="text-stone-400 text-[11px] leading-relaxed">
                        Nghệ thuật chìm đắm! Cinematic Room ôm trọn màn hình với mưa đêm Cyberpunk rơi, nhạc lof, tiếng gõ phím lách cách; còn CoStudy là chỗ mày kéo bạn bè vào lập bàn cày chung.
                      </p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-xl bg-stone-900/40 border border-stone-850">
                      <span className="text-blue-400 font-display font-black block">👤 Profile & Achievements (Hồ Sơ & Danh Hiệu)</span>
                      <p className="text-stone-400 text-[11px] leading-relaxed">
                        Tải ảnh chân dung nén siêu tốc bằng Canvas Base64, đổi danh xưng rực lửa, cùng với kho Huân chương kỷ luật sắt đang chờ mày mở khóa.
                      </p>
                    </div>
                    <div className="space-y-1.5 p-3 rounded-xl bg-stone-900/40 border border-stone-850 md:col-span-2">
                      <span className="text-emerald-400 font-display font-black block">📊 Chart & Mastery Analytics (Biểu Đồ & Thống Kê Nhiệt)</span>
                      <p className="text-stone-400 text-[11px] leading-relaxed">
                        Hiển thị biểu đồ bong bóng phân bổ XP thông thạo thẻ cùng Heatmap lịch biểu học. Nó ghi nhận streak ngày mệt mỏi nhất của mày, đừng để chuỗi ngày học bị phai màu!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubTab === "engine" && (
              <motion.div
                key="engine-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {/* Intro */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 rounded-xl">
                      <BrainCircuit className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="text-md font-display font-black text-white">
                        V3 Unified Ingestion Engine - Đột Phá AI Bóc Tách Thẻ Học
                      </h4>
                      <p className="text-xs text-stone-400">Thiết kế 3 pipeline thế hệ mới, tối ưu hóa triệt để tài nguyên</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-stone-300 leading-relaxed font-medium">
                    Hệ thống trích xuất thẻ học thông minh Henosis tích hợp ba luồng nhập cực đỉnh: nạp tệp File (PDF học thuật, ảnh chụp trang sách, .txt), nhập văn bản tự do, hoặc import trực tiếp chuỗi JSON thô được kết xuất từ các ứng dụng khác. 
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black text-yellow-500 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-yellow-500 shrink-0" />
                        ⚙️ Cơ Chế "Micro-Slicing"
                      </div>
                      <p className="text-[11px] text-stone-400 leading-relaxed">
                        Tài liệu của mày quá dài? AI sẽ tự bẻ nhỏ, cắt mỏng tài liệu (Slicing) thành từng phân đoạn tối ưu chính xác theo kích thước <strong>Context Window</strong> của AI Model. Đảm bảo mô hình AI phân tích đầy đủ, không bị "mất trí nhớ", mất từ, hoặc phản hồi cẩu thả, bỏ sót thông tin cốt lõi.
                      </p>
                    </div>

                    <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black text-cyan-400 uppercase tracking-wider">
                        <Cpu className="w-4 h-4 text-cyan-500 shrink-0" />
                        ⚡ Concurrency Multi-Thread
                      </div>
                      <p className="text-[11px] text-stone-400 leading-relaxed">
                        Khi nạp tệp dung lượng lớn, hệ thống mồi ngòi bóc tách song song đa luồng (Multi-threading). Kết hợp chặt chẽ với hàng chục API keys luân chuyển tự động trong cụm cân bằng tải (Round-Robin), giúp tạo ra hàng trăm thẻ học trong nháy mắt mà không bao giờ lo dính lỗi hạn chế băng thông!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stoic Quote Footer */}
                <div className="text-center italic text-stone-500 text-[10px] uppercase font-bold tracking-wider">
                  "Chất lượng trí tuệ của mày sẽ phụ thuộc vào hành trình tích lũy mẩu kiến thức này từng ngày" — Marcus Aurelius
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-4 bg-stone-950 dark:bg-black/40 border-t border-stone-800 flex justify-between items-center text-xs shrink-0">
          <span className="text-stone-500 font-mono text-[10px] uppercase font-bold">
            💡 Gợi ý: Nhấn phím <kbd className="px-1.5 py-0.5 bg-stone-800 text-stone-300 border border-stone-700 rounded text-[9px] font-mono">?</kbd> để đóng nhanh bảng này
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-stone-950 font-black transition-transform active:scale-95 shadow-md flex items-center gap-1.5"
          >
            Đã Hiểu, Chiến Tiếp!
          </button>
        </div>
      </motion.div>
    </div>
  );
}
