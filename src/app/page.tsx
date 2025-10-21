"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FlowConditions from "@/components/flow-conditions";
import { evaluateConditions } from "@/lib/evaluator";
import { toast } from "sonner"; // if you have toast, optional
import { Toaster } from "@/components/ui/sonner";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [conditions, setConditions] = useState<any[]>([]);
  const [results, setResults] = useState<{
    test1: boolean | null;
    test2: boolean | null;
    test3: boolean | null;
  }>({
    test1: null,
    test2: null,
    test3: null,
  });

  const testData = {
    partner_id: "p_123",
    product_id: "prod_abc",
    interval: "monthly",
    billing_type: "recurring",
  };

  const testData2 = {
    partner_id: "p_123",
    product_id: "prod_tds",
    interval: "weekly",
    billing_type: "recurring",
  };

  const testData3 = {
    partner_id: "p_321",
    product_id: "2",
    interval: "weekly",
    billing_type: "one-time",
  };

  const handleTest = () => {
    try {
      const test1Result = evaluateConditions(conditions, testData);
      const test2Result = evaluateConditions(conditions, testData2);
      const test3Result = evaluateConditions(conditions, testData3);

      setResults({
        test1: test1Result,
        test2: test2Result,
        test3: test3Result,
      });

      toast?.success("All tests completed");
    } catch (err) {
      console.error(err);
      toast?.error("Error evaluating conditions");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Toaster />
      <Button onClick={() => setOpen(true)}>Edit Flow</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[950px] h-[650px] p-0 overflow-hidden rounded-xl">
          <div className="grid grid-cols-[280px_1fr] h-full">
            {/* Sidebar */}
            <div className="bg-white border-r px-6 py-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Edit flow</h2>
              <ul className="space-y-6">
                {[
                  "Name your flow",
                  "Determine the flow trigger",
                  "What’s the flow’s action",
                  "Add additional conditions (optional)",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium ${
                        i === 3
                          ? "bg-green-400 text-black"
                          : "bg-green-100 text-black"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {step}
                      </p>
                      <p className="text-xs text-gray-500">
                        {i === 0
                          ? "General flow details"
                          : i === 1
                          ? "When will the flow start"
                          : i === 2
                          ? "What happens"
                          : "Additional condition"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side */}
            <div className="bg-white px-8 py-6 flex flex-col justify-between">
              <div>
                <DialogHeader className="mb-6">
                  <DialogTitle>
                    Add additional conditions - <i>optional</i>
                  </DialogTitle>
                  <p className="text-sm text-gray-500">
                    Add additional conditions to the flow. The flow will only be
                    triggered if all the conditions are met.
                  </p>
                </DialogHeader>

                <FlowConditions
                  value={conditions}
                  onChange={(v: any) => setConditions(v)}
                />
              </div>

              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setResults({ test1: null, test2: null, test3: null })
                    }
                    className="text-gray-700"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleTest}
                    className="bg-green-500 text-black"
                  >
                    Test Flow
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {(results.test1 !== null ||
            results.test2 !== null ||
            results.test3 !== null) && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium space-y-2">
              <div className="bg-white p-4 rounded-lg shadow-lg border">
                <h3 className="font-semibold mb-2 text-center">Test Results</h3>
                <div className="space-y-1">
                  {results.test1 !== null && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Test 1:</span>
                      {results.test1 ? (
                        <span className="text-green-600">
                          ✅ Commission should be generated
                        </span>
                      ) : (
                        <span className="text-red-500">❌ No commission</span>
                      )}
                    </div>
                  )}
                  {results.test2 !== null && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Test 2:</span>
                      {results.test2 ? (
                        <span className="text-green-600">
                          ✅ Commission should be generated
                        </span>
                      ) : (
                        <span className="text-red-500">❌ No commission</span>
                      )}
                    </div>
                  )}
                  {results.test3 !== null && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Test 3:</span>
                      {results.test3 ? (
                        <span className="text-green-600">
                          ✅ Commission should be generated
                        </span>
                      ) : (
                        <span className="text-red-500">❌ No commission</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
