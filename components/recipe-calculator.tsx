"use client"

import { useState, useCallback } from "react"
import { ChefHat, Save, FilePlus } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Ingredient, SavedRecipe } from "@/lib/types"
import { DEFAULT_INGREDIENTS } from "@/lib/types"
import { WeightConfig } from "./weight-config"
import { IngredientsList } from "./ingredients-list"
import { SavedRecipes } from "./saved-recipes"

export function RecipeCalculator() {
  const [recipeName, setRecipeName] = useState("")
  const [baseWeight, setBaseWeight] = useState(100)
  const [targetWeight, setTargetWeight] = useState(250)
  const [ingredients, setIngredients] = useState<Ingredient[]>(DEFAULT_INGREDIENTS)
  const [currentRecipeId, setCurrentRecipeId] = useState<string | null>(null)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const [savedRecipes, setSavedRecipes, isLoaded] = useLocalStorage<SavedRecipe[]>(
    "recipe-calculator-recipes",
    []
  )

  const ratio = baseWeight > 0 ? targetWeight / baseWeight : 0

  const addIngredient = useCallback(() => {
    const newId = Date.now()
    setIngredients((prev) => [
      ...prev,
      { id: newId, name: "", amount: 0, unit: "g" },
    ])
  }, [])

  const removeIngredient = useCallback((id: number) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id))
  }, [])

  const updateIngredient = useCallback(
    (id: number, field: keyof Ingredient, value: string | number) => {
      setIngredients((prev) =>
        prev.map((ing) => {
          if (ing.id === id) {
            return {
              ...ing,
              [field]: field === "amount" ? parseFloat(String(value)) || 0 : value,
            }
          }
          return ing
        })
      )
    },
    []
  )

  const showMessage = useCallback((msg: string) => {
    setSaveMessage(msg)
    setTimeout(() => setSaveMessage(null), 2000)
  }, [])

  const handleSave = useCallback(() => {
    if (!recipeName.trim()) {
      showMessage("レシピ名を入力してください")
      return
    }

    const now = new Date().toISOString()

    if (currentRecipeId) {
      // Update existing recipe
      setSavedRecipes((prev) =>
        prev.map((r) =>
          r.id === currentRecipeId
            ? {
                ...r,
                name: recipeName.trim(),
                baseWeight,
                targetWeight,
                ingredients,
                updatedAt: now,
              }
            : r
        )
      )
      showMessage("レシピを更新しました")
    } else {
      // Save new recipe
      const newRecipe: SavedRecipe = {
        id: crypto.randomUUID(),
        name: recipeName.trim(),
        baseWeight,
        targetWeight,
        ingredients,
        createdAt: now,
        updatedAt: now,
      }
      setSavedRecipes((prev) => [newRecipe, ...prev])
      setCurrentRecipeId(newRecipe.id)
      showMessage("レシピを保存しました")
    }
  }, [recipeName, baseWeight, targetWeight, ingredients, currentRecipeId, setSavedRecipes, showMessage])

  const handleLoadRecipe = useCallback((recipe: SavedRecipe) => {
    setRecipeName(recipe.name)
    setBaseWeight(recipe.baseWeight)
    setTargetWeight(recipe.targetWeight)
    setIngredients(recipe.ingredients)
    setCurrentRecipeId(recipe.id)
    showMessage(`「${recipe.name}」を読み込みました`)
  }, [showMessage])

  const handleDeleteRecipe = useCallback(
    (id: string) => {
      setSavedRecipes((prev) => prev.filter((r) => r.id !== id))
      if (currentRecipeId === id) {
        setCurrentRecipeId(null)
      }
      showMessage("レシピを削除しました")
    },
    [setSavedRecipes, currentRecipeId, showMessage]
  )

  const handleNewRecipe = useCallback(() => {
    setRecipeName("")
    setBaseWeight(100)
    setTargetWeight(250)
    setIngredients(DEFAULT_INGREDIENTS)
    setCurrentRecipeId(null)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/25 text-primary-foreground">
              <ChefHat className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight text-balance">
            レシピ分量計算
          </h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            重さに合わせて調味料を瞬時に再計算
          </p>
        </header>

        {/* Recipe Name & Save */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-5 mb-5">
          <div className="flex items-center gap-2 mb-4 text-card-foreground font-bold border-b border-secondary pb-2">
            <ChefHat className="text-primary w-5 h-5" />
            <h2>レシピ名</h2>
            {currentRecipeId && (
              <span className="ml-auto text-[10px] font-normal text-primary bg-accent px-2 py-0.5 rounded-full">
                編集中
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="例: 照り焼きチキン"
              className="flex-1 px-3 py-2.5 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground/40 outline-none transition-all text-sm"
            />
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex-shrink-0"
            >
              <Save className="w-3.5 h-3.5" />
              {currentRecipeId ? "更新" : "保存"}
            </button>
            {currentRecipeId && (
              <button
                onClick={handleNewRecipe}
                className="flex items-center gap-1.5 bg-secondary hover:bg-secondary/80 text-foreground px-3 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex-shrink-0 border border-border"
                aria-label="新規レシピ"
              >
                <FilePlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">新規</span>
              </button>
            )}
          </div>

          {/* Save message */}
          {saveMessage && (
            <div className="mt-3 text-xs font-medium text-primary bg-accent/60 px-3 py-2 rounded-lg text-center animate-in fade-in duration-200">
              {saveMessage}
            </div>
          )}
        </div>

        {/* Saved Recipes List */}
        <SavedRecipes
          recipes={savedRecipes}
          onLoad={handleLoadRecipe}
          onDelete={handleDeleteRecipe}
        />

        {/* Weight Config */}
        <WeightConfig
          baseWeight={baseWeight}
          targetWeight={targetWeight}
          ratio={ratio}
          onBaseWeightChange={setBaseWeight}
          onTargetWeightChange={setTargetWeight}
        />

        {/* Ingredients */}
        <IngredientsList
          ingredients={ingredients}
          ratio={ratio}
          onAdd={addIngredient}
          onUpdate={updateIngredient}
          onRemove={removeIngredient}
        />

        {/* Footer */}
        <footer className="mt-10 mb-8 text-center text-muted-foreground text-[10px]">
          <p>{"© 2024 Recipe Calculator Studio"}</p>
          <p className="mt-1 font-medium">
            {"1大さじ=15g, 1小さじ=5g, 1カップ=200gとして換算"}
          </p>
        </footer>
      </div>
    </div>
  )
}
