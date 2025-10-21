"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export default function FlowConditions({ value, onChange }: any) {
  const [conditions, setConditions] = useState(value || []);

  const [logicalOperator, setLogicalOperator] = useState<"AND" | "OR">("AND");

  const addCondition = () => {
    setConditions([
      ...conditions,
      { type: "", operator: "", value: "", logicalOperator },
    ]);
  };

  const removeCondition = (index: number) => {
    const updated = [...conditions];
    updated.splice(index, 1);
    setConditions(updated);
  };

  const clearAll = () =>
    setConditions([{ type: "", operator: "", value: "", logicalOperator }]);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...conditions];
    // @ts-ignore
    updated[index][field] = value;
    setConditions(updated);
  };

  useEffect(() => {
    // Update all conditions with the current logical operator
    const updatedConditions = conditions.map((condition: any) => ({
      ...condition,
      logicalOperator,
    }));
    onChange?.(updatedConditions);
  }, [conditions, logicalOperator]);

  return (
    <div className="space-y-4">
      {conditions.map((c: any, i: number) => (
        <div key={i} className="space-y-3">
          {i > 0 && (
            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
              <div className="flex-1 border-t border-gray-200" />
              <Button
                size="sm"
                variant="outline"
                className={`h-6 text-xs px-2 ${
                  logicalOperator === "AND"
                    ? "bg-green-400 text-black hover:bg-green-400"
                    : "bg-black text-white hover:bg-black"
                }`}
                onClick={() =>
                  setLogicalOperator(logicalOperator === "AND" ? "OR" : "AND")
                }
              >
                {logicalOperator}
              </Button>
              <div className="flex-1 border-t border-gray-200" />
            </div>
          )}

          <div className="flex gap-3 items-end">
            {/* Condition type */}
            <div className="flex-1">
              <label className="text-sm text-gray-700 block mb-1">
                Choose condition
              </label>
              <Select
                value={c.type}
                onValueChange={(v) => handleChange(i, "type", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partner_id">Partner ID</SelectItem>
                  <SelectItem value="product_id">Product ID</SelectItem>
                  <SelectItem value="interval">Interval</SelectItem>
                  <SelectItem value="billing_type">Billing type</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Operator */}
            <div className="flex-1">
              <label className="text-sm text-gray-700 block mb-1">
                Choose operator
              </label>
              <Select
                value={c.operator}
                onValueChange={(v) => handleChange(i, "operator", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">equals</SelectItem>
                  <SelectItem value="not equals">not equals</SelectItem>
                  <SelectItem value="is in">is in</SelectItem>
                  <SelectItem value="is not in">is not in</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Value */}
            <div className="flex-1">
              <label className="text-sm text-gray-700 block mb-1">
                Choose value
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-md h-9 px-2 text-sm"
                placeholder="Enter value"
                value={c.value}
                onChange={(e) => handleChange(i, "value", e.target.value)}
              />
            </div>

            {/* Remove */}
            {conditions.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCondition(i)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="default"
          className="bg-green-400 text-black hover:bg-green-400 h-8"
          onClick={addCondition}
        >
          + Add condition
        </Button>

        <Button variant="outline" className="h-8" onClick={clearAll}>
          Clear all
        </Button>
      </div>
    </div>
  );
}
