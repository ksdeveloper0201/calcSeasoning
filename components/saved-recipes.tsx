"use client"

import { BookOpen, Trash2, FolderOpen, ExternalLink } from "lucide-react"
import type { SavedRecipe } from "@/lib/types"

interface SavedRecipesProps {
  recipes: SavedRecipe[]
  onLoad: (recipe: SavedRecipe) => void
  onDelete: (id: string) => void
}

export function SavedRecipes({ recipes, onLoad, onDelete }: SavedRecipesProps) {
  if (recipes.length === 0) {
    return (
      <div className="bg-card rounded-2xl shadow-sm border border-border p-5 mb-5">
        <div className="flex items-center gap-2 mb-3 text-card-foreground font-bold">
          <BookOpen className="text-primary w-5 h-5" />
          <h2>保存済みレシピ</h2>
        </div>
        <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground">
          <FolderOpen className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-sm">保存されたレシピはありません</p>
          <p className="text-xs text-muted-foreground/60">
            レシピ名を入力して保存ボタンを押してください
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5 mb-5">
      <div className="flex items-center gap-2 mb-4 text-card-foreground font-bold border-b border-secondary pb-2">
        <BookOpen className="text-primary w-5 h-5" />
        <h2>保存済みレシピ</h2>
        <span className="ml-auto text-xs font-normal text-muted-foreground">
          {recipes.length} 件
        </span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <button
              onClick={() => onLoad(recipe)}
              className="flex-1 text-left cursor-pointer min-w-0"
            >
              <div className="font-bold text-sm text-foreground truncate">
                {recipe.name}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-[10px] text-muted-foreground">
                  {recipe.ingredients.length} 調味料
                </span>
                <span className="text-[10px] text-muted-foreground/40">
                  {"·"}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  基準 {recipe.baseWeight}g
                </span>
                <span className="text-[10px] text-muted-foreground/40">
                  {"·"}
                </span>
                <span className="text-[10px] text-muted-foreground/60">
                  {new Date(recipe.updatedAt).toLocaleDateString("ja-JP")}
                </span>
              </div>
            </button>
            {recipe.url && (
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-primary/70 hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-accent flex-shrink-0"
                aria-label={`${recipe.name}の元レシピを開く`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(recipe.id)
              }}
              className="text-muted-foreground/30 hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-destructive/10 cursor-pointer flex-shrink-0"
              aria-label={`${recipe.name}を削除`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
