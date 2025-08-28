type LinedProps = {
  gap?: number; // 줄 간격(px)
  lineColor?: string; // 줄 색
  className?: string;
  children?: React.ReactNode;
};

/**
 * 줄노트 스타일의 div 컨테이너 컴포넌트입니다.
 *
 * 지정한 줄 간격(gap)과 줄 색(lineColor)에 맞춰
 * 선이 일정 간격으로 반복되는 배경을 렌더링합니다.
 * 내부에 자식 요소(children)를 자유롭게 배치할 수 있습니다.
 *
 * @component
 * @example
 * // 기본 사용
 * <LinedPaper>
 *   <p>여기에 내용을 작성하세요.</p>
 * </LinedPaper>
 *
 * @example
 * // 간격과 색상 커스터마이징
 * <LinedPaper gap={30} lineColor="#d1d5db" className="shadow-lg">
 *   <h1>제목</h1>
 *   <p>본문 내용</p>
 * </LinedPaper>
 *
 * @param {Object} props - LinedPaper 컴포넌트의 속성
 * @param {number} [props.gap=26] - 줄 간격(px). 값이 커질수록 줄 사이 여백이 넓어집니다.
 * @param {string} [props.lineColor='#e5e7eb'] - 줄 색상(hex, rgb 등 CSS 색상 형식).
 * @param {string} [props.className] - TailwindCSS 또는 추가 커스텀 CSS 클래스.
 * @param {React.ReactNode} [props.children] - 컴포넌트 내부에 렌더링할 콘텐츠.
 */
const NoteBackground = ({
  gap = 26,
  lineColor = '#e5e7eb',
  className = '',
  children,
}: LinedProps) => {
  const style: React.CSSProperties = {
    backgroundImage: `linear-gradient(to bottom, transparent calc(100% - 1px), ${lineColor} 0)`,
    backgroundSize: `100% ${gap}px`,
    backgroundRepeat: 'repeat-y',
    backgroundColor: '#fff',
  };
  return (
    <div className={`w-full rounded-2xl p-6 ${className}`} style={style}>
      {children}
    </div>
  );
};
export default NoteBackground;
