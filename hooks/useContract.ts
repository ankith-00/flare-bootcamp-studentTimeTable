// hooks/useContract.ts
"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export const useSchoolContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { data: subject, refetch: refetchSubject } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getSubject",
    args: [BigInt(0)], // default Monday
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) {
      refetchSubject()
    }
  }, [isConfirmed, refetchSubject])

  const updateSubject = async (day: number, newSubject: string) => {
    if (!newSubject) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "setSubject",
        args: [BigInt(day), newSubject],
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    subject: subject || "",
    updateSubject,
    state: {
      isLoading: isLoading || isPending || isConfirming,
      isPending,
      isConfirmed,
      hash,
      error
    }
  }
}