import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <AnimatedPage className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">
          Página não encontrada: {location.pathname}
        </p>
        <a href="/" className="text-primary hover:underline">
          Voltar ao início
        </a>
      </div>
    </AnimatedPage>
  );
};

export default NotFound;
