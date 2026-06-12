import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle, X, ChevronRight, ChevronLeft, ShieldCheck, Zap, Terminal } from "lucide-react";

interface StepConfig {
  title: string;
  description: string;
  targetSelector: string;
  icon?: React.ReactNode;
}

interface InteractiveTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export function InteractiveTutorial({ isOpen, onClose, activeTab, setActiveTab }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const steps: StepConfig[] = [
    {
      title: "🛡️ Anonymous Session Security",
      description: "Ứng dụng tự động thiết lập một phiên làm việc ẩn danh (Anonymous) cực kỳ bảo mật với cơ sở dữ liệu Firebase. Mày không cần tạo tài khoản rườm rà vẫn đồng bộ dữ liệu siêu tốc!",
      targetSelector: '[data-tour="step-1"]',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500 animate-pulse" />
    },
    {
      title: "⚡ High-Availability API Cluster Balancer",
      description: "Hệ thống sử dụng cơ chế Cross-Provider Interleaved Round-Robin cân bằng tải tự phản ứng trên cụm Gemini, OpenRouter, DeepInfra với hơn 20 hot key, tự ngắt mạch (Circuit Breaker) khi nghẽn mạng!",
      targetSelector: '[data-tour="step-2"]',
      icon: <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
    },
    {
      title: "⚙️ Micro-Slicing & Thread Controls",
      description: "Đây là đầu não phân nhỏ tài liệu để vừa vặn với Context Window của AI Model. Mày có thể tinh chỉnh số Từ hoặc Kí tự tối đa cho mỗi mẩu dữ liệu nhỏ và bật tối đa luồng chạy song song để tăng tốc bóc tách thẻ!",
      targetSelector: '[data-tour="step-3"]',
      icon: <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
    },
    {
      title: "📂 Ingestion Engine Portal",
      description: "Cổng tải lên bài vở hoặc dán chữ thô của mày. App hỗ trợ bóc tách mượt mà hầu hết định dạng bài viết thông dụng, file PDF học thuật, ảnh chụp trang sách hoặc dán trực tiếp text thô.",
      targetSelector: '[data-tour="step-4"]',
      icon: <HelpCircle className="w-6 h-6 text-indigo-500 animate-pulse" />
    },
    {
      title: "💻 Dynamic Structural Log Terminal",
      description: "Màn hình Terminal theo dõi tiến trình bóc tách thẻ học thời gian thực, hiển thị đầy đủ thông số lỗi, thành công hoặc tỷ lệ lọc thẻ trùng lặp cực kỳ trực quan.",
      targetSelector: '[data-tour="step-5"]',
      icon: <Terminal className="w-6 h-6 text-yellow-500 animate-pulse" />
    }
  ];

  // Helper to highlight tabs if necessary before proceeding to make targets visible
  useEffect(() => {
    if (!isOpen) return;
    
    // Step 1: needs user info header
    // Step 2, 3, 4, 5: needs the "create_deck" tab active
    if (currentStep >= 1 && currentStep <= 4) {
      if (activeTab !== "create_deck") {
        setActiveTab("create_deck");
      }
    }
  }, [currentStep, isOpen, activeTab, setActiveTab]);

  const updateCoords = () => {
    if (!isOpen) {
      setCoords(null);
      return;
    }

    const step = steps[currentStep];
    if (!step) return;

    // Retry finding element if it takes a tiny moment to render
    const attemptFind = (retries = 0) => {
      const el = document.querySelector(step.targetSelector);
      if (el) {
        const rect = el.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
      } else {
        if (retries < 5) {
          setTimeout(() => attemptFind(retries + 1), 150);
        } else {
          setCoords(null); // Fallback to centered modal
        }
      }
    };

    attemptFind();
  };

  useEffect(() => {
    // Delay slightly to wait for DOM and tab transition animations
    const timer = setTimeout(updateCoords, 300);
    return () => clearTimeout(timer);
  }, [currentStep, isOpen, activeTab]);

  useEffect(() => {
    const handleResizeOrScroll = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(updateCoords, 100);
    };

    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll);
    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div id="tutorial-overlay-container" className="fixed inset-0 z-50 pointer-events-auto">
      {/* Dimmed backdrop background using custom SVG-like cutout overlay */}
      <AnimatePresence>
        {coords ? (
          <div 
            className="fixed inset-0 bg-stone-950/70 dark:bg-black/80 transition-all duration-300 pointer-events-auto"
            style={{
              clipPath: `polygon(
                0% 0%, 
                0% 100%, 
                ${coords.left}px 100%, 
                ${coords.left}px ${coords.top}px, 
                ${coords.left + coords.width}px ${coords.top}px, 
                ${coords.left + coords.width}px ${coords.top + coords.height}px, 
                ${coords.left}px ${coords.top + coords.height}px, 
                ${coords.left}px 100%, 
                100% 100%, 
                100% 0%
              )`
            }}
          />
        ) : (
          <div className="fixed inset-0 bg-stone-950/75 dark:bg-black/85 backdrop-blur-xs transition-all pointer-events-auto" />
        )}
      </AnimatePresence>

      {/* Pulsing spotlight container around highlited target */}
      {coords && (
        <div
          className="absolute border-2 border-yellow-500 rounded-xl pointer-events-none transition-all duration-300 shadow-[0_0_25px_rgba(234,179,8,0.4)] animate-pulse z-40"
          style={{
            top: coords.top - 4,
            left: coords.left - 4,
            width: coords.width + 8,
            height: coords.height + 8,
          }}
        />
      )}

      {/* Floating Tooltip card */}
      <div 
        className="fixed z-50 flex items-center justify-center p-4 transition-all duration-300"
        style={
          coords 
            ? {
                top: coords.top + coords.height + 20 + (coords.top + coords.height + 300 > window.innerHeight ? -coords.height - 280 : 0),
                left: Math.max(16, Math.min(window.innerWidth - 380, coords.left + coords.width/2 - 170)),
                width: "340px",
                position: "absolute"
              }
            : {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "360px"
              }
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-stone-900 border border-stone-800 dark:bg-zinc-950 dark:border-zinc-800 text-stone-100 rounded-2xl p-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)] space-y-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-stone-800 dark:bg-zinc-900 border border-stone-700/60 dark:border-zinc-800">
                {currentStepData.icon}
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-yellow-500 font-extrabold uppercase tracking-wider">
                  BƯỚC {currentStep + 1} / {steps.length}
                </span>
                <h4 className="text-sm font-black leading-tight tracking-tight text-neutral-100">
                  {currentStepData.title}
                </h4>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition"
              title="Đóng Hướng Dẫn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-stone-300 leading-relaxed font-sans font-medium">
            {currentStepData.description}
          </p>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white text-xs font-bold transition hover:underline"
            >
              Bỏ qua
            </button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200 transition-transform active:scale-95 flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Trước
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-stone-950 text-xs font-black transition-transform active:scale-95 shadow-md flex items-center gap-1"
              >
                {isLastStep ? "Hoàn thành" : "Tiếp theo"}{" "}
                <ChevronRight className="w-3.5 h-3.5 font-bold" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
