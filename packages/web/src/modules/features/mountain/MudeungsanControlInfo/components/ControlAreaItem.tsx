import type { ControlStatus } from "api";
import SwitchCase from "@shared/components/composites/SwitchCase";
import FullControlBadge from "@shared/components/primitives/ui/CourseControlBadges/FullControlBadge";
import PartialControlBadge from "@shared/components/primitives/ui/CourseControlBadges/PartialControlBadge";
import PreparingControlBadge from "@shared/components/primitives/ui/CourseControlBadges/PreparingControlBadge";
import WorkingOnControlBadge from "@shared/components/primitives/ui/CourseControlBadges/WorkingOnControlBadge";
import MapPinIcon from "@shared/components/primitives/ui/icons/MapPinIcon";

interface ControlAreaItemProps {
  name: string;
  /** 통제 상태 코드. 없으면(로딩/에러) 준비 중 배지를 표시한다 */
  status?: ControlStatus;
  /** 서버가 내려주는 상태 한글명. 배지 문구로 그대로 표시한다 */
  statusName?: string;
  onClick: () => void;
}

const ControlAreaItem = ({
  name,
  status,
  statusName,
  onClick,
}: ControlAreaItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left"
    >
      <div className="flex items-center gap-2">
        <MapPinIcon size={14} className="text-gray-900" />
        <p className="text-sm font-medium text-black-900">{name}</p>
      </div>
      <SwitchCase
        value={status}
        caseBy={{
          NORMAL: <WorkingOnControlBadge label={statusName} />,
          PARTIAL: <PartialControlBadge label={statusName} />,
          FULL: <FullControlBadge label={statusName} />,
        }}
        defaultComponent={<PreparingControlBadge />}
      />
    </button>
  );
};

export default ControlAreaItem;
