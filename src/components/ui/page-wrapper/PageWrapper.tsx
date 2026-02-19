import type { ReactNode } from "react";
import { container, contentSection, heroSection } from "./PageWrapper.styles";

interface PageWrapperProps {
  hero: ReactNode;
  children: ReactNode;
}

const PageWrapper = ({ hero, children }: PageWrapperProps) => {
  return (
    <main className={container()}>
      <section className={heroSection()}>{hero}</section>
      <section className={contentSection()}>{children}</section>
    </main>
  );
};

export default PageWrapper;
