import { useState } from "react";
import { Id, Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Link as LinkIcon, FileText, Tag, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string, description?: string, link?: string, tags?: string[]) => void;
}

export default function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Local state for editing
  const [title, setTitle] = useState(task.content);
  const [description, setDescription] = useState(task.description || "");
  const [link, setLink] = useState(task.link || "");
  const [tagsInput, setTagsInput] = useState(task.tags?.join(", ") || "");

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleSave = () => {
    const tags = tagsInput.split(",").map((t) => t.trim()).filter((t) => t !== "");
    updateTask(task.id, title, description, link, tags);
    setIsDialogOpen(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-primary/10 p-4 h-[150px] min-h-[150px] items-center flex text-left rounded-xl border-2 border-primary cursor-grab relative"
      />
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setIsDialogOpen(true)}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        className={cn(
          "bg-card p-4 min-h-[100px] items-start flex flex-col text-left rounded-xl hover:ring-2 hover:ring-primary/50 hover:shadow-md cursor-grab relative task transition-all duration-200 border border-border/60 group",
          task.columnId === "completed" && "opacity-75 hover:opacity-100"
        )}
      >
        <div className="flex justify-between items-start w-full mb-2">
          <h4 className="font-serif font-semibold text-foreground/90 leading-tight line-clamp-2">
            {task.content}
          </h4>
          {task.link && (
            <LinkIcon className="w-3 h-3 text-primary shrink-0 mt-1 ml-2" />
          )}
        </div>
        
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 font-sans">
            {task.description}
          </p>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {task.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-normal bg-secondary/50 text-secondary-foreground/80 hover:bg-secondary">
                {tag}
              </Badge>
            ))}
            {task.tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground self-center">+{task.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Edit Research Project</DialogTitle>
            <DialogDescription>
              Update project details, add notes, or link replication packages.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-serif"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description / Notes</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link">Replication Package Link</Label>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Macro, Labor, R&R..."
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                deleteTask(task.id);
                setIsDialogOpen(false);
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
