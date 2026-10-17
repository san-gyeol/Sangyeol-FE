"use client";

import useRouteToExternalWebviewBridge from "@shared/hooks/domain/bridge/useRouteToExternalWebviewBridge";
import BellIcon from "@icons/BellIcon";
import ChevronRightIcon from "@icons/ChevronRightIcon";
import FileTextIcon from "@icons/FileTextIcon";
import InfoIcon from "@icons/InfoIcon";
import MailIcon from "@icons/MailIcon";
import MessageCircleIcon from "@icons/MessageCircleIcon";
import PencilIcon from "@icons/PencilIcon";
import SafeArea from "@shared/components/primitives/layout/SafeArea";
import { PropsWithChildren, ReactNode } from "react";

const ETCPage = () => {
  const routeToExternalWebview = useRouteToExternalWebviewBridge();

  const handleClickServiceTerms = () => {
    routeToExternalWebview(
      "https://app.notion.com/p/2025-12-30-2d9ec90d98fc808392e3fe653e745dfa?source=copy_link",
    );
  };

  const handleClickKakaoInquiry = () => {
    routeToExternalWebview("https://pf.kakao.com/_xaSumX/chat");
  };

  return (
    <div className="min-h-dvh bg-gray-300">
      <SafeArea>
        <div className="flex flex-col gap-6 px-5 pt-4 pb-6">
          <header className="flex w-full flex-col gap-1 py-1">
            <h1 className="text-2xl font-bold tracking-[-0.4px] text-black-900">
              더보기
            </h1>
            <p className="text-sm font-normal text-gray-900">
              산결을 더 편하게 이용해 보세요
            </p>
          </header>

          <InfoSection label="고객지원">
            <InfoRow
              icon={<MailIcon size={ICON_SIZE} />}
              title="메일"
              value="sangyeolofficial@gmail.com"
            />
            <Divider />
            <InfoRow
              icon={<MessageCircleIcon size={ICON_SIZE} />}
              title="카카오톡 1:1 문의하기"
              trailing={<RowChevron />}
              onClick={handleClickKakaoInquiry}
            />
            <Divider />
            <InfoRow
              icon={<PencilIcon size={ICON_SIZE} />}
              title="피드백 남기기"
              trailing={<RowChevron />}
            />
          </InfoSection>

          <InfoSection label="알림 설정">
            <InfoRow
              icon={<BellIcon size={ICON_SIZE} />}
              title="알림"
              value="푸시 알림 받기"
              trailing={<Toggle />}
            />
          </InfoSection>

          <InfoSection label="약관·정보">
            <InfoRow
              icon={<FileTextIcon size={ICON_SIZE} />}
              title="서비스 이용약관"
              trailing={<RowChevron />}
              onClick={handleClickServiceTerms}
            />
            <Divider />
            <InfoRow
              icon={<InfoIcon size={ICON_SIZE} />}
              title="버전정보"
              trailing={
                // TODO: 버전정보를 env에서 동적으로 가져오도록 수정 필요
                <span className="text-base font-medium text-gray-900">
                  1.0.0
                </span>
              }
            />
          </InfoSection>
        </div>
      </SafeArea>
    </div>
  );
};

interface SectionProps {
  label: string;
}

const InfoSection = ({ label, children }: PropsWithChildren<SectionProps>) => {
  return (
    <section className="flex w-full flex-col gap-2.5">
      <h2 className="text-sm font-semibold tracking-[0.2px] text-gray-900">
        {label}
      </h2>
      <div className="flex w-full flex-col overflow-hidden rounded-[15px] bg-main-white px-3.5 py-0.5">
        {children}
      </div>
    </section>
  );
};

const ICON_SIZE = 15;

const Divider = () => {
  return <div className="h-px w-full shrink-0 bg-gray-600 opacity-70" />;
};

const RowChevron = () => {
  return (
    <ChevronRightIcon size={ICON_SIZE} className="shrink-0 text-gray-900" />
  );
};

const Toggle = () => {
  return (
    <div className="flex h-6.5 w-11 shrink-0 flex-row items-center justify-end rounded-full bg-primary p-[3px]">
      <div className="size-5 shrink-0 rounded-full bg-main-white" />
    </div>
  );
};

interface InfoRowProps {
  icon: ReactNode;
  title: string;
  value?: string;
  trailing?: ReactNode;
  onClick?: () => void;
}

const InfoRow = ({ icon, title, value, trailing, onClick }: InfoRowProps) => {
  return (
    <div
      className="flex h-13 w-full shrink-0 flex-row items-center gap-2.5"
      onClick={onClick}
    >
      <div className="flex size-7.5 shrink-0 items-center justify-center rounded-lg bg-gray-300 text-black-800">
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium text-black-900">{title}</span>
        {value && (
          <span className="text-xs font-normal text-gray-900">{value}</span>
        )}
      </div>
      {trailing}
    </div>
  );
};

export default ETCPage;
