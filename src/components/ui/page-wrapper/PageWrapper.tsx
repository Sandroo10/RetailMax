import type { ReactNode } from "react";
import Container from "@/components/layout/Container";

interface PageWrapperProps {
  hero?: ReactNode;
  children: ReactNode;
}

const PageWrapper = ({ hero, children }: PageWrapperProps) => {
  return (
    <main className="pb-8 pt-6 sm:pt-8">
      {hero ? (
        <Container as="section" className="mb-8">
          {hero}
        </Container>
      ) : null}
      <Container as="section">{children}</Container>
    </main>
  );
};

export default PageWrapper;
