'use client'
import { Category, Companion } from '@prisma/client'
import React from 'react'

interface CompanionFormProps {
    initialData: Companion | null
    categories: Category[]
}

export const CompanionForm = ({initialData, categories}:CompanionFormProps) => {
  return (
    <div>CompanionForm</div>
  )
}
