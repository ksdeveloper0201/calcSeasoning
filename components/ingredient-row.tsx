"use client"

import { Trash2 } from "lucide-react"
import type { Ingredient, UnitType } from "@/lib/types"
import { UNIT_OPTIONS, UNIT_TO_GRAM } from "@/lib/types"

interface IngredientRowProps {
  ingredient: Ingredient
  ratio: number
  onUpdate: (id: number, field: keyof Ingredient, value: string | number) => void
  onRemove: (id: number) => void
}

function formatNumber(num: number, ratio: number) {
  const val = (num * ratio).toFixed(2)
  return parseFloat(val).toString()
}

function getGramValue(amount: number, unit: string, ratio: number) {
  const baseGram = UNIT_TO_GRAM[unit]
  if (!baseGram) return null
  const totalGram = (amount * ratio * baseGram).toFixed(1)
  return parseFloat(totalGram).toString()
}

export function IngredientRow({
  ingredient,
  ratio,
  onUpdate,
  onRemove,
}: IngredientRowProps) {
  const gramValue = getGramValue(ingredient.amount, ingredient.unit, ratio)
  const isGramUnit = ingredient.unit === "g" || ingredient.unit === "グラム"

  return (
    <div className="p-4 sm:px-6 sm:py-4 group transition-colors hover:bg-secondary/50 relative">
      <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Name Input */}
        <div className="w-full sm:col-span-4">
          <input
            type="text"
            value={ingredient.name}
            onChange={(e) => onUpdate(ingredient.id, "name", e.target.value)}
            placeholder="例: しょうゆ"
            className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50 font-bold sm:font-medium text-base sm:text-sm p-0 outline-none"
          />
        </div>

        {/* Base Inputs Group */}
        <div className="w-full flex items-center justify-between sm:col-span-3 gap-2">
          <div className="flex items-center bg-secondary rounded-lg px-2 py-1 w-full sm:w-auto">
            <input
              type="number"
              step="0.1"
              inputMode="decimal"
              value={ingredient.amount || ""}
              onChange={(e) =>
                onUpdate(ingredient.id, "amount", e.target.value)
              }
              className="w-full text-right bg-transparent border-none focus:ring-0 outline-none font-mono text-sm text-foreground"
            />
            <select
              value={ingredient.unit}
              onChange={(e) =>
                onUpdate(ingredient.id, "unit", e.target.value as UnitType)
              }
              className="ml-1 text-xs text-muted-foreground bg-transparent border-none focus:ring-0 p-0 pr-1 cursor-pointer outline-none"
            >
              {UNIT_OPTIONS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <span className="sm:hidden text-muted-foreground/40">{"→"}</span>
        </div>

        {/* Result Display */}
        <div className="w-full sm:col-span-4 flex justify-between items-center sm:justify-end bg-accent sm:bg-transparent rounded-xl px-4 py-2 sm:p-0">
          <div className="flex flex-col items-start sm:items-end">
            <span className="sm:hidden text-[10px] font-bold text-primary uppercase">
              今回の分量
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-accent-foreground text-lg sm:text-base font-mono">
                {formatNumber(ingredient.amount, ratio)}
              </span>
              <span className="text-[10px] font-bold text-accent-foreground">
                {ingredient.unit}
              </span>
            </div>
            {!isGramUnit && gramValue && (
              <span className="text-[10px] text-muted-foreground font-medium">
                {"(約 "}
                {gramValue}
                {" g)"}
              </span>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <div className="absolute right-2 top-2 sm:static sm:col-span-1 flex justify-end">
          <button
            onClick={() => onRemove(ingredient.id)}
            className="text-muted-foreground/40 hover:text-destructive transition-colors p-2 sm:p-1 cursor-pointer"
            aria-label={`${ingredient.name || "調味料"}を削除`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
