"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Moon,
  Sun,
  Bell,
  Info,
  Settings,
  User,
  Menu,
  Mail,
  Search,
  Globe,
  CheckCircle,
  AlertCircle,
  Heart,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";

interface SearchResult {
  key: string;
  value: string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Shadcn UI Components",
    welcome: "Welcome!",
    welcomeDesc:
      "This is a showcase of Shadcn UI components in Next.js with Tailwind CSS.",
    components: "Components",
    instructions: "Instructions",
    cardTitle: "Card Component",
    cardDesc: "A versatile container for content",
    cardContent: "Cards can contain various components and content.",
    action: "Action",
    actionSuccess: "Card action completed successfully!",
    actionDesc: "Your card action has been processed",
    dialogTitle: "Dialog Component",
    dialogDesc: "For important interactions",
    openDialog: "Open Dialog",
    dialogExample: "Dialog Example",
    dialogExampleDesc:
      "This is an example of the Dialog component from Shadcn UI.",
    dialogContent:
      "Dialog content goes here. You can add forms or any other content.",
    saveChanges: "Save Changes",
    changesSaved: "Changes saved!",
    dialogActionDesc: "Your dialog actions were processed",
    hoverTitle: "HoverCard Component",
    hoverDesc: "Preview content on hover",
    hoverMe: "Hover Me",
    hoverPreview: "HoverCard Preview",
    hoverContent:
      "This component shows additional information on hover without requiring a click.",
    inputTitle: "Input Component",
    inputDesc: "With Button integration",
    emailPlaceholder: "Enter your email...",
    subscribe: "Subscribe",
    pleaseEnterEmail: "Please enter an email address",
    subscribed: "Subscribed successfully!",
    updatesWillBeSent: "Updates will be sent to",
    openSheet: "Open Sheet",
    sheetTitle: "Sheet Component",
    sheetDesc: "This is a side panel that slides in from the edge.",
    profile: "Profile",
    profileSelected: "Profile selected",
    settings: "Settings",
    settingsOpened: "Settings opened",
    messages: "Messages",
    messagesOpened: "Messages opened",
    howToUse: "How to Use",
    howToUseDesc: "Instructions for working with these components",
    instructionsContent:
      "This template showcases various Shadcn UI components that you can use in your Next.js application:",
    alert: "Alert - For important notifications",
    button: "Button - Various button styles and variants",
    card: "Card - Flexible content containers",
    dialog: "Dialog - Modal interactions",
    dropdown: "DropdownMenu - For selection menus",
    hovercard: "HoverCard - Preview content on hover",
    input: "Input - Text input fields",
    sheet: "Sheet - Side panels",
    sonner: "Sonner - Toast notifications",
    tabs: "Tabs - Organize content in tabs",
    tryToast: "Try Toast Notification",
    customization: "Customization tip",
    customizationDesc: "All components can be styled with Tailwind classes",
    search: "Search...",
    searchResults: "Search results will appear here",
    english: "English",
    spanish: "Spanish",
    language: "Language",
    noResults: "No results found",
    searching: "Searching...",
  },
  es: {
    title: "Componentes de Shadcn UI",
    welcome: "¡Bienvenido!",
    welcomeDesc:
      "Este es un showcase de componentes Shadcn UI en Next.js con Tailwind CSS.",
    components: "Componentes",
    instructions: "Instrucciones",
    cardTitle: "Componente Card",
    cardDesc: "Un contenedor versátil para contenido",
    cardContent: "Las tarjetas pueden contener varios componentes y contenido.",
    action: "Acción",
    actionSuccess: "¡Acción de tarjeta completada con éxito!",
    actionDesc: "Tu acción de tarjeta ha sido procesada",
    dialogTitle: "Componente Dialog",
    dialogDesc: "Para interacciones importantes",
    openDialog: "Abrir Diálogo",
    dialogExample: "Ejemplo de Diálogo",
    dialogExampleDesc: "Este es un ejemplo del componente Dialog de Shadcn UI.",
    dialogContent:
      "El contenido del diálogo va aquí. Puedes añadir formularios u otro contenido.",
    saveChanges: "Guardar Cambios",
    changesSaved: "¡Cambios guardados!",
    dialogActionDesc: "Tus acciones de diálogo fueron procesadas",
    hoverTitle: "Componente HoverCard",
    hoverDesc: "Vista previa al pasar el cursor",
    hoverMe: "Pasa sobre mí",
    hoverPreview: "Vista previa de HoverCard",
    hoverContent:
      "Este componente muestra información adicional al pasar el cursor sin requerir un clic.",
    inputTitle: "Componente Input",
    inputDesc: "Con integración de botones",
    emailPlaceholder: "Ingresa tu correo...",
    subscribe: "Suscribirse",
    pleaseEnterEmail: "Por favor ingresa una dirección de correo",
    subscribed: "¡Suscrito con éxito!",
    updatesWillBeSent: "Las actualizaciones serán enviadas a",
    openSheet: "Abrir Panel",
    sheetTitle: "Componente Sheet",
    sheetDesc: "Este es un panel lateral que se desliza desde el borde.",
    profile: "Perfil",
    profileSelected: "Perfil seleccionado",
    settings: "Configuración",
    settingsOpened: "Configuración abierta",
    messages: "Mensajes",
    messagesOpened: "Mensajes abiertos",
    howToUse: "Cómo Usar",
    howToUseDesc: "Instrucciones para trabajar con estos componentes",
    instructionsContent:
      "Esta plantilla muestra varios componentes de Shadcn UI que puedes usar en tu aplicación Next.js:",
    alert: "Alert - Para notificaciones importantes",
    button: "Button - Varios estilos y variantes de botones",
    card: "Card - Contenedores de contenido flexibles",
    dialog: "Dialog - Interacciones modales",
    dropdown: "DropdownMenu - Para menús de selección",
    hovercard: "HoverCard - Vista previa al pasar el cursor",
    input: "Input - Campos de entrada de texto",
    sheet: "Sheet - Paneles laterales",
    sonner: "Sonner - Notificaciones toast",
    tabs: "Tabs - Organiza contenido en pestañas",
    tryToast: "Probar Notificación Toast",
    customization: "Consejo de personalización",
    customizationDesc:
      "Todos los componentes se pueden estilizar con clases de Tailwind",
    search: "Buscar...",
    searchResults: "Los resultados de búsqueda aparecerán aquí",
    english: "Inglés",
    spanish: "Español",
    language: "Idioma",
    noResults: "No se encontraron resultados",
    searching: "Buscando...",
  },
};

