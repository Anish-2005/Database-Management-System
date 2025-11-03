import { useState } from 'react'
import { DocumentationItem } from '../documentationData'

export const useDocumentationManagement = () => {
  const [activeDoc, setActiveDoc] = useState<DocumentationItem | null>(null)
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)

  const openDoc = (doc: DocumentationItem) => {
    setActiveDoc(doc)
  }

  const closeDoc = () => {
    setActiveDoc(null)
  }

  const copyToClipboard = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCodeId(codeId)
      setTimeout(() => setCopiedCodeId(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return {
    activeDoc,
    copiedCodeId,
    openDoc,
    closeDoc,
    copyToClipboard
  }
}