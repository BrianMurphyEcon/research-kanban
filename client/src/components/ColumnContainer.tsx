import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { Column, Id, Task } from "@/types";
import { Button } from "./ui/button";
import { Plus, Trash2, GripVertical, Archive } from "lucide-react";
import TaskCard from "./TaskCard";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  column: Column;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string, description?: string, link?: string, tags?: string[]) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
}

export default function ColumnContainer({
  column,
  deleteTask,
  updateTask,
  createTask,
  tasks,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: column.id === "completed", // Disable dragging for the completed column itself if desired, or keep it draggable
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-muted/50 opacity-40 border-2 border-primary/50 w-[350px] h-[500px] max-h-[500px] rounded-xl flex flex-col"
      ></div>
    );
  }

  const isCompletedColumn = column.id === "completed";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-card w-[350px] h-[75vh] max-h-[800px] rounded-xl flex flex-col shadow-sm border border-border/50 transition-all duration-300",
        isCompletedColumn && "w-[80px] hover:w-[350px] group overflow-hidden hover:overflow-visible bg-muted/30 border-dashed"
      )}
    >
      {/* Column Header */}
      <div
        {...attributes}
        {...listeners}
        className={cn(
          "h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-b border-border/50 flex items-center justify-between bg-card/50 backdrop-blur-sm",
          isCompletedColumn && "justify-center group-hover:justify-between"
        )}
      >
        <div className="flex gap-2 items-center">
          {isCompletedColumn ? (
            <>
              <Archive className="w-6 h-6 text-muted-foreground" />
              <span className="hidden group-hover:inline-block font-serif text-lg text-muted-foreground">
                {column.title}
              </span>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center bg-muted px-2 py-1 text-sm rounded-full text-muted-foreground font-mono">
                {tasks.length}
              </div>
              <span className="font-serif text-lg text-foreground/80 tracking-tight">
                {column.title}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Column Content */}
      <div className={cn("flex-grow flex flex-col p-2 gap-4 overflow-hidden", isCompletedColumn && "hidden group-hover:flex")}>
        <ScrollArea className="flex-grow pr-3">
          <div className="flex flex-col gap-3 pb-4">
            <SortableContext items={taskIds}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
        </ScrollArea>
        
        {!isCompletedColumn && (
          <Button
            variant="ghost"
            className="w-full border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 text-muted-foreground hover:text-primary transition-all"
            onClick={() => {
              createTask(column.id);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        )}
      </div>
      
      {/* Collapsed state for Completed column */}
      {isCompletedColumn && (
        <div className="flex-grow flex flex-col items-center pt-4 gap-2 group-hover:hidden">
           <div className="writing-mode-vertical text-muted-foreground font-serif tracking-widest uppercase text-sm rotate-180">
             Completed Projects
           </div>
        </div>
      )}
    </div>
  );
}