export default function Home() {
  const { setTheme } = useTheme();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      const results = Object.keys(translations[language])
        .filter((key) =>
          translations[language][key]
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .map((key) => ({
          key,
          value: translations[language][key],
        }));

      setSearchResults(results.slice(0, 5));
      setIsSearching(false);
    }, 500);
  };

  type ToastType = "default" | "success" | "error" | "info";

  const showToast = (
    id: string | number,
    title: string,
    description: string,
    type: ToastType = "default",
    icon: JSX.Element | null = null
  ): void => {
    toast.dismiss();

    switch (type) {
      case "success":
        toast.success(title, { id, description, icon });
        break;
      case "error":
        toast.error(title, { id, description, icon });
        break;
      case "info":
        toast.info(title, { id, description, icon });
        break;
      default:
        toast(title, { id, description, icon });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-background">
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {t("title")} ✨
        </h1>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t("language")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                🇺🇸 {t("english")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")}>
                🇪🇸 {t("spanish")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                ☀️ Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                🌙 Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                🖥️ System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="w-full max-w-5xl mb-6 relative">
        <div className="flex items-center border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="ml-3 h-5 w-5 text-gray-400" />
          <Input
            className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {searchQuery.trim() !== "" && (
          <Card className="absolute w-full mt-1 z-10">
            <CardContent className="p-2">
              {isSearching ? (
                <div className="p-4 text-center">
                  <p>{t("searching")}</p>
                </div>
              ) : searchResults.length > 0 ? (
                <ul className="space-y-1">
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-accent rounded cursor-pointer"
                    >
                      {result.value}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center">
                  <p>{t("noResults")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <main className="w-full max-w-5xl">
        <Alert className="mb-6 border-blue-500">
          <Info className="h-4 w-4" />
          <AlertTitle>{t("welcome")}</AlertTitle>
          <AlertDescription>{t("welcomeDesc")}</AlertDescription>
        </Alert>

        <Tabs defaultValue="components" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="components">{t("components")}</TabsTrigger>
            <TabsTrigger value="instructions">{t("instructions")}</TabsTrigger>
          </TabsList>
          <TabsContent value="components" className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("cardTitle")} 📇</CardTitle>
                  <CardDescription>{t("cardDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{t("cardContent")}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() =>
                      showToast(
                        "card-action-toast",
                        t("actionSuccess"),
                        t("actionDesc"),
                        "success",
                        <CheckCircle className="h-4 w-4" />
                      )
                    }
                    variant="secondary"
                  >
                    {t("action")}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dialogTitle")} 💬</CardTitle>
                  <CardDescription>{t("dialogDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>{t("openDialog")}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t("dialogExample")}</DialogTitle>
                        <DialogDescription>
                          {t("dialogExampleDesc")}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p>{t("dialogContent")}</p>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            showToast(
                              "dialog-toast",
                              t("changesSaved"),
                              t("dialogActionDesc"),
                              "info"
                            );
                          }}
                        >
                          {t("saveChanges")}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("hoverTitle")} 👆</CardTitle>
                  <CardDescription>{t("hoverDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">{t("hoverMe")}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            {t("hoverPreview")}
                          </h4>
                          <p className="text-sm">{t("hoverContent")}</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t("inputTitle")} ✍️</CardTitle>
                  <CardDescription>{t("inputDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      onClick={() => {
                        if (email.trim() === "") {
                          showToast(
                            "subscribe-error-toast",
                            t("pleaseEnterEmail"),
                            "",
                            "error",
                            <AlertCircle className="h-4 w-4" />
                          );
                        } else {
                          showToast(
                            "subscribe-success-toast",
                            t("subscribed"),
                            `${t("updatesWillBeSent")} ${email}`,
                            "success",
                            <Bell className="h-4 w-4" />
                          );
                          setEmail("");
                        }
                      }}
                    >
                      {t("subscribe")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-4">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Menu className="h-4 w-4" />
                    {t("openSheet")}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{t("sheetTitle")}</SheetTitle>
                    <SheetDescription>{t("sheetDesc")}</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => {
                        showToast("profile-toast", t("profileSelected"), "");
                        setSheetOpen(false);
                      }}
                    >
                      <User className="h-4 w-4" />
                      <span>{t("profile")}</span>
                    </div>
                    <div
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => {
                        showToast("settings-toast", t("settingsOpened"), "");
                        setSheetOpen(false);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                      <span>{t("settings")}</span>
                    </div>
                    <div
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => {
                        showToast("messages-toast", t("messagesOpened"), "");
                        setSheetOpen(false);
                      }}
                    >
                      <Mail className="h-4 w-4" />
                      <span>{t("messages")}</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </TabsContent>

          <TabsContent value="instructions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("howToUse")} 📚</CardTitle>
                <CardDescription>{t("howToUseDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t("instructionsContent")}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("alert")}</li>
                  <li>{t("button")}</li>
                  <li>{t("card")}</li>
                  <li>{t("dialog")}</li>
                  <li>{t("dropdown")}</li>
                  <li>{t("hovercard")}</li>
                  <li>{t("input")}</li>
                  <li>{t("sheet")}</li>
                  <li>{t("sonner")}</li>
                  <li>{t("tabs")}</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    showToast(
                      "instructions-toast",
                      t("customization"),
                      t("customizationDesc"),
                      "info",
                      <Heart className="h-4 w-4 text-red-500" />
                    )
                  }
                >
                  {t("tryToast")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Toaster position="top-center" />
    </div>
  );
}
