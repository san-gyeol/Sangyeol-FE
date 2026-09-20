interface WorkingOnControlBadgeProps {
  /** 배지 문구. 서버 라벨(statusName)을 그대로 넘긴다 */
  label?: string;
}

const WorkingOnControlBadge = ({
  label = "운영 중",
}: WorkingOnControlBadgeProps) => {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-green-700 bg-green-600 px-2.5 py-1.5">
      <span className="size-1.5 shrink-0 rounded-full bg-green-700" />
      <span className="text-xs font-medium text-primary">{label}</span>
    </div>
  );
};

export default WorkingOnControlBadge;
