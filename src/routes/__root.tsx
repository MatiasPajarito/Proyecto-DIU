import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { GraduationCap } from "lucide-react";

import appCss from "../index.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; onLogout?: () => void }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mesa de Servicios 360 · USM" },
      { name: "description", content: "Sistema de reportes universitarios Proactivanet USM" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  
  // 🔐 CONTROL DE SESIÓN SIMULADA
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [email, setEmail] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      {/* El Outlet SIEMPRE se ejecuta de fondo para que no colapse el framework */}
      {/* "context" no está tipado en esta versión, casteamos para evitar error TS2322 */}
      <Outlet {...( { context: { onLogout: () => setIsLoggedIn(false) } } as any)} />

      {/* 🚪 CAPA SUPERIOR: Si cierra sesión, metemos el Login encima de todo tapando el Dashboard */}
      {!isLoggedIn && (
        <div className="fixed inset-0 z-9999 bg-[#001b33] flex items-center justify-center p-4 antialiased font-sans">
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-sm w-full">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold mb-3 shadow-md">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Mesa de Servicios 360</h1>
              <p className="text-xs text-muted-foreground mt-1">Inicia sesión con tu cuenta institucional USM</p>
            </div>

            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                setIsLoggedIn(true); 
              }} 
              className="space-y-4"
            >
              <div className="space-y-1 text-left">
                {/* Esta es la etiqueta fija que nunca se pierde */}
                <label 
                  htmlFor="email" 
                  className="block text-xs font-bold text-muted-foreground uppercase tracking-wider"
                >
                  Correo Electrónico
                </label>
                
                {/* Este es el campo donde el usuario escribe, con el ejemplo actualizado */}
                <input
                  id="email"
                  type="email"
                  placeholder="nombre.apellido@usm.cl"
                  onChange={(e) => setEmail(e.target.value)} // Asegúrate de mantener tu lógica de estado aquí
                  className="w-full px-4 py-2 mt-1 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Contraseña
                </label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm mt-2"
              >
                Ingresar con Microsoft O365
              </button>
            </form>
          </div>
        </div>
      )}
    </QueryClientProvider>
  );
}