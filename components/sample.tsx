// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useSchoolContract } from "@/hooks/useContract"

const SampleIntegration = () => {
  const { isConnected } = useAccount()
  const { subject, updateSubject, state } = useSchoolContract()
  const [day, setDay] = useState("0")
  const [newSubject, setNewSubject] = useState("")

  if (!isConnected) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">School Timetable</h2>
        <p className="text-muted-foreground">Connect your wallet to interact.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">School Timetable</h1>

      <div className="p-4 border rounded-lg">
        <p className="text-sm text-muted-foreground mb-1">Current Subject (Monday by default):</p>
        <p className="text-xl font-semibold">{subject?.toString()}</p>
      </div>

      <select
        className="w-full border p-2 rounded-lg"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        <option value="0">Monday</option>
        <option value="1">Tuesday</option>
        <option value="2">Wednesday</option>
        <option value="3">Thursday</option>
        <option value="4">Friday</option>
        <option value="5">Saturday</option>
        <option value="6">Sunday</option>
      </select>

      <input
        type="text"
        className="w-full border p-2 rounded-lg"
        placeholder="Enter subject..."
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
      />

      <button
        onClick={() => updateSubject(Number(day), newSubject)}
        disabled={state.isLoading}
        className="w-full bg-primary text-primary-foreground p-2 rounded-lg"
      >
        {state.isLoading ? "Updating..." : "Update Subject"}
      </button>

      {state.hash && (
        <p className="text-xs break-all text-green-500">Transaction: {state.hash}</p>
      )}

      {state.error && (
        <p className="text-xs text-red-500">Error: {state.error.message}</p>
      )}
    </div>
  )
}

export default SampleIntegration