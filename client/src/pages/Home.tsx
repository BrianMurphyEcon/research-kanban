import KanbanBoard from "@/components/KanbanBoard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background/50">
      <header className="px-8 py-6 border-b border-border/40 bg-background/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground tracking-tight">Research Pipeline</h1>
            <p className="text-sm text-muted-foreground font-sans mt-1">Manage your papers from idea to publication</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground font-mono bg-muted/50 px-3 py-1 rounded-full border border-border/50">
              Auto-saved to local storage
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-hidden relative">
        <div className="absolute inset-0 overflow-x-auto">
          <div className="min-w-fit p-8 h-full">
            <KanbanBoard />
          </div>
        </div>
      </main>
    </div>
  );
}
