"use client"

import { Plus } from "lucide-react"
import type { Ingredient } from "@/lib/types"
import { IngredientRow } from "./ingredient-row"

interface IngredientsListProps {
  ingredients: Ingredient[]
  ratio: number
  onAdd: () => void
  onUpdate: (id: number, field: keyof Ingredient, value: string | number) => void
  onRemove: (id: number) => void
}

export function IngredientsList({
  ingredients,
  ratio,
  onAdd,
  onUpdate,
  onRemove,
}: IngredientsListProps) {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-secondary flex justify-between items-center bg-card">
        <h2 className="text-base sm:text-lg font-bold text-card-foreground">
          調味料リスト
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          追加
        </button>
      </div>

      <div className="divide-y divide-secondary">
        {/* Table Header (Hidden on small mobile) */}
        <div className="hidden sm:grid grid-cols-12 bg-secondary/50 text-muted-foreground text-[10px] uppercase font-bold tracking-wider px-6 py-3">
          <div className="col-span-4">調味料名</div>
          <div className="col-span-3 text-right">基準分量</div>
          <div className="col-span-4 text-right text-primary bg-accent/30 px-2 rounded">
            今回の分量
          </div>
          <div className="col-span-1" />
        </div>

        {ingredients.map((ing) => (
          <IngredientRow
            key={ing.id}
            ingredient={ing}
            ratio={ratio}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}

        {ingredients.length === 0 && (
          <div className="px-6 py-12 text-center text-muted-foreground italic text-sm">
            {"「追加」ボタンで調味料を入力してください"}
          </div>
        )}
      </div>
    </div>
  )
}
