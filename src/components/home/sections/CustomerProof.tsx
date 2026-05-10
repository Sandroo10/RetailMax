import { Send, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CustomerProof = () => {
  const { t } = useTranslation();
  const reviews = [
    {
      initials: "AM",
      quote: t("home.review1Quote"),
      name: t("home.review1Name"),
      detail: t("home.review1Detail"),
    },
    {
      initials: "DK",
      quote: t("home.review2Quote"),
      name: t("home.review2Name"),
      detail: t("home.review2Detail"),
    },
    {
      initials: "LS",
      quote: t("home.review3Quote"),
      name: t("home.review3Name"),
      detail: t("home.review3Detail"),
    },
  ];

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <article
            className="rounded-lg border border-border/80 bg-surface-1 p-5 shadow-soft transition duration-180 hover:-translate-y-1 hover:shadow-lift"
            key={review.name}
          >
            <div className="mb-4 flex items-center gap-1 text-brand">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  className="h-4 w-4 fill-brand"
                  key={`${review.name}-${index}`}
                />
              ))}
            </div>
            <p className="text-base font-semibold leading-7 text-foreground">
              {review.quote}
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-border/80 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-primary-foreground">
                {review.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted-foreground">{review.detail}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg border border-border/80 bg-surface-1 p-6 text-center shadow-soft sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--brand)/0.12),transparent_38%),linear-gradient(315deg,hsl(var(--success)/0.1),transparent_34%)]" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            {t("footer.newsletter")}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            {t("home.newsletterTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            {t("home.newsletterDescription")}
          </p>
          <form
            className="mx-auto mt-6 flex max-w-lg flex-col gap-2 rounded-lg border border-border/80 bg-surface-1 p-2 shadow-soft sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <Input
              aria-label={t("footer.newsletterAria")}
              className="border-transparent shadow-none"
              placeholder={t("footer.newsletterPlaceholder")}
              type="email"
            />
            <Button
              aria-label={t("footer.newsletterSubmitAria")}
              className="shrink-0"
              type="submit"
              variant="primary"
            >
              <Send className="h-4 w-4" />
              {t("home.newsletterCta")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CustomerProof;
