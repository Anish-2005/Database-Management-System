import { useState, useEffect } from 'react'
import {
  AboutFeature,
  AboutStat,
  AboutTestimonial,
  AboutValue,
  ABOUT_FEATURES,
  ABOUT_STATS,
  ABOUT_TESTIMONIALS,
  ABOUT_VALUES
} from '../aboutData'

export interface AboutDataState {
  features: AboutFeature[]
  stats: AboutStat[]
  testimonials: AboutTestimonial[]
  values: AboutValue[]
  isLoading: boolean
}

export const useAboutData = () => {
  const [data, setData] = useState<AboutDataState>({
    features: [],
    stats: [],
    testimonials: [],
    values: [],
    isLoading: true
  })

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))

      setData({
        features: ABOUT_FEATURES,
        stats: ABOUT_STATS,
        testimonials: ABOUT_TESTIMONIALS,
        values: ABOUT_VALUES,
        isLoading: false
      })
    }

    loadData()
  }, [])

  // CRUD operations for features
  const addFeature = (feature: Omit<AboutFeature, 'id'>) => {
    const newFeature: AboutFeature = {
      ...feature,
      id: `feature-${Date.now()}`
    }

    setData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }))

    return newFeature
  }

  const updateFeature = (id: string, updates: Partial<AboutFeature>) => {
    setData(prev => ({
      ...prev,
      features: prev.features.map(feature =>
        feature.id === id ? { ...feature, ...updates } : feature
      )
    }))
  }

  const deleteFeature = (id: string) => {
    setData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature.id !== id)
    }))
  }

  // CRUD operations for testimonials
  const addTestimonial = (testimonial: AboutTestimonial) => {
    setData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, testimonial]
    }))

    return testimonial
  }

  const updateTestimonial = (index: number, updates: Partial<AboutTestimonial>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) =>
        i === index ? { ...testimonial, ...updates } : testimonial
      )
    }))
  }

  const deleteTestimonial = (index: number) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }))
  }

  return {
    data,
    addFeature,
    updateFeature,
    deleteFeature,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
  }
}