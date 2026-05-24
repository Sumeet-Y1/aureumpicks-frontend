import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";

function NotFound() {
  return (
    <PageWrapper>
      <section className="section-space">
        <div className="container-shell flex min-h-[60vh] flex-col items-center justify-center text-center">
          <p className="font-serif text-8xl tracking-wide text-gold">404</p>
          <h1 className="mt-6 font-serif text-5xl tracking-wide text-white">Page Not Found</h1>
          <p className="mt-4 max-w-xl text-base font-light leading-8 text-muted">
            The page you are looking for has stepped out of the private salon.
          </p>
          <div className="mt-8">
            <Button as={Link} to="/" variant="primary">
              Return Home
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default NotFound;
