import PageWrapper from "@/components/ui/page-wrapper/PageWrapper";
import { subtitle, title } from "./NotFoundPage.styles";

const NotFoundPage = () => {
  return (
    <PageWrapper hero={<h1 className={title()}>Page not found</h1>}>
      <p className={subtitle()}>The page you requested does not exist.</p>
    </PageWrapper>
  );
};

export default NotFoundPage;
