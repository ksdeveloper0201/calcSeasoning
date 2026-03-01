export type UnitType = "大さじ" | "小さじ" | "g" | "カップ"

export interface Ingredient {
  id: number
  name: string
  amount: number
  unit: UnitType
}

export interface SavedRecipe {
  id: string
  name: string
  url: string
  baseWeight: number
  targetWeight: number
  ingredients: Ingredient[]
  createdAt: string
  updatedAt: string
}

export const UNIT_TO_GRAM: Record<string, number> = {
  "大さじ": 15,
  "小さじ": 5,
  "カップ": 200,
  "g": 1,
  "グラム": 1,
}

export const UNIT_OPTIONS: UnitType[] = ["大さじ", "小さじ", "g", "カップ"]

export const DEFAULT_INGREDIENTS: Ingredient[] = [
  { id: 1, name: "醤油", amount: 1, unit: "大さじ" },
  { id: 2, name: "みりん", amount: 1, unit: "大さじ" },
  { id: 3, name: "砂糖", amount: 0.5, unit: "小さじ" },
]
