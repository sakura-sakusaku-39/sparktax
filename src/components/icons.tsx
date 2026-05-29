/**
 * Vite版で使っていた lucide-react 相当のアイコンを、
 * 自作 SVG コンポーネントとして集約。
 * 依存追加を避け、Next.js / Tailwind だけで動かすため。
 */

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChevronLeft(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
export function ChevronRight(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
export function Sparkles(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
      <path d="M19 13l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
    </svg>
  );
}
export function Receipt(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="12" y2="16" />
    </svg>
  );
}
export function Lock(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 1 1 8 0v4" />
    </svg>
  );
}
export function Camera(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
export function ImagePlus(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M21 12V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
      <path d="M16 5h6M19 2v6" />
      <circle cx="9" cy="9" r="2" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}
export function CheckCircle(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 12 15 16 10" />
    </svg>
  );
}
export function XIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
export function Bell(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16z" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  );
}
export function ListFilter(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  );
}
export function Trash(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
export function Search(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
export function FileText(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );
}
export function HelpCircle(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
export function Mail(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}
export function Inbox(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
    </svg>
  );
}
export function Shield(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6z" />
    </svg>
  );
}
export function Database(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
    </svg>
  );
}
export function Clipboard(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}
export function User(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
export function LogOut(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
export function Loader2(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...p}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

/** Apple ロゴ (塗りつぶし) */
export function Apple(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.18-1.18 2.99-.85.93-2.21 1.65-3.36 1.55-.13-1.1.43-2.27 1.18-3.06.85-.91 2.27-1.6 3.36-1.48zM20.5 17.36c-.55 1.27-1.18 2.5-2.18 3.55-.86.91-2.05 2.06-3.46 2.07-1.4.01-1.86-.83-3.46-.83-1.6 0-2.11.81-3.45.85-1.34.04-2.36-1.06-3.23-1.97-1.78-1.86-3.14-5.27-1.31-7.6 1.05-1.34 2.66-2.18 4.4-2.21 1.36-.03 2.67.92 3.46.92.79 0 2.42-1.13 4.07-.96.69.03 2.61.28 3.85 2.11-3.32 1.83-2.78 6.27-.69 8.07z" />
    </svg>
  );
}

/** Google ロゴ (4 色) */
export function Google({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

/** LINE ロゴ */
export function Line({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63h-1.755v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63h-1.755v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

