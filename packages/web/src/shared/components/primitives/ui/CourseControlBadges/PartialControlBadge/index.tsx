interface PartialControlBadgeProps {
  /** 배지 문구. 서버 라벨(statusName)을 그대로 넘긴다 */
  label?: string;
}

const PartialControlBadge = ({
  label = "부분통제",
}: PartialControlBadgeProps) => {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-error bg-error/10 px-2.5 py-1.5">
      <span className="size-1.5 shrink-0 rounded-full bg-error" />
      <span className="text-xs font-medium text-error">{label}</span>
    </div>
  );
};

export default PartialControlBadge;
