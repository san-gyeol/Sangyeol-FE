interface FullControlBadgeProps {
  /** 배지 문구. 서버 라벨(statusName)을 그대로 넘긴다 */
  label?: string;
}

const FullControlBadge = ({ label = "전면통제" }: FullControlBadgeProps) => {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-error bg-error px-2.5 py-1.5">
      <span className="size-1.5 shrink-0 rounded-full bg-main-white" />
      <span className="text-xs font-medium text-main-white">{label}</span>
    </div>
  );
};

export default FullControlBadge;
