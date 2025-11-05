import { LucideIcon } from 'lucide-react'
import { ItemCard } from './ItemCard'

interface SavedItem {
  id: string | number
  title: string
  category?: string
  difficulty?: string
  type: 'tutorial' | 'lab'
  icon?: string
  gradient?: string
}

interface SavedItemsSectionProps {
  title: string
  icon: LucideIcon
  savedItems: SavedItem[]
  favoritedItems: SavedItem[]
  bookmarkIcon: LucideIcon
  heartIcon: LucideIcon
  gradientColor: string
  textColor: string
}

export function SavedItemsSection({
  title,
  icon: SectionIcon,
  savedItems,
  favoritedItems,
  bookmarkIcon,
  heartIcon,
  gradientColor,
  textColor
}: SavedItemsSectionProps) {
  if (savedItems.length === 0 && favoritedItems.length === 0) {
    return null
  }

  const getSectionClasses = () => {
    if (gradientColor === 'purple-500') {
      return {
        divider: 'via-purple-500/50',
        badge: 'bg-purple-500/10 border-purple-500/30',
        text: 'text-purple-400'
      }
    } else if (gradientColor === 'cyan-500') {
      return {
        divider: 'via-cyan-500/50',
        badge: 'bg-cyan-500/10 border-cyan-500/30',
        text: 'text-cyan-400'
      }
    }
    return {
      divider: 'via-slate-500/50',
      badge: 'bg-slate-500/10 border-slate-500/30',
      text: 'text-slate-400'
    }
  }

  const classes = getSectionClasses()

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className={`h-px bg-gradient-to-r from-transparent ${classes.divider} to-transparent flex-1`}></div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${classes.badge}`}>
          <SectionIcon className={`w-5 h-5 ${classes.text}`} />
          <h2 className={`text-xl font-semibold ${classes.text}`}>
            {title}
          </h2>
        </div>
        <div className={`h-px bg-gradient-to-r from-transparent ${classes.divider} to-transparent flex-1`}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.map((item) => (
          <ItemCard key={`saved-${item.type}-${item.id}`} item={item} icon={bookmarkIcon} />
        ))}
        {favoritedItems.map((item) => (
          <ItemCard key={`favorited-${item.type}-${item.id}`} item={item} icon={heartIcon} />
        ))}
      </div>
    </section>
  )
}