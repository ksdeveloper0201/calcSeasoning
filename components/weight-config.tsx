"use client"

import { Scale, Info } from "lucide-react"

interface WeightConfigProps {
  baseWeight: number
  targetWeight: number
  ratio: number
  onBaseWeightChange: (value: number) => void
  onTargetWeightChange: (value: number) => void
}

export function WeightConfig({
  baseWeight,
  targetWeight,
  ratio,
  onBaseWeightChange,
  onTargetWeightChange,
}: WeightConfigProps) {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5 mb-5">
      <div className="flex items-center gap-2 mb-4 text-card-foreground font-bold border-b border-secondary pb-2">
        <Scale className="text-primary w-5 h-5" />
        <h2>メイン食材の重さ</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            基準 (g)
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={baseWeight || ""}
            onChange={(e) => onBaseWeightChange(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary text-foreground outline-none transition-all text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-primary uppercase tracking-wider">
            今回 (g)
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={targetWeight || ""}
            onChange={(e) =>
              onTargetWeightChange(parseFloat(e.target.value) || 0)
            }
            className="w-full px-3 py-2.5 bg-accent border border-primary/30 rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-accent-foreground text-lg"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground bg-secondary p-3 rounded-xl">
        <Info className="w-3.5 h-3.5 text-ring" />
        <span>
          {"基準の "}
          <span className="font-bold text-foreground">
            {ratio.toFixed(2)} 倍
          </span>
          {" で計算中"}
        </span>
      </div>
    </div>
  )
}
